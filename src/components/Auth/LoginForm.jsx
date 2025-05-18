// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, LogIn as LoginIcon } from 'lucide-react';

const LoginForm = ({ onSwitchToRegister, onSuccess }) => {
  const [identifier, setIdentifier] = useState(''); // email or username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(identifier, password);
      onSuccess(); // Close modal on successful login
    } catch (err) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-400 bg-red-900/30 p-3 rounded-md text-sm">{error}</p>}
      
      <div>
        <label htmlFor="identifier" className="block text-sm font-medium text-cockpit-dim-text mb-1">
          Email or Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-cockpit-dim-text" />
          </div>
          <input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="appearance-none block w-full pl-10 pr-3 py-2 border border-cockpit-hud bg-cockpit-charcoal rounded-md shadow-sm placeholder-cockpit-dim-text focus:outline-none focus:ring-cockpit-accent focus:border-cockpit-accent sm:text-sm"
            placeholder="your.email@example.com or pilot_username"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-cockpit-dim-text mb-1">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-cockpit-dim-text" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full pl-10 pr-3 py-2 border border-cockpit-hud bg-cockpit-charcoal rounded-md shadow-sm placeholder-cockpit-dim-text focus:outline-none focus:ring-cockpit-accent focus:border-cockpit-accent sm:text-sm"
            placeholder="••••••••"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cockpit-hud hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cockpit-charcoal focus:ring-cockpit-accent disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <LoginIcon size={20} className="mr-2"/>
          )}
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </div>
      <p className="text-sm text-center text-cockpit-dim-text">
        New pilot?{' '}
        <button type="button" onClick={onSwitchToRegister} className="font-medium text-cockpit-hud hover:text-blue-300 focus:outline-none">
          Register here
        </button>
      </p>
    </form>
  );
};

export default LoginForm;