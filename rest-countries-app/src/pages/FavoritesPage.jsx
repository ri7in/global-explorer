// src/pages/FavoritesPage.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCountries as useAllCountriesData } from '../contexts/CountryContext'; // Alias to avoid name clash
import CountryCard from '../components/Country/CountryCard';
import CountryDetailsModal from '../components/Country/CountryDetailsModal';
import Spinner from '../components/Common/Spinner';
import { getCountriesByCodes } from '../services/countryService'; // For fetching full data
import { Link } from 'react-router-dom';
import { ChevronLeft, ListX } from 'lucide-react';

const FavoritesPage = () => {
  const { favorites: favoriteCodes, isAuthenticated, currentUser } = useAuth();
  const { allCountries: cachedAllCountries, fetchCountryDetails, setSelectedCountryDetails, isModalOpen, setIsModalOpen } = useAllCountriesData();
  const [favoriteCountriesData, setFavoriteCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      setLoading(false);
      setFavoriteCountriesData([]); // Clear if not authenticated
      return;
    }

    const fetchFavoriteDetails = async () => {
      if (favoriteCodes.length === 0) {
        setFavoriteCountriesData([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // Attempt to use cached data first
        const cachedFavorites = favoriteCodes
          .map(code => cachedAllCountries.find(c => c.cca3 === code))
          .filter(Boolean); // Filter out any undefined if not found in cache

        if (cachedFavorites.length === favoriteCodes.length) {
          // All favorites found in cache
          setFavoriteCountriesData(cachedFavorites.sort((a, b) => a.name.common.localeCompare(b.name.common)));
        } else {
          // Fetch missing or all from API
          const data = await getCountriesByCodes(favoriteCodes);
          setFavoriteCountriesData(data.sort((a, b) => a.name.common.localeCompare(b.name.common)));
        }
      } catch (err) {
        console.error("Failed to fetch favorite countries:", err);
        setError("Could not load your favorite destinations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteDetails();
  }, [favoriteCodes, isAuthenticated, currentUser, cachedAllCountries]);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-cockpit-hud mb-4">Access Denied</h2>
        <p className="text-cockpit-dim-text mb-6">Please log in to view your favorite destinations.</p>
        <Link 
            to="/" 
            className="inline-flex items-center bg-cockpit-hud text-cockpit-dark px-6 py-2 rounded-md hover:bg-blue-400 transition-colors font-medium"
        >
            <ChevronLeft size={20} className="mr-2" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  if (loading) return <Spinner size="lg" />;
  if (error) return <p className="text-center text-red-400 text-lg bg-red-900/30 p-4 rounded-md">{error}</p>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-cockpit-hud tracking-wide">My Favorite Destinations</h2>
        <Link 
            to="/" 
            className="flex items-center text-cockpit-hud hover:text-blue-300 transition-colors text-sm"
        >
            <ChevronLeft size={18} className="mr-1" /> Back to Dashboard
        </Link>
      </div>

      {favoriteCountriesData.length === 0 ? (
        <div className="text-center py-10 bg-cockpit-charcoal/50 rounded-lg shadow p-8">
          <ListX size={48} className="mx-auto text-cockpit-dim-text mb-4" />
          <p className="text-xl text-cockpit-dim-text">Your favorites list is currently empty.</p>
          <p className="text-cockpit-dim-text mt-2">Explore the dashboard and add some countries!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
          {favoriteCountriesData.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
      <CountryDetailsModal /> {/* Re-use the modal for consistency */}
    </div>
  );
};

export default FavoritesPage;