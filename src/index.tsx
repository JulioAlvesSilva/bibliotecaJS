import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './Routes';
import { AppProvider } from 'main';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProvider>
    <Router />
    </AppProvider>
  </React.StrictMode>
);
