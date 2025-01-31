import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter } from 'react-router-dom';
import StepContext from './StepContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StepContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StepContext>
  </React.StrictMode>
);

reportWebVitals();
