import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Switch -> Routes
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '10px', background: '#007bff', color: 'white' }}>
          <Link to="/" style={{ color: 'white', marginRight: '20px' }}>Home</Link>
          <Link to="/analytics" style={{ color: 'white' }}>Analytics</Link>
        </nav>
        <Routes> {/* Replaced Switch with Routes */}
          <Route path="/" element={<Home />} /> {/* Updated Route syntax */}
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;