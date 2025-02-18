// eslint-disable-next-line no-unused-vars
import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import SchedulePage from './pages/SchedulePage';
import FeedbackPage from './pages/FeedbackPage';

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gradient-to-r from-pink-50 to-purple-50">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg p-4">
          <h1 className="text-2xl font-bold text-purple-600 mb-8">Women Health Assistant</h1>
          <nav className="space-y-4">
            <Link to="/" className="block p-3 hover:bg-purple-50 rounded-lg text-purple-600">Chat</Link>
            <Link to="/schedule" className="block p-3 hover:bg-purple-50 rounded-lg text-purple-600">Schedule Appointment</Link>
            <Link to="/feedback" className="block p-3 hover:bg-purple-50 rounded-lg text-purple-600">Feedback</Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}