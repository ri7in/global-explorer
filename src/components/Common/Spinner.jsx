// src/components/Common/Spinner.jsx
import React from 'react';

const Spinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex justify-center items-center my-8">
      <div
        className={`${sizeClasses[size]} border-4 border-cockpit-dim-text border-t-cockpit-hud rounded-full animate-spin`}
        role="status"
        aria-label="Loading..."
      ></div>
    </div>
  );
};

export default Spinner;