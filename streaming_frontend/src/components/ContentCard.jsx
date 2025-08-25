import React from 'react';

export default function ContentCard({ item, onPlay, onToggleWatchlist, inWatchlist }) {
  return (
    <div className="card" aria-label={`${item.title} card`}>
      <div style={{ position:'relative' }}>
        <img
          src={item.poster}
          alt={`${item.title} poster`}
          style={{ width: '100%', display:'block', aspectRatio:'2/3', objectFit:'cover' }}
        />
        <button
          className="btn"
          onClick={() => onPlay(item)}
          style={{ position:'absolute', bottom: 12, left: 12 }}
          aria-label={`Play ${item.title}`}
        >
          ▶ Play
        </button>
        <button
          className="btn ghost"
          onClick={() => onToggleWatchlist(item)}
          style={{ position:'absolute', bottom: 12, right: 12 }}
          aria-label={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          {inWatchlist ? '− Watchlist' : '+ Watchlist'}
        </button>
      </div>
      <div style={{ padding: 12, display:'grid', gap: 6 }}>
        <div style={{ fontWeight: 700 }}>{item.title}</div>
        <div style={{ display:'flex', gap:8, alignItems:'center', color:'var(--color-muted)', fontSize: 13 }}>
          <span>{item.year}</span>
          <span>•</span>
          <span>{item.genre}</span>
          <span>•</span>
          <span>⭐ {item.rating}</span>
        </div>
      </div>
    </div>
  );
}
