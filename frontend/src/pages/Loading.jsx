// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loading.css';

export default function Loading() {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // First timer: wait 5 seconds before starting transition
    const timer1 = setTimeout(() => {
      setAnimationComplete(true);
    }, 5000);

    // Second timer: navigate after transition completes
    const timer2 = setTimeout(() => {
      navigate('/');
    }, 6000); // 5s wait + 1s for animation

    // Cleanup on unmount
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <div className="loading-container">
      <img
        src="src/assets/lexi-high-resolution-logo-transparent.png"
        alt="Lexi Logo"
        className={`logo ${animationComplete ? 'animate-to-header' : 'animate-pulse'} w-24 h-24 sm:w-64 sm:h-64 object-contain`}
      />
    </div>
  );
}