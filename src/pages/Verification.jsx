import React from 'react';
import { motion } from 'framer-motion';

const Verification = () => {
  return (
    <div className="min-h-screen bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
              Certificate <span className="text-yellow-500">Verification</span>
            </h1>
            <p className="text-xl text-slate-400">
              Access our secure database to verify student certifications, training validity, and compliance status.
            </p>
          </motion.div>
        </div>

        {/* Under Development Banner */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative mx-auto w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <img src="/underDev.jpg" alt="Under Development" className="w-full h-72 sm:h-96 md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Verification;
