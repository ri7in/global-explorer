// src/components/Country/FilterDropdown.jsx
import React from 'react';
import { useCountries } from '../../contexts/CountryContext';
import { ChevronDown } from 'lucide-react';

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]; // Antarctic is often excluded or special

const FilterDropdown = () => {
  const { selectedRegion, setSelectedRegion } = useCountries();

  return (
    <div className="relative">
      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        className="appearance-none w-full md:w-auto bg-cockpit-charcoal border border-cockpit-hud text-cockpit-light-text py-2.5 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cockpit-accent focus:border-cockpit-accent sm:text-sm cursor-pointer"
      >
        <option value="">Filter by Region (All)</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-cockpit-dim-text">
        <ChevronDown size={20} />
      </div>
    </div>
  );
};

export default FilterDropdown;