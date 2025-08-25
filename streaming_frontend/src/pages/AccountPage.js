import React from 'react';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function AccountPage() {
  const { user } = useAuth();
  return (
    <section>
      <h2 className="page-title">Account</h2>
      <div className="card" style={{ padding: 16 }}>
        <div className="flex">
          <div className="avatar lg">{(user?.name || 'U').slice(0,2).toUpperCase()}</div>
          <div>
            <div style={{ fontWeight: 700 }}>{user?.name || 'User'}</div>
            <div style={{ color: 'var(--color-text-muted)' }}>{user?.email || ''}</div>
          </div>
        </div>
        <div className="mt-24">
          <label>Display name</label>
          <input className="input" defaultValue={user?.name || ''} disabled />
          <small style={{ color: 'var(--color-text-muted)' }}>Profile editing is managed by your identity provider.</small>
        </div>
      </div>
    </section>
  );
}
