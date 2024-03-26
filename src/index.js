import './index.css';
import 'react-alice-carousel/lib/alice-carousel.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Stock from './components/Stock';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Stock>
      <App />
    </Stock>
  </BrowserRouter>
);
