import React from 'react';
import Navbar from './Navbar';
import './layout.css';

// PUBLIC_INTERFACE
export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        {children}
      </main>
      <footer className="app-footer">
        <div>© {new Date().getFullYear()} StreamView</div>
      </footer>
    </div>
  );
}
