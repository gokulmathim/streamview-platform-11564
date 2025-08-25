import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function Account() {
  const { user, refreshProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [busy, setBusy] = useState(false);
  const [sub, setSub] = useState(null);

  useEffect(() => { setName(user?.name || ''); }, [user]);
  useEffect(() => { (async ()=> setSub(await api.getSubscription()))(); }, []);

  const onSave = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.updateProfile({ name });
      await refreshProfile();
    } finally {
      setBusy(false);
    }
  };

  const onSubscribe = async () => {
    const s = await api.subscribe('Premium');
    setSub(s);
  };

  const onCancel = async () => {
    const s = await api.cancelSubscription();
    setSub(s);
  };

  return (
    <div className="container" style={{ padding:'24px 0', display:'grid', gap: 20 }}>
      <div className="card" style={{ padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Profile</h2>
        <form onSubmit={onSave} style={{ display:'grid', gap: 12 }}>
          <label>
            <div className="section-title">Display name</div>
            <input className="input" value={name} onChange={(e)=>setName(e.target.value)} aria-label="Display name" />
          </label>
          <div style={{ display:'flex', gap: 10, alignItems:'center' }}>
            <img src={user?.avatar} alt="" width={40} height={40} style={{ borderRadius: 8, border:'1px solid var(--color-border)' }} />
            <div style={{ color:'var(--color-muted)' }}>{user?.email}</div>
          </div>
          <button className="btn" disabled={busy} type="submit">{busy ? 'Saving…' : 'Save changes'}</button>
        </form>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Subscription</h2>
        {!sub ? (
          <div style={{ color:'var(--color-muted)' }}>Loading subscription…</div>
        ) : (
          <div style={{ display:'grid', gap: 10 }}>
            <div>
              <strong>Plan:</strong> {sub.plan}
            </div>
            <div>
              <strong>Status:</strong> {sub.status}
            </div>
            <div>
              <strong>Renews on:</strong> {sub.renewsOn ? new Date(sub.renewsOn).toDateString() : '-'}
            </div>
            {sub.status !== 'active' ? (
              <button className="btn secondary" onClick={onSubscribe}>Upgrade to Premium</button>
            ) : (
              <button className="btn ghost" onClick={onCancel}>Cancel subscription</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
