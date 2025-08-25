import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ContentCard from '../components/ContentCard';
import PlayerModal from '../components/PlayerModal';
import { api } from '../services/api';

const YEARS = Array.from({ length: 20 }).map((_, i) => 2024 - i);

export default function Browse() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const filters = useMemo(() => ({
    q: params.get('q') || '',
    genre: params.get('genre') || 'All',
    year: params.get('year') || 'All',
    sort: params.get('sort') || 'popular',
  }), [params]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      const [list, wl] = await Promise.all([api.listContent(filters), api.getWatchlist()]);
      if (!mounted) return;
      setItems(list);
      setWatchlist(wl);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [filters]);

  const setFilter = (name, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'All') next.delete(name);
    else next.set(name, value);
    setParams(next, { replace: false });
  };

  const onPlay = async (item) => {
    setSelected(item);
  };

  const onClosePlayer = () => setSelected(null);

  const onProgress = async ({ progress }) => {
    if (!selected) return;
    await api.addHistory({ id: selected.id, title: selected.title, poster: selected.poster, progress });
  };

  const toggleWatchlist = async (item) => {
    const updated = await api.toggleWatchlist(item);
    setWatchlist(updated);
  };

  const isInWatchlist = (id) => watchlist.some(v => v.id === id);

  return (
    <>
      <div className="hero">
        <div className="container" style={{ paddingBottom: 14 }}>
          <div className="page-title">
            <h1 style={{ margin: '10px 0' }}>Browse</h1>
            <span className="badge">New</span>
          </div>
          <div style={{ color:'var(--color-muted)' }}>
            Discover trending movies and series. Use filters to refine your results.
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '20px 0 24px' }}>
        <div className="layout">
          <aside className="sidebar" aria-label="Filters">
            <div style={{ display:'grid', gap:14 }}>
              <div>
                <div className="section-title">Genre</div>
                <select
                  className="select"
                  value={filters.genre}
                  onChange={(e)=>setFilter('genre', e.target.value)}
                  aria-label="Filter by genre"
                >
                  {['All','Action','Drama','Sci-Fi','Comedy','Thriller','Fantasy'].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <div className="section-title">Year</div>
                <select
                  className="select"
                  value={filters.year}
                  onChange={(e)=>setFilter('year', e.target.value)}
                  aria-label="Filter by year"
                >
                  <option value="All">All</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <div className="section-title">Sort by</div>
                <select
                  className="select"
                  value={filters.sort}
                  onChange={(e)=>setFilter('sort', e.target.value)}
                  aria-label="Sort results"
                >
                  <option value="popular">Popular</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
              {(filters.q) && (
                <button className="btn ghost" onClick={()=>setFilter('q','')} aria-label="Clear search">Clear search</button>
              )}
            </div>
          </aside>

          <main>
            {loading ? (
              <div style={{ display:'grid', placeItems:'center', padding: 40, color:'var(--color-muted)' }}>
                Loading…
              </div>
            ) : (
              <>
                {items.length === 0 ? (
                  <div style={{ color:'var(--color-muted)' }}>No results. Adjust filters or try another search.</div>
                ) : (
                  <div className="grid cols-6">
                    {items.map(item => (
                      <ContentCard
                        key={item.id}
                        item={item}
                        onPlay={onPlay}
                        onToggleWatchlist={toggleWatchlist}
                        inWatchlist={isInWatchlist(item.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <PlayerModal open={!!selected} item={selected} onClose={onClosePlayer} onProgress={onProgress} />
      <div className="footer">© {new Date().getFullYear()} StreamView</div>
    </>
  );
}
