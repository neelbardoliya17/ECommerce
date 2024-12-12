import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginIcons from '../assest/signin.gif'; // Correct the asset path
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ForgotPassowrd = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/forgot-password', { email, newPassword });
      setMessage(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error('Error resetting password');
    }
  };

  return (
    <section id='forgot-password'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='forgot password icon' />
          </div>
          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={handleOnChange}
                  name='email'
                  className='w-full h-full outline-none bg-transparent'
                  required
                />
              </div>
            </div>

            <div className='grid'>
              <label>New Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter new password'
                  value={newPassword}
                  onChange={handleOnChange}
                  name='newPassword'
                  className='w-full h-full outline-none bg-transparent'
                  required
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div className='grid'>
              <label>Confirm Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Confirm new password'
                  value={confirmPassword}
                  onChange={handleOnChange}
                  name='confirmPassword'
                  className='w-full h-full outline-none bg-transparent'
                  required
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button
              type='submit'
              className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
            >
              Reset Password
            </button>
          </form>
          <p className='my-5'>
            Remember your password?{' '}
            <Link to="/login" className='text-red-600 hover:text-red-700 hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassowrd;
