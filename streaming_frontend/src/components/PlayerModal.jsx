import React, { useEffect, useRef, useState } from 'react';

export default function PlayerModal({ open, item, onClose, onProgress }) {
  const ref = useRef(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!open) return;
    const el = ref.current;
    if (!el) return;

    const onTimeUpdate = () => {
      setTime(el.currentTime);
      const progress = el.duration ? (el.currentTime / el.duration) : 0;
      onProgress?.({ progress });
    };

    el.addEventListener('timeupdate', onTimeUpdate);
    el.play().catch(()=>{});
    return () => {
      el.pause();
      el.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [open, onProgress]);

  if (!open || !item) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Video player"
         style={{
           position:'fixed', inset:0, background:'rgba(0,0,0,0.7)',
           display:'grid', placeItems:'center', zIndex: 100
         }}>
      <div className="card" style={{ width:'min(100%, 960px)', overflow:'hidden' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <img src={item.poster} alt="" width={36} style={{ borderRadius: 6 }} />
            <strong>{item.title}</strong>
          </div>
          <button className="btn" onClick={onClose} aria-label="Close player">✕ Close</button>
        </div>
        <div style={{ background:'#000' }}>
          <video
            ref={ref}
            src={item.url}
            controls
            style={{ width:'100%', height:'auto', display:'block' }}
          />
        </div>
        <div style={{ padding: 12, display:'flex', justifyContent:'space-between', color:'var(--color-muted)' }}>
          <span>Time: {Math.floor(time)}s</span>
          <span>Duration: {item.duration}m</span>
        </div>
      </div>
    </div>
  );
}
