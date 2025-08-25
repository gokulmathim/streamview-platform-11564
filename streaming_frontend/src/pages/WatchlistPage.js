import React, { useCallback, useEffect, useState } from 'react';
import { Endpoints } from '../services/api';
import ContentGrid from '../components/ContentGrid';
import VideoModal from '../components/VideoModal';

// PUBLIC_INTERFACE
export default function WatchlistPage() {
  const [items, setItems] = useState([]);
  const [watchlistIds, setWatchlistIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const load = useCallback(async () => {
    try {
      const wl = await Endpoints.getWatchlist();
      const list = (wl?.items || wl || []).map(x => x.content || x);
      setItems(list);
      setWatchlistIds(list.map(i => i.id));
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const onPlay = (item) => { setCurrent(item); setOpen(true); };
  const onRemoveWatchlist = async (item) => {
    try {
      await Endpoints.removeFromWatchlist(item.id);
      setWatchlistIds(prev => prev.filter(id => id !== item.id));
      setItems(prev => prev.filter(i => i.id !== item.id));
    } catch { /* ignore */ }
  };

  return (
    <section>
      <h2 className="page-title">Your Watchlist</h2>
      <ContentGrid
        items={items}
        onPlay={onPlay}
        watchlistIds={watchlistIds}
        onRemoveWatchlist={onRemoveWatchlist}
      />
      <VideoModal open={open} onClose={() => setOpen(false)} item={current} />
    </section>
  );
}
