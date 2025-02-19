// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
import { getDeviceId } from '../components/utils/deviceId';

export default function SchedulePage() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const deviceId = getDeviceId();
    try {
      const response = await fetch('http://127.0.0.1:5000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: deviceId,
          date: formData.date,
          time: formData.time,
          reason: formData.reason
        }),
      });
      if (!response.ok) throw new Error('Failed to schedule appointment');
      console.log('Appointment scheduled successfully');
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-gray-400">
      <h2 className="text-2xl font-bold mb-6 text-[#62767c]">Schedule Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-gray-400">Date</label>
          <input
            type="date"
            required
            className="w-full p-3 border border-[#62767c] rounded-lg"
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-400">Time</label>
          <input
            type="time"
            required
            className="w-full p-3 border border-[#62767c] rounded-lg"
            onChange={(e) => setFormData({...formData, time: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-400">Reason</label>
          <textarea
            required
            className="w-full p-3 border border-[#62767c] rounded-lg"
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-[#62767c] text-white rounded-lg hover:bg-[#90a9b1]"
        >
          Schedule Appointment
        </button>
      </form>
    </div>
  );
}