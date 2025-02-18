// pages/SchedulePage.jsx
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function SchedulePage() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add scheduling logic here
    console.log('Scheduled:', formData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-purple-600">Schedule Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Date</label>
          <input
            type="date"
            required
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-2">Time</label>
          <input
            type="time"
            required
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setFormData({...formData, time: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-2">Reason</label>
          <textarea
            required
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Schedule Appointment
        </button>
      </form>
    </div>
  );
}