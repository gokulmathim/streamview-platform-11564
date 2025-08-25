import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function History() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => setList(await api.getHistory()))();
  }, []);

  return (
    <div className="container" style={{ padding:'24px 0' }}>
      <h1>History</h1>
      {list.length === 0 ? (
        <div style={{ color:'var(--color-muted)' }}>You haven't watched anything yet.</div>
      ) : (
        <div style={{ display:'grid', gap: 10 }}>
          {list.map(item => (
            <div key={item.id} className="card" style={{ display:'grid', gridTemplateColumns:'120px 1fr', gap: 12, padding: 10, alignItems:'center' }}>
              <img src={item.poster} alt="" width={120} style={{ borderRadius: 8, aspectRatio:'2/3', objectFit:'cover' }} />
              <div style={{ display:'grid', gap: 6 }}>
                <div style={{ fontWeight: 700 }}>{item.title}</div>
                <div style={{ color:'var(--color-muted)', fontSize: 13 }}>
                  Watched {new Date(item.watchedAt).toLocaleString()} • Progress {(item.progress*100).toFixed(0)}%
                </div>
                <div style={{ height: 6, background:'#f3f4f6', borderRadius: 999 }}>
                  <div style={{ height: '100%', width: `${(item.progress*100).toFixed(0)}%`, background:'linear-gradient(90deg, var(--color-accent), var(--color-primary))', borderRadius: 999 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
