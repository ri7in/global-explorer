// src/components/Common/Modal.jsx
import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const SIZES = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-full'
  };

  return (
    // Backdrop
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-[100] p-4 animate-fadeIn" // Added animate-fadeIn to backdrop
      onClick={onClose}
    >
      {/* Modal Panel */}
      <div
        className={`bg-cockpit-charcoal rounded-lg shadow-hud-glow p-6 relative ${SIZES[size]} w-full overflow-y-auto max-h-[90vh] animate-modalShow`} // Simplified classes, relying on animate-modalShow from config
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        {/* REMOVED THE INLINE <style> TAG for @keyframes modalShow */}
        <div className="flex justify-between items-center mb-4 border-b border-cockpit-hud pb-3">
          <h3 className="text-xl font-semibold text-cockpit-hud">{title}</h3>
          <button
            onClick={onClose}
            className="text-cockpit-dim-text hover:text-cockpit-light-text transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;