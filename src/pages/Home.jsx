import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, ShieldCheck, TrendingUp, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 border-b border-slate-800 flex items-center justify-center min-h-[85vh] overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center gap-12">
          
          {/* Hero Content */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 mb-8 font-semibold tracking-wide uppercase text-sm">
              <HardHat className="w-4 h-4" />
              <span>Premier Telecom Safety Training</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 uppercase">
              Climb Higher. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Work Safer.</span>
            </h1>
            
            <p className="mt-4 text-xl text-slate-300 mb-10 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              Industrial strength training for telecom construction workers, foremen, and technicians. Get certified with the most trusted authority in the field.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/training" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-slate-900 bg-yellow-500 hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all uppercase tracking-wide group">
                View Courses
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all uppercase tracking-wide">
                Contact Austin
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="lg:w-1/2 relative flex justify-center w-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-full flex justify-center">
              <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20 rounded-[3rem]"></div>
              <img src="/advertisement-1.png" alt="Safety Guild Training Banner" className="relative z-10 w-full max-w-lg lg:max-w-none h-auto rounded-2xl shadow-xl border border-slate-700 object-contain max-h-[70vh]" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Services Overview with Image background mix */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Background Image Mixed cleanly */}
        <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
          <img src="/services.jpg" alt="background texture" className="w-full h-full object-cover grayscale mix-blend-screen" />
          <div className="absolute inset-0 bg-slate-950/80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-4">Why Safety Guild?</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Industry Standard", desc: "Our certifications exceed OSHA requirements and are recognized nationwide." },
              { icon: HardHat, title: "Hands-on Experience", desc: "Learn from Austin Lawler with real-world scenarios and comprehensive field techniques." },
              { icon: TrendingUp, title: "Career Advancement", desc: "Empower your crew. Our training increases site efficiency and confidence." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-yellow-500/50 transition-colors group cursor-default shadow-lg"
              >
                <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/10 transition-colors">
                  <feature.icon className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advertisement 2 / Featured Promotional Banner */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800 pb-20">
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800 bg-black flex justify-center w-full"
          >
             <img src="/advertisement-2.png" alt="Safety Guild Promotions" className="w-full h-auto object-contain" />
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
