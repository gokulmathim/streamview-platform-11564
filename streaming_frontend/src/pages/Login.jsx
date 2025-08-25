import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const next = params.get('next') || '/browse';

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    const form = new FormData(e.currentTarget);
    const email = form.get('email');
    const password = form.get('password');

    try {
      await login({ email, password });
      navigate(next);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container" style={{ padding:'40px 0', maxWidth: 520 }}>
      <h1 style={{ marginBottom: 6 }}>Welcome back</h1>
      <div style={{ color:'var(--color-muted)', marginBottom: 20 }}>Sign in to continue watching.</div>

      <form onSubmit={onSubmit} className="card" style={{ padding: 16, display:'grid', gap: 10 }}>
        <label>
          <div className="section-title">Email</div>
          <input className="input" type="email" name="email" placeholder="you@example.com" required aria-label="Email" />
        </label>
        <label>
          <div className="section-title">Password</div>
          <input className="input" type="password" name="password" placeholder="••••••••" required aria-label="Password" />
        </label>
        {error && <div style={{ color:'#b91c1c' }}>{error}</div>}
        <button className="btn" disabled={busy} type="submit">{busy ? 'Signing in…' : 'Sign In'}</button>
      </form>

      <div style={{ marginTop: 14, color:'var(--color-muted)' }}>
        New here? <Link to="/register" style={{ color:'var(--color-primary)', fontWeight:700 }}>Create an account</Link>
      </div>
    </div>
  );
}
