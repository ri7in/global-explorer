import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getAllCountries, getCountryByName, getCountriesByRegion, getCountryByCode } from '../services/countryService';

const CountryContext = createContext();

export const useCountries = () => useContext(CountryContext);

// Helper to get initial search term and region from localStorage
const getInitialSearchTerm = () => localStorage.getItem('searchTerm') || '';
const getInitialSelectedRegion = () => localStorage.getItem('selectedRegion') || '';


export const CountryProvider = ({ children }) => {
  const [allCountries, setAllCountries] = useState([]); // Master list from /all
  const [displayedCountries, setDisplayedCountries] = useState([]); // Filtered list for display
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountryDetails, setSelectedCountryDetails] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filters state
  const [searchTerm, setSearchTerm] = useState(getInitialSearchTerm());
  const [selectedRegion, setSelectedRegion] = useState(getInitialSelectedRegion());

  // Persist search term and region
  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('selectedRegion', selectedRegion);
  }, [selectedRegion]);

  // Initial fetch for all countries
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllCountries();
        // Sort countries alphabetically by common name
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setAllCountries(data);
        setDisplayedCountries(data); // Initially display all
      } catch (err) {
        console.error("Failed to fetch all countries:", err);
        setError('Failed to load country data. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Effect to filter countries whenever searchTerm or selectedRegion changes
  useEffect(() => {
    let filtered = [...allCountries];

    if (selectedRegion) {
      // For demo, we'll client-side filter if allCountries is populated
      // Or you could re-fetch: getCountriesByRegion(selectedRegion)
      filtered = filtered.filter(country => country.region === selectedRegion);
    }

    if (searchTerm) {
      // For demo, we'll client-side filter if allCountries is populated
      // Or you could re-fetch: getCountryByName(searchTerm)
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(lowerSearchTerm) ||
        (country.name.official && country.name.official.toLowerCase().includes(lowerSearchTerm)) ||
        (country.cca2 && country.cca2.toLowerCase().includes(lowerSearchTerm)) ||
        (country.cca3 && country.cca3.toLowerCase().includes(lowerSearchTerm)) ||
        (country.altSpellings && country.altSpellings.some(spelling => spelling.toLowerCase().includes(lowerSearchTerm)))
      );
    }
    
    // If both searchTerm and selectedRegion are empty, show all countries sorted alphabetically
    if (!searchTerm && !selectedRegion) {
        setDisplayedCountries([...allCountries].sort((a, b) => a.name.common.localeCompare(b.name.common)));
    } else {
        setDisplayedCountries(filtered.sort((a, b) => a.name.common.localeCompare(b.name.common)));
    }

  }, [searchTerm, selectedRegion, allCountries]);


  const fetchCountryDetails = useCallback(async (countryCode) => { //cca3 code
    if (!countryCode) {
        setSelectedCountryDetails(null);
        setIsModalOpen(false);
        return;
    }
    setLoading(true); // You might want a specific loading state for the modal
    try {
      const data = await getCountryByCode(countryCode);
      setSelectedCountryDetails(data[0]); // API returns an array
      setIsModalOpen(true);
    } catch (err) {
      console.error(`Failed to fetch details for ${countryCode}:`, err);
      setError(`Failed to load details for ${countryCode}.`);
      setSelectedCountryDetails(null);
      setIsModalOpen(false);
    } finally {
      setLoading(false); // Reset general loading or modal specific loading
    }
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('');
    setDisplayedCountries([...allCountries].sort((a, b) => a.name.common.localeCompare(b.name.common)));
  };

  const value = {
    countries: displayedCountries,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedRegion,
    setSelectedRegion,
    fetchCountryDetails,
    selectedCountryDetails,
    setSelectedCountryDetails, // to allow closing modal by setting to null
    isModalOpen,
    setIsModalOpen,
    allCountries, // expose for other uses e.g. favorites page to lookup by code
    clearFilters,
  };

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
};