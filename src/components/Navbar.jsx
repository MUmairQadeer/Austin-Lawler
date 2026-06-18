import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShieldAlert } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const location = useLocation();
  const isTrainingActive = location.pathname.startsWith('/training');

  useEffect(() => {
    setIsTrainingOpen(false);
  }, [location.pathname]);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Training', path: '/training/online' },
    { name: 'Verification', path: '/verification' },
    { name: 'Testimonials', path: '/reviews' },
    { name: 'Store', path: '/store' },
    { name: 'Contact', path: '/contact' },
  ];

  const trainingSub = [
    { name: 'Online Safety Training', path: '/training/online' },
    { name: 'In Person Safety Training', path: '/training/onsite' },
  ];

  const activeStyles = "text-yellow-500 font-bold border-b-2 border-yellow-500";
  const defaultStyles = "text-slate-300 hover:text-yellow-500 transition-colors font-medium";

  return (
    <nav className="bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="Safety Guild Logo" width="200" height="56" className="h-30 md:h-14 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform py-2" />
            </NavLink>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {links.map((link) => (
                link.name === 'Training' ? (
                  <div key="training" className="relative">
                    <button
                      type="button"
                      onClick={() => setIsTrainingOpen((prev) => !prev)}
                      className={`px-3 py-2 text-sm uppercase tracking-wider ${isTrainingActive || isTrainingOpen ? activeStyles : defaultStyles}`}
                    >
                      {link.name}
                    </button>

                    <div className={`absolute left-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-md shadow-lg transform transition-all z-50 ${isTrainingOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                      <div className="flex flex-col py-2">
                        {trainingSub.map((sub) => (
                          <NavLink
                            key={sub.name}
                            to={sub.path}
                            className={({ isActive }) => `block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-yellow-500 ${isActive ? 'text-yellow-500 font-bold' : ''}`}
                            onClick={() => setIsTrainingOpen(false)}
                          >
                            {sub.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsTrainingOpen(false)}
                    className={({ isActive }) => 
                      `px-3 py-2 text-sm uppercase tracking-wider ${isActive ? activeStyles : defaultStyles}`
                    }
                  >
                    {link.name}
                  </NavLink>
                )
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
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
              <div key={link.name}>
                {link.name === 'Training' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsTrainingOpen((prev) => !prev)}
                      className={`w-full text-left px-3 py-2 rounded-md text-base uppercase tracking-wider ${isTrainingActive ? "bg-slate-800 text-yellow-500 font-bold" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
                    >
                      {link.name}
                    </button>
                    {isTrainingOpen && (
                      <div className="pl-6 mt-1 space-y-1">
                        {trainingSub.map((sub) => (
                          <NavLink
                            key={sub.name}
                            to={sub.path}
                            onClick={() => {
                              setIsOpen(false);
                              setIsTrainingOpen(false);
                            }}
                            className={({ isActive }) => `block px-3 py-2 rounded-md text-sm uppercase tracking-wider ${isActive ? 'bg-slate-800 text-yellow-500 font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                          >
                            {sub.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => 
                      `block px-3 py-2 rounded-md text-base uppercase tracking-wider ${isActive ? "bg-slate-800 text-yellow-500 font-bold" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`
                    }
                  >
                    {link.name}
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
