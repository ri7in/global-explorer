// src/components/Country/CountryList.jsx
import React from 'react';
import { useCountries } from '../../contexts/CountryContext';
import CountryCard from './CountryCard';
import Spinner from '../Common/Spinner';

const CountryList = () => {
  const { countries, loading, error } = useCountries();

  if (loading && countries.length === 0) { // Show spinner only on initial load or full filter change
    return <Spinner size="lg" />;
  }

  if (error) {
    return <p className="text-center text-red-400 text-lg bg-red-900/30 p-4 rounded-md">{error}</p>;
  }

  if (!countries || countries.length === 0) {
    return <p className="text-center text-cockpit-dim-text text-lg mt-8">No countries found matching your criteria. Try adjusting your search or filters.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
      {countries.map((country) => (
        <CountryCard key={country.cca3 || country.name.official} country={country} />
      ))}
    </div>
  );
};

export default CountryList;