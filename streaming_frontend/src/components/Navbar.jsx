import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';

  const onSearch = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const query = form.get('q') || '';
    const next = new URLSearchParams(params);
    if (query) next.set('q', query);
    else next.delete('q');
    setParams(next, { replace: false });
    navigate(`/browse?${next.toString()}`);
  };

  return (
    <div className="navbar">
      <div className="container navbar-inner">
        <Link to="/browse" className="brand" aria-label="StreamView Home">
          <span style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            display: 'inline-block'
          }} />
          <span>StreamView</span>
          <span className="badge">Beta</span>
        </Link>

        <form onSubmit={onSearch} className="searchbar" role="search" aria-label="Search catalog">
          <input
            className="input"
            name="q"
            type="search"
            placeholder="Search movies, shows, genres…"
            defaultValue={q}
            aria-label="Search"
          />
          <button className="btn" type="submit" aria-label="Search content">Search</button>
        </form>

        <div className="nav-actions">
          <Link to="/watchlist" className="btn ghost">Watchlist</Link>
          <Link to="/history" className="btn ghost">History</Link>
          {isAuthenticated ? (
            <>
              <Link to="/account" className="btn secondary">Account</Link>
              <button className="btn" onClick={async ()=>{ await logout(); navigate('/login'); }} aria-label="Logout">Logout</button>
              <img
                src={user?.avatar}
                width={32}
                height={32}
                alt="Avatar"
                style={{ borderRadius: 8, border: '1px solid var(--color-border)' }}
              />
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn secondary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
