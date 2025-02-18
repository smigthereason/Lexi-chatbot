// pages/FeedbackPage.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
import RatingStars from '../components/RatingStars';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add feedback submission logic here
    console.log('Feedback:', feedback);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-purple-600">Rate Your Experience</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <RatingStars onRating={(rating) => setFeedback({...feedback, rating})} />
        
        <div>
          <label className="block mb-2">Additional Feedback</label>
          <textarea
            className="w-full p-3 border rounded-lg"
            rows="4"
            onChange={(e) => setFeedback({...feedback, comment: e.target.value})}
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}