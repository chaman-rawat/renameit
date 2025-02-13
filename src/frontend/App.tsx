import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './lib/context/ThemeContext';
import Home from './views/HomeView';
import 'tailwindcss/tailwind.css';
import './global.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <React.StrictMode>
              <ThemeProvider>
                <Home />
              </ThemeProvider>
            </React.StrictMode>
          }
        />
      </Routes>
    </Router>
  );
}
