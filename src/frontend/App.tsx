import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/HomeView';
import 'tailwindcss/tailwind.css';
import './global.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
