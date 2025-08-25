/* React Auth Context to manage session and user profile across app */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

// PUBLIC_INTERFACE
export const AuthContext = createContext(null);

/** PUBLIC_INTERFACE
 * useAuth returns the current auth state and actions.
 */
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    // Attempt to load session on mount
    (async () => {
      try {
        if (api.token.get()) {
          const profile = await api.getProfile();
          setUser(profile);
        }
      } catch {
        api.token.set(null);
        setUser(null);
      } finally {
        setBootstrapped(true);
      }
    })();
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    async login(payload) {
      const { user: u } = await api.login(payload);
      setUser(u);
      return u;
    },
    async register(payload) {
      const { user: u } = await api.register(payload);
      setUser(u);
      return u;
    },
    async logout() {
      await api.logout();
      setUser(null);
    },
    async refreshProfile() {
      const p = await api.getProfile();
      setUser(p);
      return p;
    }
  }), [user]);

  if (!bootstrapped) {
    return (
      <div style={{ display:'grid', placeItems:'center', height:'100vh', color:'#6b7280' }}>
        <div>Loading…</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
