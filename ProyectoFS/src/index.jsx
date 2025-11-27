import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const rootEl = document.getElementById('root') || document.body.appendChild(document.createElement('div'));
const root = createRoot(rootEl);
root.render(<App />);
