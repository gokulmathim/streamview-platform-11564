import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Endpoints } from '../services/api';

// PUBLIC_INTERFACE
export const AuthContext = createContext({
  user: null,
  loading: true,
  loginWithProvider: async (_provider) => {},
  logout: async () => {},
  isAuthenticated: false
});

const OAUTH_REDIRECT = process.env.REACT_APP_OAUTH_REDIRECT || window.location.origin;

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshMe = useCallback(async () => {
    setLoading(true);
    try {
      const me = await Endpoints.me();
      setUser(me || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  const loginWithProvider = useCallback(async (provider) => {
    // OAuth-ready: The backend is expected to return an auth URL
    const { authUrl } = await Endpoints.loginStart(provider, OAUTH_REDIRECT);
    window.location.href = authUrl;
  }, []);

  const logout = useCallback(async () => {
    await Endpoints.logout();
    localStorage.removeItem('auth');
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    loginWithProvider,
    logout,
    isAuthenticated: !!user
  }), [user, loading, loginWithProvider, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
