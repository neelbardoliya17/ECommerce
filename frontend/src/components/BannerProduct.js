
import React, { useState, useEffect } from "react";
import InteractiveVideoPlayer from "./InteractiveVideoPlayer";

const BannerProduct = () => {

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-auto w-full bg-slate-200 relative flex items-center justify-center">
        <InteractiveVideoPlayer category={'airdopes'} />
      </div>
    </div>
  );
};

export default BannerProduct;





