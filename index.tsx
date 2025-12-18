
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { TimeZoneProvider } from './contexts/TimeZoneContext';
import './index.css'; // Ensure CSS is imported

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <TimeZoneProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TimeZoneProvider>
  </React.StrictMode>
);
