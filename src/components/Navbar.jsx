import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ShieldAlert } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Training', path: '/training' },
    { name: 'Verification', path: '/verification' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Store', path: '/store' },
    { name: 'Contact', path: '/contact' },
  ];

  const activeStyles = "text-yellow-500 font-bold border-b-2 border-yellow-500";
  const defaultStyles = "text-slate-300 hover:text-yellow-500 transition-colors font-medium";

  return (
    <nav className="bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="Safety Guild Logo" className="h-10 sm:h-12 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
              <span className="font-bold text-2xl tracking-tight text-white uppercase sm:block hidden">
                Safety<span className="text-yellow-500">Guild</span>
              </span>
            </NavLink>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => 
                    `px-3 py-2 text-sm uppercase tracking-wider ${isActive ? activeStyles : defaultStyles}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base uppercase tracking-wider ${
                    isActive ? "bg-slate-800 text-yellow-500 font-bold" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
