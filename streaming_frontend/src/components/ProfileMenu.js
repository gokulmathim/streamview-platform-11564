import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './profile.css';

const providers = [
  { id: 'google', label: 'Continue with Google' },
  { id: 'github', label: 'Continue with GitHub' }
];

// PUBLIC_INTERFACE
export default function ProfileMenu() {
  const { user, isAuthenticated, loginWithProvider, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const initials = user?.name?.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase() || 'U';

  return (
    <div className="profile">
      <button className="profile-trigger" onClick={() => setOpen(v => !v)} aria-haspopup="menu" aria-expanded={open}>
        {isAuthenticated ? (
          <span className="avatar">{initials}</span>
        ) : (
          <span className="signin">Sign in</span>
        )}
      </button>
      {open && (
        <div className="profile-menu" role="menu">
          {isAuthenticated ? (
            <>
              <div className="profile-header">
                <div className="avatar lg">{initials}</div>
                <div>
                  <div className="name">{user?.name || 'User'}</div>
                  <div className="email">{user?.email || ''}</div>
                </div>
              </div>
              <Link to="/account" className="menu-item">Account</Link>
              <Link to="/watchlist" className="menu-item">Watchlist</Link>
              <Link to="/history" className="menu-item">History</Link>
              <Link to="/subscriptions" className="menu-item">Subscriptions</Link>
              <button className="menu-item danger" onClick={logout}>Sign out</button>
            </>
          ) : (
            <>
              {providers.map(p => (
                <button key={p.id} className="menu-item" onClick={() => loginWithProvider(p.id)}>
                  {p.label}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
