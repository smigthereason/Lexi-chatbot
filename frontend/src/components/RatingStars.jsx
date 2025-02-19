import { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function RatingStars({ onRating }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-2 justify-center items-center">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={index}
            className={`text-3xl ${ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => {
              setRating(ratingValue);
              onRating(ratingValue);
            }}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

RatingStars.propTypes = {
  onRating: PropTypes.func.isRequired
};