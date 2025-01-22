import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import 'tailwindcss/tailwind.css';
import './App.css';

function Hello() {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <img className="bg-blue-500 h-12" src={icon} alt="icon" />
        <h1 className="text-4xl font-bold text-center text-blue-500">
          Hello World!
        </h1>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
