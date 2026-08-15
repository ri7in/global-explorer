// src/components/Country/CountryDetailsModal.jsx
import React from 'react';
import Modal from '../Common/Modal';
import { useCountries } from '../../contexts/CountryContext';
import { useAuth } from '../../contexts/AuthContext';
import Spinner from '../Common/Spinner';
// Corrected import: Removed GlobeAsia, will use Globe
import { MapPin, Users, Languages, Globe, Landmark, Coins, Clock, Compass, Map, Star, ExternalLink } from 'lucide-react';

const DetailItem = ({ icon, label, value, className = '' }) => (
  <div className={`flex items-start py-2 ${className}`}>
    {React.createElement(icon, {
      className: 'w-5 h-5 text-cockpit-hud mr-3 mt-1 flex-shrink-0',
    })}
    <div>
      <span className="font-semibold text-cockpit-dim-text">{label}:</span>
      <span className="ml-2 text-cockpit-light-text">{value || 'N/A'}</span>
    </div>
  </div>
);

const CountryDetailsModal = () => {
  const { selectedCountryDetails: country, setSelectedCountryDetails, isModalOpen, setIsModalOpen } = useCountries();
  const { isAuthenticated, addFavorite, removeFavorite, isFavorite } = useAuth();

  if (!country) return null;

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedCountryDetails(null);
  };

  // Prepare values for DetailItem
  const capital = Array.isArray(country.capital) ? country.capital.join(', ') : country.capital;
  const languages = country.languages ? Object.values(country.languages).join(', ') : '';
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(', ')
    : '';
  const borders = country.borders ? country.borders.join(', ') : '';
  const nativeName =
    country.name.nativeName && Object.values(country.name.nativeName)[0]
      ? Object.values(country.name.nativeName)[0].common
      : '';

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose} title={country.name.common} size="4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Flag and Basic Info */}
        <div>
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-48 object-cover rounded-lg mb-4 border border-cockpit-hud/20"
          />
          {isAuthenticated && (
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isFavorite(country.cca3)
                  ? 'bg-yellow-400 text-black'
                  : 'bg-cockpit-hud text-cockpit-light-text hover:bg-cockpit-hud/80'
              }`}
              onClick={() =>
                isFavorite(country.cca3)
                  ? removeFavorite(country.cca3)
                  : addFavorite(country.cca3)
              }
            >
              {isFavorite(country.cca3) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          )}
        </div>

        {/* Right Column: Detailed Information */}
        <div className="space-y-1 text-sm divide-y divide-cockpit-hud/20">
          <h3 className="text-xl font-semibold text-cockpit-light-text mb-1">{country.name.official}</h3>
          <p className="text-cockpit-dim-text italic pb-2">Native Name: {nativeName}</p>

          <DetailItem icon={Landmark} label="Capital(s)" value={capital} />
          <DetailItem icon={Users} label="Population" value={country.population?.toLocaleString()} />
          <DetailItem icon={Globe} label="Region" value={country.region} />
          <DetailItem icon={Compass} label="Subregion" value={country.subregion} />
          <DetailItem icon={Languages} label="Languages" value={languages} />
          <DetailItem icon={Coins} label="Currencies" value={currencies} />
          <DetailItem icon={Clock} label="Timezones" value={country.timezones?.join(', ')} />
          <DetailItem icon={Map} label="Borders" value={borders} />
          <DetailItem icon={MapPin} label="Lat/Lng" value={country.latlng?.join(', ')} />
          <DetailItem icon={Globe} label="Top Level Domain" value={country.tld?.join(', ')} />
          {country.maps?.googleMaps && (
            <div className="pt-3">
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-cockpit-hud hover:text-blue-300 underline transition-colors"
              >
                View on Google Maps <ExternalLink size={14} className="ml-1.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CountryDetailsModal;
