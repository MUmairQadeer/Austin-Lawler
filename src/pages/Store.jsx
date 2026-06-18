import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Lock, Mail, HardHat, Sparkles, ArrowRight, Download, CheckCircle2, ChevronRight } from 'lucide-react';
import { client, isSanityConfigured } from '../sanityClient';

const Store = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const equipment = [
    { name: "Pro Climbing Harness", price: "$349.99", category: "Equipment" },
    { name: "Heavy Duty Carabiner Set", price: "$89.99", category: "Equipment" },
    { name: "Safety Helmet Class E", price: "$129.99", category: "Equipment" },
  ];

  const apparel = [
    { name: "SG High-Vis Jacket", price: "$75.00", category: "Apparel" },
    { name: "SG Classic Logo Tee", price: "$25.00", category: "Apparel" },
    { name: "Instructor Polo", price: "$45.00", category: "Apparel" },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    
    const subData = {
      email,
      source: 'Store',
      date: new Date().toLocaleDateString()
    };

    try {
      // Save to Sanity if configured
      if (isSanityConfigured) {
        await client.create({
          _type: 'subscriber',
          ...subData
        });
      }

      // Send Email Notification
      await fetch('/api/subscribe-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subData),
      });
      
      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error("Subscription failed:", err);
      setError("Failed to subscribe. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-16 relative overflow-hidden flex flex-col justify-center">
      {/* Background Ambient Gradients */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
              Safety Guild <span className="text-yellow-500">Store</span>
            </h1>
            <p className="text-xl text-slate-400">
              Official training gear, certified equipment, and exclusive apparel.
            </p>
          </motion.div>
        </div>

        {/* Under Development Banner */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative mx-auto w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <img src="/under-development.jpg" alt="Under Development" width="800" height="500" loading="lazy" decoding="async" className="w-full h-72 sm:h-96 md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Premium "Currently in Production" Showcase Dashboard */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden max-w-4xl mx-auto mb-20"
        >
          {/* Subtle grid pattern background */}
          {/* <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Pulsing Status Badge */}
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-bold tracking-widest uppercase mb-8 shadow-inner animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-ping"></span>
              Store in Production
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 uppercase tracking-tight">
              Equipping Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Next Ascent</span>
            </h2>
            
            <p className="text-slate-300 max-w-2xl text-lg leading-relaxed mb-10">
              We are currently establishing our secure merchant gateway and stocking our inventory with ANSI-certified climbing harnesses, high-durability apparel, and rigging accessories. 
            </p>

            {/* Premium Progress Bar */}
            {/* <div className="w-full max-w-lg mb-12 bg-slate-900/80 border border-slate-800 rounded-full p-1.5 shadow-inner">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Payment & Stock Setup</span>
                <span className="text-yellow-500">90% Configured</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-800/80">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "90%" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-500 h-full rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                />
              </div>
            </div>

            {/* Email Subscription Form */}
            {/* <div className="w-full max-w-md mb-8">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubscribe} 
                    className="flex flex-col gap-3"
                  >
                    <div className="relative flex items-center">
                      <Mail className="absolute left-4 text-slate-500 w-5 h-5" />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email for early store access" 
                        className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500/80 focus:ring-2 focus:ring-yellow-500/20 transition-all font-medium"
                      />
                    </div>
                    {error && <span className="text-red-500 text-sm font-semibold">{error}</span>}
                    <button 
                      type="submit" 
                      className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-extrabold py-4 rounded-xl uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Get Early Access & Discounts
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-2xl text-center"
                  >
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-yellow-500/30">
                      <CheckCircle2 className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-1">Subscriber Confirmed!</h4>
                    <p className="text-slate-300 text-sm">We will email you a 15% discount code the moment our store goes live.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Contact / Offline orders */}
            {/* <div className="border-t border-slate-700/40 w-full pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-left">
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl shrink-0">
                  <HardHat className="text-yellow-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Looking to place bulk gear orders?</h4>
                  <p className="text-slate-400 text-xs">We can process custom commercial equipment orders directly.</p>
                </div>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <a 
                  href="/business-card.pdf" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 md:flex-none inline-flex items-center justify-center px-5 py-3 border border-slate-700 hover:border-slate-500 bg-slate-800 text-slate-300 hover:text-white text-sm font-bold rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                >
                  <Download className="mr-2 w-4 h-4" /> Card PDF
                </a>
                <Link 
                  to="/contact" 
                  className="flex-1 md:flex-none inline-flex items-center justify-center px-5 py-3 border border-yellow-500/40 bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-slate-900 text-sm font-bold rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                >
                  Contact Sales
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sneak Peek Teaser Grid - COMMENTED OUT FOR NOW */}

      </div>
    </div>
  );
};

export default Store;
