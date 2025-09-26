import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicketsPage from './pages/TicketsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TicketsPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
