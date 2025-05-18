// src/components/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

const RegisterForm = ({ onSwitchToLogin, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register({ username, email, password });
      // Automatically log in after successful registration
      await login(username, password);
      onSuccess(); // Close modal
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="text-red-400 bg-red-900/30 p-3 rounded-md text-sm">{error}</p>}
      
      <div>
        <label htmlFor="reg-username" className="block text-sm font-medium text-cockpit-dim-text mb-1">Username</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-cockpit-dim-text" />
          </div>
          <input id="reg-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required 
          className="appearance-none block w-full pl-10 pr-3 py-2 border border-cockpit-hud bg-cockpit-charcoal rounded-md shadow-sm placeholder-cockpit-dim-text focus:outline-none focus:ring-cockpit-accent focus:border-cockpit-accent sm:text-sm"
          placeholder="pilot_username" />
        </div>
      </div>

      <div>
        <label htmlFor="reg-email" className="block text-sm font-medium text-cockpit-dim-text mb-1">Email</label>
         <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-cockpit-dim-text" />
          </div>
          <input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
          className="appearance-none block w-full pl-10 pr-3 py-2 border border-cockpit-hud bg-cockpit-charcoal rounded-md shadow-sm placeholder-cockpit-dim-text focus:outline-none focus:ring-cockpit-accent focus:border-cockpit-accent sm:text-sm"
          placeholder="your.email@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="reg-password" className="block text-sm font-medium text-cockpit-dim-text mb-1">Password</label>
         <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-cockpit-dim-text" />
          </div>
          <input id="reg-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
          className="appearance-none block w-full pl-10 pr-3 py-2 border border-cockpit-hud bg-cockpit-charcoal rounded-md shadow-sm placeholder-cockpit-dim-text focus:outline-none focus:ring-cockpit-accent focus:border-cockpit-accent sm:text-sm"
          placeholder="min. 6 characters" minLength="6" />
        </div>
      </div>

      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-cockpit-dim-text mb-1">Confirm Password</label>
         <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-cockpit-dim-text" />
          </div>
          <input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required 
          className="appearance-none block w-full pl-10 pr-3 py-2 border border-cockpit-hud bg-cockpit-charcoal rounded-md shadow-sm placeholder-cockpit-dim-text focus:outline-none focus:ring-cockpit-accent focus:border-cockpit-accent sm:text-sm"
          placeholder="re-type password" minLength="6" />
        </div>
      </div>

      <div>
        <button type="submit" disabled={loading} 
        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-cockpit-dark bg-cockpit-hud hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cockpit-charcoal focus:ring-cockpit-accent disabled:opacity-50 transition-colors">
          {loading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-cockpit-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <UserPlus size={20} className="mr-2"/>
          )}
          {loading ? 'Registering...' : 'Create Account'}
        </button>
      </div>
      <p className="text-sm text-center text-cockpit-dim-text">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} className="font-medium text-cockpit-hud hover:text-blue-300 focus:outline-none">
          Log in here
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;