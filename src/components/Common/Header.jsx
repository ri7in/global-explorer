// src/components/Common/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../Auth/AuthModal';
import { Globe, Star, LogIn, UserPlus, LogOut, UserCircle } from 'lucide-react';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const navigate = useNavigate();

  const handleAuthModalOpen = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate to home on logout
  };

  return (
    <>
      <header className="bg-cockpit-charcoal shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-cockpit-hud hover:text-blue-300 transition-colors">
            <Globe size={32} strokeWidth={1.5} />
            <h1 className="text-xl md:text-2xl font-bold tracking-wider uppercase">Global Explorer</h1>
          </Link>

          <nav className="flex items-center space-x-3 md:space-x-4">
            {isAuthenticated && (
              <Link
                to="/favorites"
                className="flex items-center text-cockpit-light-text hover:text-cockpit-hud transition-colors px-3 py-2 rounded-md text-sm font-medium"
                title="My Favorites"
              >
                <Star size={20} className="mr-1 md:mr-2" />
                <span className="hidden sm:inline">Favorites</span>
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-2 md:space-x-3">
                <span className="text-cockpit-dim-text text-sm hidden md:flex items-center">
                  <UserCircle size={20} className="mr-1 text-cockpit-hud" />
                  {currentUser.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-cockpit-accent hover:bg-orange-400 text-white px-3 py-2 rounded-md text-sm font-medium transition-all transform hover:scale-105"
                  title="Logout"
                >
                  <LogOut size={18} className="mr-0 md:mr-1" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-3">
                <button
                  onClick={() => handleAuthModalOpen('login')}
                  className="flex items-center text-cockpit-light-text hover:text-cockpit-hud transition-colors px-3 py-2 rounded-md text-sm font-medium"
                  title="Login"
                >
                  <LogIn size={18} className="mr-0 md:mr-1" />
                  <span className="hidden md:inline">Login</span>
                </button>
                <button
                  onClick={() => handleAuthModalOpen('register')}
                  className="flex items-center bg-cockpit-hud hover:bg-blue-400 text-cockpit-dark px-3 py-2 rounded-md text-sm font-medium transition-all transform hover:scale-105"
                  title="Register"
                >
                  <UserPlus size={18} className="mr-0 md:mr-1" />
                  <span className="hidden md:inline">Register</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authMode}
          onSwitchMode={setAuthMode}
        />
      )}
    </>
  );
};

export default Header;