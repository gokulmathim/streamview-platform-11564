import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProfileMenu() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  if (!user) return null;

  return (
    <div style={{ position:'relative' }}>
      <button className="btn ghost" onClick={()=>setOpen(v=>!v)} aria-haspopup="menu" aria-expanded={open}>
        <img src={user.avatar} alt="" width={20} height={20} style={{ borderRadius: 4 }} />
        {user.name}
      </button>
      {open && (
        <div role="menu" className="card" style={{ position:'absolute', right:0, top:44, minWidth:220, padding:10 }}>
          <Link to="/account" className="btn ghost" style={{ width:'100%' }}>Account</Link>
          <Link to="/watchlist" className="btn ghost" style={{ width:'100%', marginTop:6 }}>Watchlist</Link>
          <Link to="/history" className="btn ghost" style={{ width:'100%', marginTop:6 }}>History</Link>
        </div>
      )}
    </div>
  );
}
