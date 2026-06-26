import React, { useState } from 'react';
import { Quote, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import StarRating from './StarRating';
import { motion, AnimatePresence } from 'framer-motion';

const ReviewCard = ({ review, index, isAdmin, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = review.text.length > 180;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg relative h-full flex flex-col overflow-hidden"
    >
      <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-700 opacity-50" />
      
      <motion.div layout="position" className="mb-4">
        <StarRating rating={review.rating} />
      </motion.div>
      
      <motion.div 
        layout
        initial={false}
        animate={{ 
          height: isExpanded ? "auto" : (isLong ? "7.5rem" : "auto") 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative mb-6 overflow-hidden"
      >
        <p className="text-slate-300 italic leading-relaxed">
          "{review.text}"
        </p>
        
        <AnimatePresence>
          {(!isExpanded && isLong) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-slate-800 to-transparent pointer-events-none" 
            />
          )}
        </AnimatePresence>
      </motion.div>

      {isLong && (
        <motion.button 
          layout="position"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-yellow-500 hover:text-yellow-400 text-sm font-semibold flex items-center gap-1 mb-4 w-fit transition-colors z-10 relative"
        >
          {isExpanded ? (
            <>Read less <ChevronUp className="w-4 h-4" /></>
          ) : (
            <>Read more <ChevronDown className="w-4 h-4" /></>
          )}
        </motion.button>
      )}
      
      <motion.div layout="position" className="mt-auto border-t border-slate-700 pt-4 cursor-default">
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
              className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors relative z-10"
              title="Delete Review"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReviewCard;
