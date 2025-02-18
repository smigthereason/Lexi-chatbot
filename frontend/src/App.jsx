// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import SchedulePage from './pages/SchedulePage';
import FeedbackPage from './pages/FeedbackPage';
import Loading from './pages/Loading';

export default function App() {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Mark initial load as complete after component mounts
    setInitialLoad(false);
  }, []);

  return (
    <Router>
      {initialLoad && <Navigate to="/loading" replace />}
      
      <Routes>
        <Route path="/loading" element={<Loading />} />
        <Route path="/" element={<Home />} />
        
        {/* Nested routes within Layout */}
        <Route element={<Layout  />}>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Route>
      </Routes>
    </Router>
  );
}