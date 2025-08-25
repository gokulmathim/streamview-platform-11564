import React, { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function SidebarFilters({ onChange, initial = {} }) {
  const [query, setQuery] = useState(initial.q || '');
  const [genre, setGenre] = useState(initial.genre || '');
  const [year, setYear] = useState(initial.year || '');
  const [sort, setSort] = useState(initial.sort || 'popularity');

  useEffect(() => {
    onChange?.({ q: query, genre, year, sort });
  }, [query, genre, year, sort, onChange]);

  return (
    <aside className="card" style={{ padding: 16, position: 'sticky', top: '80px', alignSelf: 'start' }}>
      <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: 8 }}>Search & Filters</div>
      <input className="input" placeholder="Search…" value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="mt-16">
        <label>Genre</label>
        <select className="select" value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">All</option>
          <option value="action">Action</option>
          <option value="drama">Drama</option>
          <option value="comedy">Comedy</option>
          <option value="sci-fi">Sci‑Fi</option>
        </select>
      </div>
      <div className="mt-16">
        <label>Year</label>
        <select className="select" value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Any</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2020s">2020s</option>
        </select>
      </div>
      <div className="mt-16">
        <label>Sort by</label>
        <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="popularity">Popularity</option>
          <option value="recent">Recently added</option>
          <option value="rating">Rating</option>
          <option value="title">Title</option>
        </select>
      </div>
    </aside>
  );
}
