// src/components/Country/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { useCountries } from '../../contexts/CountryContext';
import { useDebounce } from '../../hooks/useDebounce';
import { Search, XCircle } from 'lucide-react';

const SearchBar = () => {
  const { searchTerm: globalSearchTerm, setSearchTerm: setGlobalSearchTerm } = useCountries();
  const [localSearchTerm, setLocalSearchTerm] = useState(globalSearchTerm);
  const debouncedSearchTerm = useDebounce(localSearchTerm, 500); // 500ms delay

  useEffect(() => {
    setGlobalSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setGlobalSearchTerm]);

  // Sync local state if global term changes (e.g. by 'clear filters')
  useEffect(() => {
    setLocalSearchTerm(globalSearchTerm);
  }, [globalSearchTerm]);

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    setGlobalSearchTerm('');
  };

  return (
    <div className="relative w-full max-w-lg">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-cockpit-dim-text" />
      </div>
      <input
        type="text"
        placeholder="Search for a country by name, code..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 border border-cockpit-hud bg-cockpit-charcoal rounded-lg shadow-sm placeholder-cockpit-dim-text focus:outline-none focus:ring-2 focus:ring-cockpit-accent focus:border-cockpit-accent sm:text-sm text-cockpit-light-text"
      />
      {localSearchTerm && (
        <button 
          onClick={handleClearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-cockpit-dim-text hover:text-cockpit-light-text"
          aria-label="Clear search"
        >
          <XCircle size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;