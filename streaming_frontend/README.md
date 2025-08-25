# StreamView – React Frontend

Modern, lightweight React frontend for an online streaming platform. Implements browsing, search, video playback, account management, subscriptions/payments, and watchlist/history with a light theme.

## Features

- User authentication (OAuth-ready via backend /auth/login endpoint)
- Content browsing and search
  - Responsive grid
  - Sidebar filters (genre, year, sort)
- Video playback
  - Modal player using native <video>
- Account management
  - Profile menu, account page
- Subscription and payment integration
  - Plans list, checkout redirect
- Watchlist and history
  - Add/remove to watchlist, auto-add to history on play
- Modern light theme with palette:
  - primary: #191970, secondary: #FFFFFF, accent: #FF7F50

## Getting Started

1) Install dependencies
   npm install

2) Configure environment
   Copy .env.example to .env and adjust values:
   - REACT_APP_API_BASE=/api
   - REACT_APP_OAUTH_REDIRECT=http://localhost:3000

3) Start
   npm start

Open http://localhost:3000

## API Integration

This frontend uses RESTful endpoints.

Expected endpoints:
- Auth
  - GET /auth/me
  - GET /auth/login?provider=google&redirectUri=<url> -> { authUrl }
  - POST /auth/logout
- Content
  - GET /content?q=&genre=&year=&sort= -> { items: [...] } or [...array]
  - GET /content/:id
- Watchlist
  - GET /watchlist -> { items: [{ id, ...content }]} or array
  - POST /watchlist { contentId }
  - DELETE /watchlist/:id
- History
  - GET /history -> { items: [...] }
  - POST /history { contentId, progress }
- Subscriptions
  - GET /subscriptions/plans -> { items: [...] }
  - GET /subscriptions/current
  - POST /subscriptions/checkout { planId, successUrl, cancelUrl } -> { checkoutUrl }

If backend is not available, pages fall back to minimal demo data.

## Structure

- src/AppRouter.js – routes and private routing
- src/context/AuthContext.js – authentication provider
- src/services/api.js – API client
- src/components/* – UI components (Navbar, ProfileMenu, SidebarFilters, ContentGrid, VideoModal)
- src/pages/* – pages (Home, Library, Subscriptions, Account, Watchlist, History)
- src/theme.js – theme variables injection
- src/index.css – global and component CSS imports

## Notes

- Public interfaces (functions/components) are annotated with PUBLIC_INTERFACE comments.
- No UI frameworks used; pure CSS for speed and simplicity.
- OAuth login starts at /auth/login and redirects to provider URL from backend.

