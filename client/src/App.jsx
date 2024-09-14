'use client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import Dashboard from './components/Dashboard';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/:username" element={<Dashboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
