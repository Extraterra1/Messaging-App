import React from 'react';
import ReactDOM from 'react-dom/client';
import WebFont from 'webfontloader';
import './index.css';

import Router from '../Router';

WebFont.load({
  google: {
    families: ['Montserrat:300,400,700', 'Playfair Display:400,500,700']
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
