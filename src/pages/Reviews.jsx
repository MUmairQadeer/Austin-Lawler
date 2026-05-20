import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import StarRating from '../components/StarRating';
import { client, isSanityConfigured } from '../sanityClient';

const defaultReviews = [
  {
    id: 1,
    name: "Uy Nguyen",
    jobTitle: "Owner, Wintel Construction",
    rating: 5,
    text: "During my training the instructor was very knowledgeable and had great attention to detail. The facility had an indoor tower for training and was nice and clean.",
    date: "10/12/2025"
  },
  {
    id: 2,
    name: "Taylor Wallis",
    jobTitle: "Tech I",
    rating: 5,
    text: "Having a military background I have been through countless training courses. The knowledge and professionalism makes them an unparalleled choice.",
    date: "09/25/2025"
  },
  {
    id: 3,
    name: "Miguel Estrada",
    jobTitle: "Foreman",
    rating: 5,
    text: "Austin presented the course in an easy way to understand. I understood things that were never explained to me in previous trainings.",
    date: "08/14/2025"
  },
  {
    id: 4,
    name: "Brandon Kolsky",
    jobTitle: "Construction Manager",
    rating: 5,
    text: "Austin made the time in class very enjoyable. He made sure if someone did not fully understand, he spent extra time to explain.",
    date: "07/30/2025"
  },
  {
    id: 5,
    name: "Cesar Acosta",
    jobTitle: "Tech II",
    rating: 5,
    text: "Austin is very knowledgeable and interactive. I learned a lot about safety that helped me out in the field.",
    date: "06/18/2025"
  }
];

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: '', jobTitle: '', rating: 0, text: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Load reviews on mount
  useEffect(() => {
    if (isSanityConfigured) {
      // Query published reviews from Sanity.io (filter out drafts)
      const query = '*[_type == "testimonial" && !(_id in drafts)] | order(date desc, _createdAt desc)';
      client.fetch(query)
        .then((data) => {
          if (data && data.length > 0) {
            // Map Sanity schema fields to frontend fields if they differ slightly
            const mappedReviews = data.map(item => ({
              id: item._id,
              name: item.name,
              jobTitle: item.jobTitle,
              rating: item.rating,
              text: item.text,
              date: item.date || new Date(item._createdAt).toLocaleDateString()
            }));
            setReviews(mappedReviews);
          } else {
            setReviews(defaultReviews);
          }
        })
        .catch((err) => {
          console.error("Sanity fetch error, falling back to local storage:", err);
          loadLocalStorageReviews();
        });
    } else {
      loadLocalStorageReviews();
    }
  }, []);

  const loadLocalStorageReviews = () => {
    const saved = localStorage.getItem('sg_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(defaultReviews);
      }
    } else {
      setReviews(defaultReviews);
      localStorage.setItem('sg_reviews', JSON.stringify(defaultReviews));
    }
  };

  // Helper to send email notification (tries Vercel first, falls back to Hostinger/PHP)
  const sendEmailNotification = async (testimonialData) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialData),
      });
      const contentType = response.headers.get('content-type');
      if (response.status === 404 || (contentType && contentType.includes('text/html'))) {
        throw new Error('Vercel Node.js endpoint not found');
      }
    } catch (err) {
      console.log("Vercel endpoint missing/failed, trying Hostinger PHP endpoint...");
      try {
        await fetch('/api/send-email.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testimonialData),
        });
      } catch (phpErr) {
        console.error("PHP email notification failed:", phpErr);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.name.trim()) return setError('Full Name is required.');
    if (!formData.text.trim()) return setError('Testimonial text is required.');
    if (formData.rating === 0) return setError('Please select a star rating.');
    
    const testimonialData = {
      name: formData.name,
      jobTitle: formData.jobTitle,
      rating: formData.rating,
      text: formData.text,
      date: new Date().toLocaleDateString()
    };
    
    if (isSanityConfigured) {
      // Create a DRAFT testimonial in Sanity for moderation
      const newDoc = {
        _type: 'testimonial',
        _id: `drafts.${Date.now()}`, // drafts. prefix stores it as an unpublished draft
        ...testimonialData
      };

      try {
        await client.create(newDoc);
        
        // Trigger email notification in background
        sendEmailNotification(testimonialData);

        setSuccess(true);
        setFormData({ name: '', jobTitle: '', rating: 0, text: '' });
        setTimeout(() => setSuccess(false), 5000);
      } catch (err) {
        console.error("Sanity creation failed:", err);
        setError('Failed to submit testimonial to database. Please check your network and try again.');
      }
    } else {
      // Fallback: save to LocalStorage (runs instantly in demo mode)
      const newReview = {
        id: Date.now(),
        ...testimonialData
      };
      
      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem('sg_reviews', JSON.stringify(updatedReviews));
      
      // Still trigger email locally if endpoint is available (mock/local server test)
      sendEmailNotification(testimonialData);
      
      // Success state
      setSuccess(true);
      setFormData({ name: '', jobTitle: '', rating: 0, text: '' });
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
              Client & Student <span className="text-yellow-500">Testimonials</span>
            </h1>
            <p className="text-xl text-slate-400">
              See what professionals are saying about our training programs, or leave your own feedback.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Section A: Display Reviews */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white uppercase border-b border-slate-700 pb-4 mb-8">
              What Our Students and Clients Say
            </h2>
            
            {reviews.length === 0 ? (
              <div className="text-center p-12 bg-slate-800 rounded-xl border border-slate-700">
                <p className="text-slate-400 text-lg">No testimonials yet. Be the first to leave a testimonial!</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                <AnimatePresence>
                  {reviews.map((review, index) => (
                    <ReviewCard key={review.id} review={review} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Section B: Leave Review Form */}
          <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-slate-800 pt-12 lg:pt-0 lg:pl-12 sticky top-28 h-fit">
             <h2 className="text-2xl font-bold text-white uppercase border-b border-slate-700 pb-4 mb-8">
                Leave Your Testimonial
             </h2>
             
             {success ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                 className="bg-green-900/40 border border-green-500/50 p-6 rounded-xl flex flex-col items-center text-center"
               >
                 <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                 <h3 className="text-xl font-bold text-white mb-2">Thank you for your feedback!</h3>
                 <p className="text-green-200 text-sm">Your testimonial has been published.</p>
                 <button 
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-sm underline text-green-400 hover:text-green-300"
                 >
                   Submit another
                 </button>
               </motion.div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                 {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                 )}
                 <div>
                   <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                   <input 
                     type="text" 
                     className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
                     placeholder="John Doe"
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-slate-300 mb-2">Job Title / Company (Optional)</label>
                   <input 
                     type="text" 
                     className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
                     placeholder="Foreman, Telecom Inc."
                     value={formData.jobTitle}
                     onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-slate-300 mb-2">Rating *</label>
                   <StarRating 
                     rating={formData.rating} 
                     interactive={true} 
                     onRatingChange={(r) => setFormData({...formData, rating: r})} 
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-slate-300 mb-2">Your Testimonial *</label>
                   <textarea 
                     rows="5"
                     className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors resize-none"
                     placeholder="Share your experience..."
                     value={formData.text}
                     onChange={(e) => setFormData({...formData, text: e.target.value})}
                   ></textarea>
                 </div>
                 
                 <button 
                   type="submit"
                   className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-xl uppercase tracking-wide transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)]"
                 >
                   Submit Testimonial
                 </button>
               </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
