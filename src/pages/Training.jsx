import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, CheckCircle2, ChevronRight, Lock, Mail, HardHat, Sparkles, ArrowRight } from 'lucide-react';
import { client, isSanityConfigured } from '../sanityClient';

const Training = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const courses = [
    { name: "Tower Climbing & Rescue", desc: "Comprehensive training on safe climbing techniques, fall protection, and multi-scenario tower rescues.", type: "In-Person" },
    { name: "Competent Rigging", desc: "Master the principles of rigging, load calculations, and safe lifting practices on telecom sites.", type: "In-Person" },
    { name: "RF Radiation Awareness", desc: "Identify hazards, understand exposure limits, and apply protective measures against RF radiation.", type: "In-Person & Online" },
    { name: "First Aid & CPR", desc: "Essential life-saving skills tailored for high-altitude and remote construction environments.", type: "In-Person" },
    { name: "OSHA 10", desc: "Standard 10-hour training covering general safety and health hazards for construction workers.", type: "In-Person & Online" },
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
      source: 'Training',
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
              Safety <span className="text-yellow-500">Training Courses</span>
            </h1>
            <p className="text-xl text-slate-400">
              Expert-led, OSHA-compliant certification courses tailored for the telecom and tower construction industry.
            </p>
          </motion.div>
        </div>

        {/* Under Development Banner */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative mx-auto max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <img src="/under-development.jpg" alt="Under Development" width="800" height="400" loading="lazy" decoding="async" className="w-full h-56 sm:h-72 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Premium "Currently in Production" Showcase Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden max-w-4xl mx-auto mb-20"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Pulsing Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-bold tracking-widest uppercase mb-8 shadow-inner animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-ping"></span>
              Platform in Production
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 uppercase tracking-tight">
              Elevating Safety <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Education</span>
            </h2>
            
            <p className="text-slate-300 max-w-2xl text-lg leading-relaxed mb-10">
              Our interactive training dashboard, course booking system, and digital LMS portal are actively being optimized. Austin and the crew are custom-building this space to bring you elite, accredited tower safety modules.
            </p>

            {/* Premium Progress Bar */}
            <div className="w-full max-w-lg mb-12 bg-slate-900/80 border border-slate-800 rounded-full p-1.5 shadow-inner">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Course Simulator Build</span>
                <span className="text-yellow-500">85% Complete</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-800/80">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-500 h-full rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                />
              </div>
            </div>

            {/* Email Subscription Form */}
            <div className="w-full max-w-md mb-8">
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
                        placeholder="Enter email to get launch notifications" 
                        className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500/80 focus:ring-2 focus:ring-yellow-500/20 transition-all font-medium"
                      />
                    </div>
                    {error && <span className="text-red-500 text-sm font-semibold">{error}</span>}
                    <button 
                      type="submit" 
                      className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-extrabold py-4 rounded-xl uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Notify Me of Release
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
                    <h4 className="text-white font-bold text-lg mb-1">You're on the list!</h4>
                    <p className="text-slate-300 text-sm">We'll alert you the moment early scheduling and online courses go live.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Contact Alternative CTA */}
            <div className="border-t border-slate-700/40 w-full pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-left">
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl shrink-0">
                  <HardHat className="text-yellow-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Need immediate, accredited safety training?</h4>
                  <p className="text-slate-400 text-xs">Austin is certifying crews offline every week.</p>
                </div>
              </div>
              <Link 
                to="/contact" 
                className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-slate-600 hover:border-yellow-500 hover:bg-slate-800 text-white hover:text-yellow-500 text-sm font-bold rounded-xl transition-all uppercase tracking-wider shrink-0 cursor-pointer"
              >
                Inquire Offline
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Sneak Peek Teaser Grid (Blurred background courses) */}
        <div className="relative mt-8">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[4px] rounded-3xl z-20 flex flex-col items-center justify-center p-6 border border-slate-800">
            <div className="bg-slate-950/80 border border-slate-700 p-8 rounded-2xl text-center max-w-md shadow-2xl flex flex-col items-center">
              <Lock className="w-10 h-10 text-yellow-500 mb-4 animate-bounce" />
              <h3 className="text-white font-bold text-xl uppercase mb-2">Curriculum Sneak Peek</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                These core modules are finalized and will be fully open for registration as soon as the platform deployment completes.
              </p>
              <span className="text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                5 Courses Loading
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 opacity-45 pointer-events-none">
            {courses.map((course, i) => (
              <div 
                key={i}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col h-full cursor-default"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white">{course.name}</h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-yellow-500 uppercase">
                    {course.type}
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                  {course.desc}
                </p>
                
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-yellow-500 mr-2" /> Authorized Certification
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-yellow-500 mr-2" /> Expert Instruction
                  </li>
                </ul>

                <div className="mt-auto">
                  <button className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-bold rounded-lg text-white border border-slate-600 transition-all uppercase cursor-pointer">
                    Request Info
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Training;
