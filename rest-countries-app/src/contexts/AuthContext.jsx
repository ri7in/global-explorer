import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Helper to get initial user from localStorage
const getInitialUser = () => {
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

// Helper to get initial users list from localStorage
const getInitialUsersList = () => {
  const storedUsers = localStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : [];
};

// Helper to get initial favorites from localStorage
const getInitialFavorites = () => {
  const storedFavorites = localStorage.getItem('favorites');
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getInitialUser());
  const [users, setUsers] = useState(getInitialUsersList()); // To store registered users {username, email, password}
  const [favorites, setFavorites] = useState(getInitialFavorites()); // Array of country codes (cca3)

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      // Load favorites for the current user
      const userFavorites = getInitialFavorites().filter(fav => fav.username === currentUser.username);
      setFavorites(userFavorites.map(fav => fav.countryCode));
    } else {
      localStorage.removeItem('currentUser');
      setFavorites([]); // Clear favorites on logout
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Persist all favorites across all users. We filter by username when needed.
  useEffect(() => {
    const allFavorites = getInitialFavorites();
    if (currentUser) {
      // Remove old favorites for this user
      const otherUserFavorites = allFavorites.filter(fav => fav.username !== currentUser.username);
      // Add current user's new favorites
      const currentUserNewFavorites = favorites.map(code => ({ username: currentUser.username, countryCode: code }));
      localStorage.setItem('favorites', JSON.stringify([...otherUserFavorites, ...currentUserNewFavorites]));
    } else {
        // If no user, just store what's there (should be empty but as a safeguard)
        localStorage.setItem('favorites', JSON.stringify(allFavorites));
    }
  }, [favorites, currentUser]);


  const register = (userData) => { // userData: { username, email, password }
    if (users.find(user => user.username === userData.username || user.email === userData.email)) {
      throw new Error('Username or email already exists.');
    }
    // In a real app, hash the password
    const newUser = { ...userData }; // Storing password as is for this mock
    setUsers(prevUsers => [...prevUsers, newUser]);
    // Optionally log in the user directly after registration
    // login(userData.username, userData.password); 
    return newUser;
  };

  const login = (identifier, password) => { // identifier can be username or email
    const user = users.find(
      u => (u.username === identifier || u.email === identifier) && u.password === password
    );
    if (user) {
      setCurrentUser({ username: user.username, email: user.email }); // Store only necessary info
      return user;
    }
    throw new Error('Invalid credentials.');
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addFavorite = (countryCode) => {
    if (!currentUser) return;
    setFavorites(prev => {
      if (!prev.includes(countryCode)) {
        return [...prev, countryCode];
      }
      return prev;
    });
  };

  const removeFavorite = (countryCode) => {
    if (!currentUser) return;
    setFavorites(prev => prev.filter(code => code !== countryCode));
  };

  const isFavorite = (countryCode) => {
    if (!currentUser) return false;
    return favorites.includes(countryCode);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    register,
    login,
    logout,
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};