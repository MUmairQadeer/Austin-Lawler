import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, ChevronRight } from 'lucide-react';

const Training = () => {
  const courses = [
    { name: "Tower Climbing & Rescue", desc: "Comprehensive training on safe climbing techniques, fall protection, and multi-scenario tower rescues.", type: "In-Person" },
    { name: "Competent Rigging", desc: "Master the principles of rigging, load calculations, and safe lifting practices on telecom sites.", type: "In-Person" },
    { name: "RF Radiation Awareness", desc: "Identify hazards, understand exposure limits, and apply protective measures against RF radiation.", type: "In-Person & Online" },
    { name: "First Aid & CPR", desc: "Essential life-saving skills tailored for high-altitude and remote construction environments.", type: "In-Person" },
    { name: "OSHA 10", desc: "Standard 10-hour training covering general safety and health hazards for construction workers.", type: "In-Person & Online" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

        {/* Action Banner for SafetyLMS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 mb-16 flex flex-col md:flex-row items-center justify-between shadow-2xl"
        >
          <div className="mb-6 md:mb-0 md:mr-8 max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">Looking for Online Training?</h3>
            <p className="text-slate-400">
              Access our comprehensive library of online courses, including OSHA 10 and RF Awareness, perfectly integrated with SafetyLMS for easy progress tracking.
            </p>
          </div>
          <a flex="shrink-0" href="https://www.safetylms.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-slate-900 bg-yellow-500 hover:bg-yellow-400 transition-all uppercase group w-full md:w-auto shrink-0 cursor-pointer">
            Access SafetyLMS
            <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:border-yellow-500 transition-all group flex flex-col h-full cursor-default"
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
                <button className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-bold rounded-lg text-white border border-slate-600 hover:bg-slate-700 hover:border-slate-500 transition-all uppercase group-hover:text-yellow-500 cursor-pointer">
                  Request Info
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Training;
