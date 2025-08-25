import React, { useCallback, useEffect, useState } from 'react';
import { Endpoints } from '../services/api';
import ContentGrid from '../components/ContentGrid';
import VideoModal from '../components/VideoModal';

// PUBLIC_INTERFACE
export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const load = useCallback(async () => {
    try {
      const hist = await Endpoints.getHistory();
      const list = (hist?.items || hist || []).map(x => x.content || x);
      setItems(list);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const onPlay = (item) => { setCurrent(item); setOpen(true); };

  return (
    <section>
      <h2 className="page-title">Watch History</h2>
      <ContentGrid items={items} onPlay={onPlay} />
      <VideoModal open={open} onClose={() => setOpen(false)} item={current} />
    </section>
  );
}
