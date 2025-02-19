// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
import RatingStars from '../components/RatingStars';
import { getDeviceId } from '../components/utils/deviceId';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const deviceId = getDeviceId();
    try {
      const response = await fetch('http://127.0.0.1:5000/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: deviceId, // Use phone_number as the identifier
          rating: feedback.rating,
          feedback: feedback.comment
        }),
      });
      if (!response.ok) throw new Error('Failed to submit feedback');
      console.log('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto justify-center items-center">
      <h2 className="text-2xl font-bold mb-6 text-[#62767c]">Rate Your Experience</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <RatingStars onRating={(rating) => setFeedback({...feedback, rating})} />
        
        <div>
          <label className="block mb-2 text-[#62767c]">Additional Feedback</label>
          <textarea
            className="w-full p-3 border border-[#62767c] text-[#62767c] rounded-lg"
            rows="4"
            onChange={(e) => setFeedback({...feedback, comment: e.target.value})}
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-[#62767c] text-white rounded-lg hover:bg-[#90a9b1]"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}