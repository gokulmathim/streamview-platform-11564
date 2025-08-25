import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const email = form.get('email');
    const password = form.get('password');

    try {
      await register({ name, email, password });
      navigate('/browse');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container" style={{ padding:'40px 0', maxWidth: 520 }}>
      <h1 style={{ marginBottom: 6 }}>Create your account</h1>
      <div style={{ color:'var(--color-muted)', marginBottom: 20 }}>Start your StreamView journey today.</div>

      <form onSubmit={onSubmit} className="card" style={{ padding: 16, display:'grid', gap: 10 }}>
        <label>
          <div className="section-title">Name</div>
          <input className="input" type="text" name="name" placeholder="Your name" required aria-label="Name" />
        </label>
        <label>
          <div className="section-title">Email</div>
          <input className="input" type="email" name="email" placeholder="you@example.com" required aria-label="Email" />
        </label>
        <label>
          <div className="section-title">Password</div>
          <input className="input" type="password" name="password" placeholder="••••••••" required aria-label="Password" />
        </label>
        {error && <div style={{ color:'#b91c1c' }}>{error}</div>}
        <button className="btn secondary" disabled={busy} type="submit">{busy ? 'Creating…' : 'Create account'}</button>
      </form>

      <div style={{ marginTop: 14, color:'var(--color-muted)' }}>
        Already have an account? <Link to="/login" style={{ color:'var(--color-primary)', fontWeight:700 }}>Sign in</Link>
      </div>
    </div>
  );
}
