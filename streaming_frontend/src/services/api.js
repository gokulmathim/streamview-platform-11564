/**
 * Minimal API client with localStorage-backed mock data.
 * Replace implementations with real REST calls when backend is ready.
 */

const wait = (ms = 400) => new Promise((r) => setTimeout(r, ms));

const STORAGE = {
  TOKEN: 'sv_token',
  USER: 'sv_user',
  WATCHLIST: 'sv_watchlist',
  HISTORY: 'sv_history',
  SUBSCRIPTION: 'sv_subscription',
};

function getToken() {
  return localStorage.getItem(STORAGE.TOKEN);
}

function setToken(token) {
  if (token) localStorage.setItem(STORAGE.TOKEN, token);
  else localStorage.removeItem(STORAGE.TOKEN);
}

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function getUser() {
  const raw = localStorage.getItem(STORAGE.USER);
  return safeParse(raw, null);
}

function setUser(user) {
  if (user) localStorage.setItem(STORAGE.USER, JSON.stringify(user));
  else localStorage.removeItem(STORAGE.USER);
}

// Mock catalog
const mockCatalog = Array.from({ length: 36 }).map((_, i) => {
  const id = i + 1;
  const genres = ['Action','Drama','Sci-Fi','Comedy','Thriller','Fantasy'];
  const year = 2005 + (i % 18);
  return {
    id: String(id),
    title: `Sample Movie ${id}`,
    description: `An engaging synopsis for Sample Movie ${id}. Enjoy an immersive experience with stunning visuals and sound.`,
    year,
    genre: genres[i % genres.length],
    rating: (Math.random() * 3 + 6).toFixed(1),
    duration: 90 + (i % 45),
    poster: `https://source.unsplash.com/collection/94734566/300x450?sig=${id}`,
    backdrop: `https://source.unsplash.com/collection/94734566/1200x600?sig=${id}`,
    url: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
  };
});

function filterCatalog({ q = '', genre = 'All', year = 'All', sort = 'popular' }) {
  let list = [...mockCatalog];
  if (q) {
    const s = q.toLowerCase();
    list = list.filter(v => v.title.toLowerCase().includes(s) || v.description.toLowerCase().includes(s));
  }
  if (genre !== 'All') list = list.filter(v => v.genre === genre);
  if (year !== 'All') {
    const y = parseInt(year, 10);
    list = list.filter(v => v.year === y);
  }
  switch (sort) {
    case 'rating': list.sort((a,b)=>parseFloat(b.rating)-parseFloat(a.rating)); break;
    case 'newest': list.sort((a,b)=>b.year - a.year); break;
    default: list.sort((a,b)=>a.id.localeCompare(b.id));
  }
  return list;
}

// PUBLIC_INTERFACE
export const api = {
  /** Authenticate user (mock). Accepts any email/password. */
  async login({ email, password }) {
    await wait();
    if (!email || !password) throw new Error('Email and password required');
    const token = btoa(`${email}:${Date.now()}`);
    setToken(token);
    const profile = {
      id: 'u1',
      name: email.split('@')[0],
      email,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(email)}`,
    };
    setUser(profile);
    return { token, user: profile };
  },

  /** Logout and clear session. */
  async logout() {
    await wait(200);
    setToken(null);
    setUser(null);
  },

  /** Create account (mock). */
  async register({ name, email, password }) {
    await wait();
    if (!name || !email || !password) throw new Error('All fields are required');
    const token = btoa(`${email}:${Date.now()}`);
    setToken(token);
    const profile = {
      id: 'u1',
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(email)}`,
    };
    setUser(profile);
    return { token, user: profile };
  },

  /** Get profile */
  async getProfile() {
    await wait(200);
    const user = getUser();
    if (!getToken() || !user) throw new Error('Not authenticated');
    return user;
  },

  /** Update profile (name only, mock) */
  async updateProfile({ name }) {
    await wait(250);
    const user = getUser();
    const merged = { ...user, name: name || user.name };
    setUser(merged);
    return merged;
  },

  /** Subscription management */
  async getSubscription() {
    await wait(200);
    const raw = localStorage.getItem(STORAGE.SUBSCRIPTION);
    return safeParse(raw, { plan: 'Free', status: 'inactive', renewsOn: null });
  },

  async subscribe(plan = 'Premium') {
    await wait(500);
    const sub = { plan, status: 'active', renewsOn: new Date(Date.now() + 1000*60*60*24*30).toISOString() };
    localStorage.setItem(STORAGE.SUBSCRIPTION, JSON.stringify(sub));
    return sub;
  },

  async cancelSubscription() {
    await wait(300);
    const sub = { plan: 'Free', status: 'inactive', renewsOn: null };
    localStorage.setItem(STORAGE.SUBSCRIPTION, JSON.stringify(sub));
    return sub;
  },

  /** Catalog */
  async listContent(filters = {}) {
    await wait(250);
    return filterCatalog(filters);
  },

  async getContent(id) {
    await wait(150);
    return mockCatalog.find(v => v.id === String(id));
  },

  /** Watchlist & History */
  async getWatchlist() {
    await wait(120);
    const raw = localStorage.getItem(STORAGE.WATCHLIST);
    return safeParse(raw, []);
  },

  async toggleWatchlist(item) {
    await wait(100);
    const raw = localStorage.getItem(STORAGE.WATCHLIST);
    const list = raw ? JSON.parse(raw) : [];
    const exists = list.find(v => v.id === item.id);
    let updated;
    if (exists) updated = list.filter(v => v.id !== item.id);
    else updated = [{ id: item.id, title: item.title, poster: item.poster, addedAt: Date.now() }, ...list];
    localStorage.setItem(STORAGE.WATCHLIST, JSON.stringify(updated));
    return updated;
  },

  async getHistory() {
    await wait(100);
    const raw = localStorage.getItem(STORAGE.HISTORY);
    return safeParse(raw, []);
  },

  async addHistory(item) {
    await wait(100);
    const raw = localStorage.getItem(STORAGE.HISTORY);
    const list = raw ? JSON.parse(raw) : [];
    const filtered = list.filter(v => v.id !== item.id);
    const updated = [{ id: item.id, title: item.title, poster: item.poster, watchedAt: Date.now(), progress: item.progress || 0 }, ...filtered].slice(0, 60);
    localStorage.setItem(STORAGE.HISTORY, JSON.stringify(updated));
    return updated;
  },

  token: { get: getToken, set: setToken }
};
