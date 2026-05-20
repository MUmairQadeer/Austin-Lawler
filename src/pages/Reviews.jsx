import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Lock, Unlock, Eye, Trash2, Check, Edit2 } from 'lucide-react';
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
  const [drafts, setDrafts] = useState([]);
  const [formData, setFormData] = useState({ name: '', jobTitle: '', rating: 0, text: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // Load reviews on mount
  useEffect(() => {
    fetchReviews();
    
    // Check if URL has ?admin=true
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setShowAdminLogin(true);
    }
  }, []);

  const fetchReviews = () => {
    if (isSanityConfigured) {
      // Query published reviews from Sanity.io (filter out drafts)
      const query = '*[_type == "testimonial" && !(_id in drafts)] | order(date desc, _createdAt desc)';
      client.fetch(query)
        .then((data) => {
          if (data && data.length > 0) {
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
  };

  const fetchDrafts = () => {
    if (!isSanityConfigured) return;
    // Query all draft (unapproved) testimonials
    const query = '*[_type == "testimonial" && _id in drafts] | order(_createdAt desc)';
    client.fetch(query)
      .then((data) => {
        const mappedDrafts = data.map(item => ({
          id: item._id,
          name: item.name,
          jobTitle: item.jobTitle,
          rating: item.rating,
          text: item.text,
          date: item.date || new Date(item._createdAt).toLocaleDateString()
        }));
        setDrafts(mappedDrafts);
      })
      .catch((err) => console.error("Error fetching drafts:", err));
  };

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

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const correctPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'wvh6vay2';
    if (adminPassword === correctPasscode) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      fetchDrafts();
    } else {
      alert('Incorrect admin passcode.');
    }
  };

  const handleDraftChange = (id, field, value) => {
    setDrafts(prev => prev.map(draft => {
      if (draft.id === id) {
        return { ...draft, [field]: value };
      }
      return draft;
    }));
  };

  const handlePublish = async (draft) => {
    if (!isSanityConfigured) return;
    const publishedId = draft.id.replace('drafts.', '');
    
    try {
      // In Sanity, publishing is done by creating the document without "drafts." prefix and deleting the draft
      await client.transaction()
        .createOrReplace({
          _id: publishedId,
          _type: 'testimonial',
          name: draft.name,
          jobTitle: draft.jobTitle,
          rating: parseInt(draft.rating),
          text: draft.text,
          date: draft.date || new Date().toLocaleDateString()
        })
        .delete(draft.id)
        .commit();
      
      // Refresh both lists
      fetchDrafts();
      fetchReviews();
    } catch (err) {
      console.error("Publish transaction failed:", err);
      alert("Failed to publish review. Check your connection.");
    }
  };

  const handleDeleteDraft = async (id) => {
    if (!isSanityConfigured) return;
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await client.delete(id);
        fetchDrafts();
      } catch (err) {
        console.error("Delete draft failed:", err);
      }
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
        
        // If logged in as admin, refresh the drafts list instantly
        if (isAdmin) {
          fetchDrafts();
        }

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
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
              Client & Student <span className="text-yellow-500">Testimonials</span>
            </h1>
            <p className="text-xl text-slate-400">
              See what professionals are saying about our training programs, or leave your own feedback.
            </p>
          </motion.div>

          {/* Hidden/Subtle Admin Trigger */}
          <button 
            onClick={() => isAdmin ? setIsAdmin(false) : setShowAdminLogin(true)}
            className="absolute top-0 right-0 p-2 text-slate-700 hover:text-yellow-500/50 transition-colors"
            title="Moderation Portal"
          >
            {isAdmin ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          </button>
        </div>

        {/* Admin Login Dialog */}
        <AnimatePresence>
          {showAdminLogin && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="max-w-md mx-auto mb-12 p-6 bg-slate-950 border border-slate-800 rounded-2xl"
            >
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold mb-2">
                  <Lock className="w-5 h-5 text-yellow-500" />
                  <span>Testimonial Moderation Portal</span>
                </div>
                <input 
                  type="password" 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                  placeholder="Enter admin passcode..."
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
                <div className="flex gap-4">
                  <button 
                    type="submit" 
                    className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold py-2 rounded-lg"
                  >
                    Unlock Panel
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowAdminLogin(false)}
                    className="px-4 py-2 border border-slate-700 text-slate-400 rounded-lg hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Moderation Panel Workspace */}
        <AnimatePresence>
          {isAdmin && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-16 p-8 bg-slate-950/60 border border-yellow-500/20 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Unlock className="w-5 h-5 text-yellow-500" />
                    Pending Testimonials ({drafts.length})
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">Review, edit, and publish draft submissions below.</p>
                </div>
                <button 
                  onClick={() => setIsAdmin(false)}
                  className="text-sm border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg"
                >
                  Exit Admin Mode
                </button>
              </div>

              {drafts.length === 0 ? (
                <p className="text-slate-500 text-center py-6">No pending testimonials to review.</p>
              ) : (
                <div className="space-y-6">
                  {drafts.map((draft) => (
                    <motion.div 
                      key={draft.id} 
                      layout
                      className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4"
                    >
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Full Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white text-sm focus:border-yellow-500 focus:outline-none"
                            value={draft.name}
                            onChange={(e) => handleDraftChange(draft.id, 'name', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Job / Company</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white text-sm focus:border-yellow-500 focus:outline-none"
                            value={draft.jobTitle}
                            onChange={(e) => handleDraftChange(draft.id, 'jobTitle', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Rating</label>
                          <select 
                            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white text-sm focus:border-yellow-500 focus:outline-none"
                            value={draft.rating}
                            onChange={(e) => handleDraftChange(draft.id, 'rating', parseInt(e.target.value))}
                          >
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Testimonial Content</label>
                        <textarea 
                          rows="3" 
                          className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white text-sm focus:border-yellow-500 focus:outline-none resize-none"
                          value={draft.text}
                          onChange={(e) => handleDraftChange(draft.id, 'text', e.target.value)}
                        ></textarea>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-800/50">
                        <span className="text-xs text-slate-500">Submitted: {draft.date}</span>
                        <div className="flex gap-3">
                          <button 
                            onClick={() => handlePublish(draft)}
                            className="bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-2 rounded text-xs flex items-center gap-1 uppercase tracking-wider"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve & Publish
                          </button>
                          <button 
                            onClick={() => handleDeleteDraft(draft.id)}
                            className="bg-red-950 hover:bg-red-900 border border-red-800 text-red-400 font-bold px-4 py-2 rounded text-xs flex items-center gap-1 uppercase tracking-wider"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

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
