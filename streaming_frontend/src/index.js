import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { injectThemeCSS } from './theme';
import AppRouter from './AppRouter';

injectThemeCSS();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
