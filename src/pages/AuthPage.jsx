// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import { PlaneTakeoff } from 'lucide-react';

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-flightdeck-panel dark:bg-cockpit-panel p-8 sm:p-10 rounded-xl shadow-xl dark:shadow-hud-glow transition-colors duration-300">
        <div>
          <PlaneTakeoff 
            className="mx-auto h-16 w-auto text-flightdeck-accent-blue dark:text-cockpit-hud-primary transition-colors duration-300" 
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-flightdeck-text-primary dark:text-cockpit-hud-secondary transition-colors duration-300">
            {isLoginMode ? 'Welcome Back, Pilot' : 'Join the Squadron'}
          </h2>
          <p className="mt-2 text-center text-sm text-flightdeck-text-secondary dark:text-cockpit-text-dim transition-colors duration-300">
            {isLoginMode ? 'Log in to access your flight dashboard' : 'Create an account to explore global data'}
          </p>
        </div>
        {isLoginMode ? (
          <LoginForm 
            onSuccess={() => {}} // Navigation handled by App.jsx now
            onSwitchToRegister={() => setIsLoginMode(false)} 
          />
        ) : (
          <RegisterForm 
            onSuccess={() => {}} // Navigation handled by App.jsx now
            onSwitchToLogin={() => setIsLoginMode(true)} 
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
