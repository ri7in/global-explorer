import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1';

// Using specific fields to reduce data transfer unless all are needed
const commonFields = 'fields=name,cca2,cca3,capital,region,subregion,population,flags,languages,currencies,timezones,borders,latlng,tld';

export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all?${commonFields}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all countries:", error);
    throw error;
  }
};

export const getCountryByName = async (name) => {
  if (!name) return []; // Or handle as an error
  try {
    const response = await axios.get(`${API_BASE_URL}/name/${encodeURIComponent(name)}?${commonFields}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return []; // Country not found, return empty array
    }
    console.error(`Error fetching country by name "${name}":`, error);
    throw error;
  }
};

export const getCountriesByRegion = async (region) => {
  if (!region) return []; // Or handle as an error
  try {
    const response = await axios.get(`${API_BASE_URL}/region/${encodeURIComponent(region)}?${commonFields}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return []; // Region not found or no countries in region
    }
    console.error(`Error fetching countries by region "${region}":`, error);
    throw error;
  }
};

export const getCountryByCode = async (code) => { // cca2, ccn3, cca3 or cioc code
  if (!code) return null;
  try {
    // Using full details for the detail view
    const response = await axios.get(`${API_BASE_URL}/alpha/${encodeURIComponent(code)}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // Country code not found
    }
    console.error(`Error fetching country by code "${code}":`, error);
    throw error;
  }
};

// Example of getting multiple countries by code (useful for favorites page)
export const getCountriesByCodes = async (codes) => { // codes is an array of cca3
  if (!codes || codes.length === 0) return [];
  try {
    const response = await axios.get(`${API_BASE_URL}/alpha?codes=${codes.join(',')}&${commonFields}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries by codes:", error);
    throw error;
  }
};