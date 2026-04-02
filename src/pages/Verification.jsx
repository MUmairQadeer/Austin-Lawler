import React from 'react';
import { motion } from 'framer-motion';
import { Search, Database } from 'lucide-react';

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

        {/* Power BI Mock Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-slate-800 border border-slate-700 p-2 sm:p-4 rounded-2xl shadow-2xl relative"
        >
          {/* Mock Browser/Tool Bar */}
          <div className="bg-slate-900 border-b border-slate-700 rounded-t-xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-yellow-500" />
              <span className="font-mono text-sm text-slate-400 font-bold tracking-widest">SG_VERIFY_DB_QUERY</span>
            </div>
            <div className="relative">
               <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
               <input type="text" disabled placeholder="Search ID..." className="bg-slate-800 border border-slate-700 text-sm rounded-md pl-9 pr-3 py-1 text-slate-300 w-48 opacity-50 cursor-not-allowed" />
            </div>
          </div>
          
          {/* Embedded Power BI Mock content iframe area */}
          <div className="bg-slate-950 aspect-video w-full rounded-b-xl flex flex-col items-center justify-center border border-t-0 border-slate-800 relative overflow-hidden">
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(slate, transparent 1px), linear-gradient(90deg, slate, transparent 1px)', backgroundSize: '30px 30px' }} />

            {/* <!-- POWER BI EMBED HERE --> */}
            <div className="text-center relative z-10 p-8 border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm rounded-2xl">
              <Database className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-300 mb-2 uppercase">Database Loading...</h3>
              <p className="text-slate-500 mb-4 max-w-sm">
                This secure portal interfaces with Microsoft Power BI to deliver live credential verification. 
              </p>
              <div className="w-8 h-8 mx-auto border-4 border-slate-700 border-t-yellow-500 rounded-full animate-spin"></div>
              <div className="mt-8 text-xs font-mono text-slate-600 bg-slate-950 px-4 py-2 rounded">
                &lt;!-- POWER BI EMBED HERE --&gt;
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Verification;
