import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function HomePage() {
  return (
    <section>
      <div className="card" style={{ padding: 20, background: 'linear-gradient(90deg, rgba(25,25,112,0.08), rgba(255,127,80,0.08))' }}>
        <h1 className="page-title">Discover, Stream, Enjoy</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Browse thousands of movies and shows, watch instantly, and manage your personal library.
        </p>
        <div className="mt-24">
          <Link to="/library" className="button">Browse Library</Link>
          <Link to="/subscriptions" className="button button-ghost" style={{ marginLeft: 8 }}>View Plans</Link>
        </div>
      </div>
    </section>
  );
}
