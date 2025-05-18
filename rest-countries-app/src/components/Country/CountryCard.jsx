// src/components/Country/CountryCard.jsx
import React from 'react';
import { useCountries } from '../../contexts/CountryContext';
import { useAuth } from '../../contexts/AuthContext';
import { MapPin, Users, Globe as RegionIcon, Star, Eye } from 'lucide-react';

const CountryCard = ({ country }) => {
  const { fetchCountryDetails } = useCountries();
  const { isAuthenticated, addFavorite, removeFavorite, isFavorite } = useAuth();

  const handleViewDetails = () => {
    fetchCountryDetails(country.cca3);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // Prevent card click when clicking favorite
    if (isFavorite(country.cca3)) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country.cca3);
    }
  };

  return (
    <div 
      className="bg-cockpit-charcoal rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-hud-glow"
      onClick={handleViewDetails}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleViewDetails()}
      aria-label={`View details for ${country.name.common}`}
    >
      <div className="relative">
        <img 
          src={country.flags.svg || country.flags.png} 
          alt={`Flag of ${country.name.common}`} 
          className="w-full h-40 object-cover" 
          loading="lazy"
        />
        {isAuthenticated && (
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors duration-200
                        ${isFavorite(country.cca3) ? 'bg-cockpit-accent text-white shadow-accent-glow' : 'bg-cockpit-dark/70 text-cockpit-light-text hover:bg-cockpit-accent hover:text-white'}`}
            aria-label={isFavorite(country.cca3) ? `Remove ${country.name.common} from favorites` : `Add ${country.name.common} to favorites`}
            title={isFavorite(country.cca3) ? `Remove from Favorites` : `Add to Favorites`}
          >
            <Star size={18} fill={isFavorite(country.cca3) ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-cockpit-hud mb-2 truncate" title={country.name.common}>
          {country.name.common}
        </h3>
        <div className="space-y-1.5 text-sm text-cockpit-dim-text">
          <p className="flex items-center">
            <Users size={14} className="mr-2 text-cockpit-hud" /> 
            Population: {country.population ? country.population.toLocaleString() : 'N/A'}
          </p>
          <p className="flex items-center">
            <RegionIcon size={14} className="mr-2 text-cockpit-hud" /> 
            Region: {country.region || 'N/A'}
          </p>
          <p className="flex items-center">
            <MapPin size={14} className="mr-2 text-cockpit-hud" /> 
            Capital: {country.capital ? country.capital.join(', ') : 'N/A'}
          </p>
        </div>
        <button
            onClick={handleViewDetails}
            className="mt-4 w-full flex items-center justify-center text-sm bg-cockpit-hud/20 text-cockpit-hud hover:bg-cockpit-hud/40 px-3 py-1.5 rounded-md font-medium transition-colors"
        >
            <Eye size={16} className="mr-2"/> View Details
        </button>
      </div>
    </div>
  );
};

export default CountryCard;