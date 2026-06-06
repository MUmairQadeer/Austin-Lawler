import React from 'react';
import { ShieldAlert, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-6 hover:scale-105 transition-transform">
              <img src="/logo.png" alt="Safety Guild Logo" width="200" height="56" loading="lazy" className="h-14 md:h-16 w-auto object-contain" />
            </Link>
            <p className="text-slate-300 max-w-sm mb-6 font-bold">Pursue a safer future.</p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/training/online" className="text-slate-300 hover:text-yellow-500 transition-colors">Safety Courses</Link></li>
              <li><Link to="/verification" className="text-slate-300 hover:text-yellow-500 transition-colors">Verify Certificate</Link></li>
              <li><Link to="/reviews" className="text-slate-300 hover:text-yellow-500 transition-colors">Testimonials</Link></li>
              <li><Link to="/store" className="text-slate-300 hover:text-yellow-500 transition-colors">Equipment Store</Link></li>
              <li><Link to="/gallery" className="text-slate-300 hover:text-yellow-500 transition-colors">Photo Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 inline-block">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Class location:</strong> 6906 Ledbetter Rd., Arlington, TX 76001<br />
                  <em>*By appointment only*</em>
                </span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Phone className="w-5 h-5 text-yellow-500 shrink-0" />
                <span>(903)246-5248</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Mail className="w-5 h-5 text-yellow-500 shrink-0" />
                <span>Support@safetyguild.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-sm align-middle">
            &copy; {new Date().getFullYear()} Safety Guild. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
