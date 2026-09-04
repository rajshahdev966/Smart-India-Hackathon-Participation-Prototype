/**
 * @file main.jsx
 * @description Application entry point mounting React root with global styles.
 * StrictMode disabled per project requirements to prevent duplicate component mounts.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
