// src/components/Auth/AuthModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === 'login' ? 'Pilot Log In' : 'New Pilot Registration'} size="md">
      {mode === 'login' ? (
        <LoginForm onSwitchToRegister={() => handleSwitchMode('register')} onSuccess={onClose} />
      ) : (
        <RegisterForm onSwitchToLogin={() => handleSwitchMode('login')} onSuccess={onClose} />
      )}
    </Modal>
  );
};

export default AuthModal;