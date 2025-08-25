# StreamView Frontend (React)

Modern, lightweight React frontend for an online streaming platform with:
- User authentication
- Content browsing and search
- Video playback (HTML5)
- Account management
- Subscription and payment integration (mock)
- Watchlist and viewing history
- Responsive modern UI using the specified theme and colors

## Quick Start

- Install: npm install
- Run dev: npm start
- Build: npm run build
- Test: npm test

Open http://localhost:3000 to view.

## Features

- Authentication (mock, accepts any email/password)
- Browse catalog with filters (genre, year, sort) and search
- Play videos in a modal with progress tracking
- Manage profile (name) and subscription (activate/cancel) in Account
- Add/remove items from Watchlist
- History with progress bars and timestamps
- Clean, responsive UI with primary #191970, secondary #FFFFFF, accent #FF7F50

## Structure

src/
- App.js: route configuration and layout
- theme.css: theme and global styles
- context/AuthContext.jsx: auth state across app
- services/api.js: mock API ready to be replaced with real endpoints
- components/: Navbar, PlayerModal, ContentCard, ProfileMenu
- pages/: Browse, Login, Register, Account, Watchlist, History

## Integration

Replace the implementations in src/services/api.js with real REST calls (and OAuth) when backend is available. Keep the same function signatures to minimize changes.

Environment variables are not required for this mock. For production integrations, use a .env file and import via process.env.

## Accessibility

- Landmarks for search, dialog roles for modal
- Labels on form elements and buttons
- Keyboard-friendly components

## License

Internal Kavia template adaptation.
