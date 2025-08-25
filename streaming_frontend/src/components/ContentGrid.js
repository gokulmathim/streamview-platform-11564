import React from 'react';
import './content.css';

// PUBLIC_INTERFACE
export default function ContentGrid({ items, onPlay, onAddWatchlist, onRemoveWatchlist, watchlistIds = [] }) {
  if (!items?.length) {
    return <div className="empty">No content found.</div>;
  }
  return (
    <div className="grid grid-4">
      {items.map(item => (
        <ContentCard
          key={item.id}
          item={item}
          onPlay={() => onPlay(item)}
          inWatchlist={watchlistIds.includes(item.id)}
          onAddWatchlist={() => onAddWatchlist?.(item)}
          onRemoveWatchlist={() => onRemoveWatchlist?.(item)}
        />
      ))}
    </div>
  );
}

function ContentCard({ item, onPlay, inWatchlist, onAddWatchlist, onRemoveWatchlist }) {
  return (
    <div className="content-card card">
      <div className="poster" style={{ backgroundImage: `url(${item.posterUrl || ''})` }}>
        <div className="poster-overlay">
          <button className="button" onClick={onPlay}>▶ Watch</button>
        </div>
      </div>
      <div className="content-meta">
        <div className="title" title={item.title}>{item.title}</div>
        <div className="meta-row">
          <span className="tag">{item.year || '—'}</span>
          {item.genre && <span className="tag">{item.genre}</span>}
          {item.rating && <span className="tag">★ {item.rating}</span>}
        </div>
        <div className="actions">
          {!inWatchlist ? (
            <button className="button button-ghost" onClick={onAddWatchlist}>＋ Watchlist</button>
          ) : (
            <button className="button button-ghost" onClick={onRemoveWatchlist}>✓ In Watchlist</button>
          )}
        </div>
      </div>
    </div>
  );
}
