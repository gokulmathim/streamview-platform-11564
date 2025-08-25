import React, { useCallback, useEffect, useState } from 'react';
import { Endpoints } from '../services/api';

// PUBLIC_INTERFACE
export default function SubscriptionsPage() {
  const [plans, setPlans] = useState([]);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [p, c] = await Promise.all([
        Endpoints.getPlans().catch(() => ([
          { id: 'basic', name: 'Basic', price: 5.99, features: ['SD streaming', '1 device'] },
          { id: 'standard', name: 'Standard', price: 9.99, features: ['HD streaming', '2 devices'] },
          { id: 'premium', name: 'Premium', price: 14.99, features: ['UHD streaming', '4 devices'] }
        ])),
        Endpoints.currentSubscription().catch(() => null)
      ]);
      setPlans(Array.isArray(p?.items) ? p.items : p);
      setCurrent(c);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const checkout = async (planId) => {
    const successUrl = window.location.origin + '/subscriptions';
    const cancelUrl = window.location.href;
    try {
      const { checkoutUrl } = await Endpoints.createCheckout(planId, successUrl, cancelUrl);
      window.location.href = checkoutUrl;
    } catch {
      alert('Payment provider not configured. This is a demo.');
    }
  };

  return (
    <section>
      <h2 className="page-title">Plans & Pricing</h2>
      {current && (
        <div className="card" style={{ padding: 12, marginBottom: 12 }}>
          <strong>Current Plan:</strong> {current?.name || current?.id}
        </div>
      )}
      {loading ? <div className="page-loading">Loading plans…</div> : (
        <div className="grid grid-3">
          {plans.map(plan => (
            <div key={plan.id} className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{plan.name}</div>
              <div style={{ fontSize: 28, margin: '8px 0', color: 'var(--color-primary)' }}>
                ${plan.price}<span style={{ fontSize: 14 }}>/mo</span>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 16px', color: 'var(--color-text-muted)' }}>
                {(plan.features || []).map((f, idx) => <li key={idx}>{f}</li>)}
              </ul>
              <div className="mt-16">
                <button className="button" onClick={() => checkout(plan.id)}>Choose {plan.name}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
