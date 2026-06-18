import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, HardHat, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', company: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      return setError('Please fill in all required fields.');
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
              Contact <span className="text-yellow-500">Us</span>
            </h1>
            <p className="text-xl text-slate-400">
              Get in touch to schedule private training, ask questions, or learn more about our programs.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Us & Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-2xl font-bold text-white uppercase border-b border-slate-700 pb-4 mb-6 flex items-center gap-3">
                <HardHat className="text-yellow-500 w-6 h-6" />
                Contact Us
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Contacting CSG is easy. Simply call or text us at (903) 246-5248, email us at support@safetyguild.org, or fill out our contact form below. Construction Safety Guild is dedicated to serving you! Contact us today so we can help you pursue a safer future!
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold text-white uppercase mb-6">Contact Info</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-slate-300 group">
                  <div className="bg-slate-900 p-3 rounded-lg group-hover:bg-yellow-500/10 transition-colors shrink-0">
                    <MapPin className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <strong className="block text-white mb-1">Training Facility</strong>
                    6906 Ledbetter Rd., Arlington, TX 76001<br /><em>*By appointment only*</em>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-slate-300 group">
                  <div className="bg-slate-900 p-3 rounded-lg group-hover:bg-yellow-500/10 transition-colors shrink-0">
                    <Phone className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <strong className="block text-white mb-1">Phone</strong>
                    (903) 246-5248
                  </div>
                </li>
                <li className="flex items-start gap-4 text-slate-300 group">
                  <div className="bg-slate-900 p-3 rounded-lg group-hover:bg-yellow-500/10 transition-colors shrink-0">
                    <Mail className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <strong className="block text-white mb-1">Email</strong>
                    support@safetyguild.org
                  </div>
                </li>
              </ul>
            </div>

            {/* Marketing Materials */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 mt-8">
              <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2">
                <HardHat className="text-yellow-500 w-6 h-6" />
                Brochures
              </h3>
              <div className="flex flex-col gap-6 w-full">
                <a href="/business-card.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-slate-900 p-5 rounded-xl border border-slate-700 hover:border-yellow-500 transition-colors group">
                  <div className="bg-slate-800 p-3 rounded-lg group-hover:bg-yellow-500/10 transition-colors shadow-inner">
                     <HardHat className="text-yellow-500 w-8 h-8 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Austin's Business Card</h4>
                    <span className="text-sm text-yellow-500 font-medium tracking-wide">Download PDF</span>
                  </div>
                </a>
                <div className="flex flex-wrap gap-8 w-full mt-2">
                  <div className="w-full flex-1 min-w-[300px]">
                    <span className="block text-slate-400 text-sm uppercase tracking-wider mb-2 font-bold">Front Content</span>
                    <a href="/trifold-front.jpg" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-slate-700 shadow-xl hover:border-yellow-500 transition-colors bg-slate-900 p-1 group">
                      <img src="/trifold-front.jpg" alt="Brochure Front" className="w-full h-auto object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-500" />
                    </a>
                  </div>
                  <div className="w-full flex-1 min-w-[300px]">
                    <span className="block text-slate-400 text-sm uppercase tracking-wider mb-2 font-bold">Back Content</span>
                    <a href="/trifold-back.jpg" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-slate-700 shadow-xl hover:border-yellow-500 transition-colors bg-slate-900 p-1 group">
                      <img src="/trifold-back.jpg" alt="Brochure Back" className="w-full h-auto object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-500" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-white uppercase border-b border-slate-700 pb-4 mb-8">
                Send a Message
              </h2>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-900/40 border border-green-500/50 p-8 rounded-xl flex flex-col items-center text-center"
                >
                  <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-green-200 text-sm">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-sm underline text-green-400 hover:text-green-300"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">First Name *</label>
                      <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                      <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                    <input type="email" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Company (Optional)</label>
                    <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Message *</label>
                    <textarea rows="4" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 resize-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                  </div>

                  <button type="submit" disabled={loading} className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-xl uppercase tracking-wide transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)] disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
