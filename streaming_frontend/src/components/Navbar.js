import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileMenu from './ProfileMenu';
import './navbar.css';

// PUBLIC_INTERFACE
export default function Navbar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (q) params.set('q', q);
    else params.delete('q');
    navigate(`/library?${params.toString()}`);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          <span className="brand-mark">▶</span> StreamView
        </Link>
        <Link to="/library" className="nav-link">Browse</Link>
        {isAuthenticated && (
          <>
            <Link to="/watchlist" className="nav-link">Watchlist</Link>
            <Link to="/history" className="nav-link">History</Link>
          </>
        )}
        <Link to="/subscriptions" className="nav-link">Plans</Link>
      </div>
      <form className="nav-search" onSubmit={onSubmit} role="search">
        <input
          className="nav-input"
          placeholder="Search movies, shows..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search content"
        />
      </form>
      <div className="nav-right">
        <ProfileMenu />
      </div>
    </nav>
  );
}
