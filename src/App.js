import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import TicketsPage from './pages/TicketsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ReportPage from './pages/ReportPage';
import './App.css';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={!session ? <LoginPage /> : <Navigate to="/tickets" />} 
          />
          <Route 
            path="/signup" 
            element={!session ? <SignupPage /> : <Navigate to="/tickets" />} 
          />
          <Route 
            path="/tickets" 
            element={session ? <TicketsPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/reports" 
            element={session ? <ReportPage /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
