# Global Explorer - REST Countries API Frontend

> University coursework fork associated with [@ri7in](https://github.com/ri7in).

## Overview

Global Explorer is a React-based frontend application that allows users to browse, search, and learn about countries around the world using data from the [REST Countries API](https://restcountries.com/). This project showcases skills in modern frontend development, API integration, state management, and responsive design, featuring an aviation-inspired "cockpit" theme.

## Features

*   Browse a comprehensive list of countries.
*   Search for countries by name or code.
*   Filter countries by region.
*   View detailed information for each country in a modal popup, including:
    *   Flag, Official Name, Native Name
    *   Capital, Population, Region, Subregion
    *   Languages, Currencies, Timezones
    *   Bordering countries, Latitude/Longitude, Top Level Domain
    *   Link to Google Maps.
*   (Mock) User Authentication:
    *   User registration (username, email, password).
    *   User login.
*   Favorite Countries:
    *   Logged-in users can add/remove countries from a personal favorites list.
    *   Dedicated page to view favorite countries.
*   Sleek, aviation-inspired dark theme ("cockpit vibes").
*   Responsive design for various screen sizes.
*   Dynamic updates without page refresh.
*   Client-side session persistence for search terms, filters, and user session.

## Technology Stack

*   **Frontend:** React (Vite build tool)
*   **Language:** JavaScript (ES6+)
*   **Styling:** Tailwind CSS (with custom theming)
*   **State Management:** React Context API
*   **API Calls:** Axios
*   **Routing:** React Router DOM
*   **Icons:** Lucide React
*   **Linting/Formatting:** (ESLint/Prettier - if configured)
*   **Version Control:** Git & GitHub
*   **Deployment:** (e.g., Netlify, Vercel)

## API Endpoints Used (REST Countries API v3.1)

The application primarily uses the following endpoints from `https://restcountries.com/v3.1/`:

1.  **`GET /all?fields=...`**: To fetch a list of all countries with essential fields for the main dashboard display.
2.  **`GET /name/{name}?fields=...`**: To search for countries by their common or official name (client-side filtering is primarily used after initial load for performance, but this endpoint is available).
3.  **`GET /region/{region}?fields=...`**: To filter countries by a specific region (client-side filtering is primarily used after initial load).
4.  **`GET /alpha/{code}`**: To fetch full details for a specific country using its CCA2, CCA3, CCN3, or CIOC code (used for the country details modal).
5.  **`GET /alpha?codes={codes}&fields=...`**: To fetch details for multiple countries by their codes (used for the favorites page).

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd rest-countries-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173`.

2.  **Build for production:**
    ```bash
    npm run build
    ```
    This creates an optimized build in the `dist/` directory.

## Deployment

The application is hosted on [Your Hosting Platform Link Here - e.g., Netlify, Vercel].

**URL:** [Your Deployed Application URL Here]

*(Provide this URL once deployed)*

## Report: Chosen APIs, Challenges, and Resolutions

*(This section is for your assignment report. Briefly discuss your experience.)*

**Chosen APIs:**
The primary API used is the REST Countries API (v3.1). The selection of endpoints (`/all`, `/name`, `/region`, `/alpha`) was guided by the assignment requirements to showcase data fetching for lists, searching, filtering, and detailed views.

**Challenges Faced & Resolutions:**

*   **Challenge 1: State Management Complexity:** Managing global state for countries, filters, authentication, and modal visibility.
    *   **Resolution:** Utilized React Context API to create separate contexts (`CountryContext`, `AuthContext`) for a clear separation of concerns. This made state management more organized and props drilling was avoided.
*   **Challenge 2: API Rate Limiting/Performance for Search:** Initially considered fetching from `/name/{name}` on every keystroke for search.
    *   **Resolution:** Implemented a debounce mechanism (`useDebounce` custom hook) for the search input to reduce API calls. For general filtering and searching after initial load, client-side filtering on the `/all` dataset was prioritized for better performance and UX, falling back to specific API calls if needed or for initial loads of filtered views (like a direct link to a region).
*   **Challenge 3: Styling the "Aviation Cockpit" Theme:** Achieving the desired aesthetic with minimalism using Tailwind CSS required careful class selection and custom theme configuration.
    *   **Resolution:** Extended Tailwind's default theme in `tailwind.config.js` with a custom color palette (`cockpit-dark`, `cockpit-hud`, etc.) and font families. Used subtle shadows and transitions to enhance the futuristic feel without clutter.
*   **Challenge 4: Managing Favorite Countries with Mock Auth:** Persisting favorites per user with mock authentication required careful handling of `localStorage`.
    *   **Resolution:** Stored a list of users and a separate list of favorite entries (linking user to country code) in `localStorage`. The `AuthContext` handles loading and saving these appropriately when a user logs in or modifies their favorites.
*   **Challenge 5: Ensuring 4 Unique Endpoints are Meaningfully Used:**
    *   **Resolution:**
        *   `/all`: Initial data load.
        *   `/alpha/{code}`: Essential for detailed country view modal.
        *   `/name/{name}` and `/region/{region}`: While client-side filtering is often faster after an initial `/all` fetch, these endpoints are directly integrated into the `countryService.js` and can be used by the `CountryContext` if a strategy involving more server-side filtering is preferred for specific scenarios (e.g., if the dataset was too large for client-side handling or to demonstrate the endpoint usage as per requirements). The context currently leans on client-side filtering post-initial load for responsiveness but has the service functions ready. The favorites page uses `getCountriesByCodes` which is a variant of `/alpha?codes=...`.

*(Add any other specific challenges you encountered)*
