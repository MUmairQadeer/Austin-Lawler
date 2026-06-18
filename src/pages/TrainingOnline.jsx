import React from 'react';
import { Link } from 'react-router-dom';

const TrainingOnline = () => {
  return (
    <div className="min-h-screen bg-slate-900 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
            <span className="text-yellow-500">Online</span> Safety Training
          </h1>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Flexible, OSHA-aware courses designed for remote crews and busy telecom teams.
          </p>
        </div>

        <div className="space-y-8 lg:max-w-3xl lg:mx-auto">
          <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
            <img src="/under-development.jpg" alt="Under Development" width="800" height="500" loading="lazy" decoding="async" className="w-full h-72 sm:h-96 md:h-[500px] object-cover" />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 bg-yellow-500 text-slate-900 font-bold rounded-xl uppercase tracking-wide shadow-lg hover:bg-yellow-400 transition"
            >
              Contact Now
            </Link>
            <Link
              to="/training/onsite"
              className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 border border-slate-700 text-slate-300 rounded-xl uppercase tracking-wide hover:border-yellow-500 hover:text-yellow-500 transition"
            >
              In Person Safety Training
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingOnline;
