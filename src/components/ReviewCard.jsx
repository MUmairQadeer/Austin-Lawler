import React from 'react';
import { Quote, Trash2 } from 'lucide-react';
import StarRating from './StarRating';
import { motion } from 'framer-motion';

const ReviewCard = ({ review, index, isAdmin, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg relative h-full flex flex-col"
    >
      <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-700 opacity-50" />
      
      <div className="mb-4">
        <StarRating rating={review.rating} />
      </div>
      
      <p className="text-slate-300 italic mb-6 flex-grow leading-relaxed">
        "{review.text}"
      </p>
      
      <div className="mt-auto border-t border-slate-700 pt-4 cursor-default">
        <div className="flex justify-between items-end">
          <div>
            <h4 className="font-bold text-white text-lg">{review.name}</h4>
            {review.jobTitle && (
              <p className="text-yellow-500 text-sm font-medium">{review.jobTitle}</p>
            )}
          </div>
          {isAdmin && onDelete && (
            <button
              onClick={() => onDelete(review.id)}
              className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
              title="Delete Review"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
