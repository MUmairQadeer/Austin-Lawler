import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, interactive = false, onRatingChange }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} focus:outline-none`}
          onClick={() => interactive && onRatingChange(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
        >
          <Star
            className={`w-6 h-6 ${
              star <= (hover || rating)
                ? 'fill-yellow-500 text-yellow-500'
                : 'text-slate-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
