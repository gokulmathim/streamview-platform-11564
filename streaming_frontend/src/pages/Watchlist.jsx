import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import ContentCard from '../components/ContentCard';
import PlayerModal from '../components/PlayerModal';

export default function Watchlist() {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => setList(await api.getWatchlist()))();
  }, []);

  const onToggle = async (item) => {
    const updated = await api.toggleWatchlist(item);
    setList(updated);
  };

  const onPlay = async (item) => {
    setSelected(await api.getContent(item.id));
  };

  return (
    <div className="container" style={{ padding:'24px 0' }}>
      <h1>Watchlist</h1>
      {list.length === 0 ? (
        <div style={{ color:'var(--color-muted)' }}>Your watchlist is empty. Add items from Browse.</div>
      ) : (
        <div className="grid cols-6">
          {list.map(x => (
            <ContentCard key={x.id} item={x} onPlay={onPlay} onToggleWatchlist={onToggle} inWatchlist={true} />
          ))}
        </div>
      )}
      <PlayerModal open={!!selected} item={selected} onClose={()=>setSelected(null)} onProgress={({progress})=> api.addHistory({ id: selected.id, title: selected.title, poster: selected.poster, progress })} />
    </div>
  );
}
