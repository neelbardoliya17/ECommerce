// InteractiveVideoPlayer.js
import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import "./InteractiveVideoPlayer.css";

const InteractiveVideoPlayer = ({ category }) => {
  const [overlayImages, setOverlayImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentOverlayIndex, setCurrentOverlayIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const intervalRef = useRef(null);

  // Fetch products based on category
  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      const products = categoryProduct?.data || [];
      console.log("Fetched Products:", products); // Debugging
      setOverlayImages(products);
    } catch (error) {
      console.error("Error fetching overlay images:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  useEffect(() => {
    if (overlayImages.length > 0) {
      intervalRef.current = setInterval(() => {
        setShowOverlay(true); // Show overlay
        setTimeout(() => setShowOverlay(false), 2500); // Hide overlay after 2.5 seconds

        setCurrentOverlayIndex((prevIndex) => (prevIndex + 1) % overlayImages.length);
      }, 5000); // Total interval of 5 seconds

      return () => clearInterval(intervalRef.current);
    }
  }, [overlayImages]);

  const currentProduct = overlayImages[currentOverlayIndex] || {};
  const productImage = currentProduct.productImage?.[0] || "placeholder.jpg";
  const productName = currentProduct.productName || "Unnamed Product";

  return (
    <div className="video-player-container">
      <ReactPlayer
        url={require("../assest/video.mp4")}
        playing
        controls
        loop
        width="100%"
        height="100%"
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        showOverlay && (
          <div className="offer-overlay">
            <img src={productImage} alt={productName} />
            <p>{productName}</p>
          </div>
        )
      )}
    </div>
  );
};

export default InteractiveVideoPlayer;
