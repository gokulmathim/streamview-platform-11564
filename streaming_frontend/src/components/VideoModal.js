import React, { useEffect } from 'react';
import './video.css';

// PUBLIC_INTERFACE
export default function VideoModal({ open, onClose, item }) {
  useEffect(() => {
    function handler(e) {
      if (e.key === 'Escape') onClose?.();
    }
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">
          <div className="title">{item.title}</div>
          <button className="button button-ghost" onClick={onClose}>✕ Close</button>
        </div>
        <div className="modal-body">
          <video
            controls
            autoPlay
            style={{ width: '100%', borderRadius: '12px', background: '#000' }}
            src={item.streamUrl}
          >
            Sorry, your browser doesn't support embedded videos.
          </video>
          {item.description && <p className="desc">{item.description}</p>}
        </div>
      </div>
    </div>
  );
}
