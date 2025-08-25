import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import AccountPage from './pages/AccountPage';
import WatchlistPage from './pages/WatchlistPage';
import HistoryPage from './pages/HistoryPage';
import Layout from './components/Layout';

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="page-loading">Loading…</div>;
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default function AppRouter() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/subscriptions" element={
              <PrivateRoute>
                <SubscriptionsPage />
              </PrivateRoute>
            } />
            <Route path="/account" element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            } />
            <Route path="/watchlist" element={
              <PrivateRoute>
                <WatchlistPage />
              </PrivateRoute>
            } />
            <Route path="/history" element={
              <PrivateRoute>
                <HistoryPage />
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
