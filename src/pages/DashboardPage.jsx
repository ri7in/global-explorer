// src/pages/DashboardPage.jsx
import React from 'react';
import SearchBar from '../components/Country/SearchBar';
import FilterDropdown from '../components/Country/FilterDropdown';
import CountryList from '../components/Country/CountryList';
import CountryDetailsModal from '../components/Country/CountryDetailsModal';
import { useCountries } from '../contexts/CountryContext';
import { FilterX } from 'lucide-react';


const DashboardPage = () => {
  const { clearFilters, searchTerm, selectedRegion } = useCountries();
  const filtersApplied = searchTerm || selectedRegion;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-cockpit-charcoal/50 rounded-lg shadow">
        <SearchBar />
        <div className="flex items-center gap-4">
          <FilterDropdown />
          {filtersApplied && (
            <button
              onClick={clearFilters}
              className="flex items-center text-cockpit-dim-text hover:text-cockpit-light-text transition-colors p-2 rounded-md border border-cockpit-dim-text hover:border-cockpit-light-text"
              title="Clear all filters"
            >
              <FilterX size={20} className="mr-1 md:mr-2" />
              <span className="text-sm hidden md:inline">Clear Filters</span>
            </button>
          )}
        </div>
      </div>
      
      <CountryList />
      <CountryDetailsModal />
    </div>
  );
};

export default DashboardPage;