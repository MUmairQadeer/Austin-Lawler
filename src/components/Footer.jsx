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
              <img src="/logo.png" alt="Safety Guild Logo" loading="lazy" className="h-14 md:h-16 w-auto object-contain" />
            </Link>
            <p className="text-slate-400 max-w-sm mb-6">
              Premier Telecom & Tower Safety Training. We equip construction workers, tech professionals, and foremen with the knowledge they need to climb higher and work safer.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/training" className="text-slate-400 hover:text-yellow-500 transition-colors">Safety Courses</Link></li>
              <li><Link to="/verification" className="text-slate-400 hover:text-yellow-500 transition-colors">Verify Certificate</Link></li>
              <li><Link to="/reviews" className="text-slate-400 hover:text-yellow-500 transition-colors">Testimonials</Link></li>
              <li><Link to="/store" className="text-slate-400 hover:text-yellow-500 transition-colors">Equipment Store</Link></li>
              <li><Link to="/gallery" className="text-slate-400 hover:text-yellow-500 transition-colors">Photo Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 inline-block">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <span>123 Safety Drive, Suite 100<br/>Austin, TX 78701</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="w-5 h-5 text-yellow-500 shrink-0" />
                <span>(800) 555-SAFE</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="w-5 h-5 text-yellow-500 shrink-0" />
                <span>training@safetyguild.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center md:flex md:justify-between md:text-left">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Safety Guild. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm mt-2 md:mt-0">
            Instructor: Austin Lawler
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
