//
// Centralized REST API client and endpoints
//

const API_BASE = process.env.REACT_APP_API_BASE || '/api';

// Helper to parse JSON with safe fallback
async function parseJson(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { raw: text };
  }
}

function getAuthToken() {
  try {
    const raw = localStorage.getItem('auth');
    if (!raw) return null;
    const { accessToken } = JSON.parse(raw);
    return accessToken || null;
  } catch {
    return null;
  }
}

function authHeaders() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// PUBLIC_INTERFACE
export async function apiGet(path, params = {}) {
  const url = new URL(`${API_BASE}${path}`, window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.append(k, v);
  });
  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders()
    },
    credentials: 'include'
  });
  const data = await parseJson(res);
  if (!res.ok) {
    const msg = data?.message || `GET ${path} failed`;
    throw new Error(msg);
  }
  return data;
}

// PUBLIC_INTERFACE
export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders()
    },
    body: JSON.stringify(body || {}),
    credentials: 'include'
  });
  const data = await parseJson(res);
  if (!res.ok) {
    const msg = data?.message || `POST ${path} failed`;
    throw new Error(msg);
  }
  return data;
}

// PUBLIC_INTERFACE
export async function apiDelete(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders()
    },
    credentials: 'include'
  });
  const data = await parseJson(res);
  if (!res.ok) {
    const msg = data?.message || `DELETE ${path} failed`;
    throw new Error(msg);
  }
  return data;
}

// PUBLIC_INTERFACE
export const Endpoints = {
  me: () => apiGet('/auth/me'),
  loginStart: (provider, redirectUri) => apiGet('/auth/login', { provider, redirectUri }),
  logout: () => apiPost('/auth/logout'),

  // Content
  contentList: (q) => apiGet('/content', q),
  contentById: (id) => apiGet(`/content/${id}`),

  // Watchlist
  addToWatchlist: (id) => apiPost('/watchlist', { contentId: id }),
  removeFromWatchlist: (id) => apiDelete(`/watchlist/${id}`),
  getWatchlist: () => apiGet('/watchlist'),

  // History
  addToHistory: (id, progress = 0) => apiPost('/history', { contentId: id, progress }),
  getHistory: () => apiGet('/history'),

  // Subscription/payments
  getPlans: () => apiGet('/subscriptions/plans'),
  currentSubscription: () => apiGet('/subscriptions/current'),
  createCheckout: (planId, successUrl, cancelUrl) => apiPost('/subscriptions/checkout', { planId, successUrl, cancelUrl }),
};
