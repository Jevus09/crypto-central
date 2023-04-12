import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {HashRouter} from 'react-router-dom'
import 'react-alice-carousel/lib/alice-carousel.css';
import CryptoContext from './components/context/CryptoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
  <CryptoContext>
    <App />
    </CryptoContext>
  </HashRouter>
);
