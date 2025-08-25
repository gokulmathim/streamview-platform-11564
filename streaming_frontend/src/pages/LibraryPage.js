import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SidebarFilters from '../components/SidebarFilters';
import ContentGrid from '../components/ContentGrid';
import VideoModal from '../components/VideoModal';
import { Endpoints } from '../services/api';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function LibraryPage() {
  const [items, setItems] = useState([]);
  const [watchlistIds, setWatchlistIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const list = await Endpoints.contentList(params);
      setItems(Array.isArray(list?.items) ? list.items : list);
    } catch (e) {
      // fallback fake data if API not available
      setItems([
        { id: '1', title: 'Ocean Dreams', year: 2024, genre: 'Drama', rating: 4.5, streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', posterUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop' },
        { id: '2', title: 'Skyward', year: 2023, genre: 'Sci‑Fi', rating: 4.1, streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', posterUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop' },
        { id: '3', title: 'Laugh Lines', year: 2025, genre: 'Comedy', rating: 4.0, streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', posterUrl: 'https://images.unsplash.com/photo-1518675219903-c682c04c07ca?q=80&w=800&auto=format&fit=crop' },
        { id: '4', title: 'Pulse Runner', year: 2022, genre: 'Action', rating: 4.3, streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', posterUrl: 'https://images.unsplash.com/photo-1475724017904-b712052c192a?q=80&w=800&auto=format&fit=crop' }
      ]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const fetchWatchlist = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const wl = await Endpoints.getWatchlist();
      setWatchlistIds((wl?.items || wl || []).map(i => i.id || i.contentId));
    } catch {
      // ignore
    }
  }, [isAuthenticated]);

  useEffect(() => { fetchContent(); }, [fetchContent]);
  useEffect(() => { fetchWatchlist(); }, [fetchWatchlist]);

  const initialFilters = useMemo(() => {
    const q = Object.fromEntries(searchParams.entries());
    return q;
  }, [searchParams]);

  const onFiltersChange = useCallback((f) => {
    setParams(f);
    setSearchParams(new URLSearchParams(Object.entries(f).filter(([,v]) => v)));
  }, [setSearchParams]);

  const onPlay = async (item) => {
    setCurrent(item);
    setOpen(true);
    try {
      await Endpoints.addToHistory(item.id, 0);
    } catch { /* ignore */ }
  };

  const onAddWatchlist = async (item) => {
    try {
      await Endpoints.addToWatchlist(item.id);
      setWatchlistIds(prev => [...new Set([...prev, item.id])]);
    } catch { /* ignore */ }
  };
  const onRemoveWatchlist = async (item) => {
    try {
      await Endpoints.removeFromWatchlist(item.id);
      setWatchlistIds(prev => prev.filter(id => id !== item.id));
    } catch { /* ignore */ }
  };

  return (
    <section className="grid" style={{ gridTemplateColumns: '280px 1fr', gap: 16 }}>
      <SidebarFilters onChange={onFiltersChange} initial={initialFilters} />
      <div>
        <h2 className="page-title">Browse</h2>
        {loading ? (
          <div className="page-loading">Loading content…</div>
        ) : (
          <ContentGrid
            items={items}
            onPlay={onPlay}
            watchlistIds={watchlistIds}
            onAddWatchlist={onAddWatchlist}
            onRemoveWatchlist={onRemoveWatchlist}
          />
        )}
      </div>

      <VideoModal open={open} onClose={() => setOpen(false)} item={current} />
    </section>
  );
}
