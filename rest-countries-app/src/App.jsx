// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CountryProvider } from './contexts/CountryContext';
import Header from './components/Common/Header';
// import Footer from './components/Common/Footer'; // Optional
import DashboardPage from './pages/DashboardPage';
import FavoritesPage from './pages/FavoritesPage'; // Assuming you'll have this

function App() {
  return (
    <AuthProvider>
      <CountryProvider>
        <div className="flex flex-col min-h-screen bg-cockpit-dark">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              {/* Add other routes here if needed */}
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
      </CountryProvider>
    </AuthProvider>
  );
}

export default App;