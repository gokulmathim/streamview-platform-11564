import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './theme.css';
import Navbar from './components/Navbar';
import Browse from './pages/Browse';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Watchlist from './pages/Watchlist';
import History from './pages/History';
import { useAuth } from './context/AuthContext';

// PUBLIC_INTERFACE
function ProtectedRoute({ children }) {
  /** Protect a route by checking authentication, redirecting to login with next param. */
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    const next = encodeURIComponent(window.location.pathname + window.location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  return children;
}

// PUBLIC_INTERFACE
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/browse" replace />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div className="container" style={{ padding:'24px 0' }}>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
