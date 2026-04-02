import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search } from 'lucide-react';

const Store = () => {
  const equipment = [
    { name: "Pro Climbing Harness", price: "$349.99", category: "Equipment" },
    { name: "Heavy Duty Carabiner Set", price: "$89.99", category: "Equipment" },
    { name: "Safety Helmet Class E", price: "$129.99", category: "Equipment" },
  ];

  const apparel = [
    { name: "SG High-Vis Jacket", price: "$75.00", category: "Apparel" },
    { name: "SG Classic Logo Tee", price: "$25.00", category: "Apparel" },
    { name: "Instructor Polo", price: "$45.00", category: "Apparel" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
              Safety Guild <span className="text-yellow-500">Store</span>
            </h1>
            <p className="text-xl text-slate-400">
              Official training gear, certified equipment, and exclusive apparel.
            </p>
          </motion.div>
        </div>

        {/* Store sections */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
            <h2 className="text-2xl font-bold text-white uppercase">Certified Equipment</h2>
            <button className="text-slate-400 hover:text-yellow-500 transition-colors">View All</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {equipment.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-yellow-500 transition-colors group cursor-pointer"
              >
                <div className="h-48 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                  <ShoppingBag className="w-16 h-16 text-slate-700 group-hover:scale-110 transition-transform duration-500" />
                  {/* Image placeholder text */}
                  <span className="absolute bottom-4 right-4 text-xs font-mono text-slate-600 bg-slate-950 px-2 py-1 rounded">IMAGE_PLACEHOLDER</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest">{item.category}</span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-slate-300">{item.price}</span>
                    <button className="text-sm border border-slate-600 hover:border-yellow-500 text-white hover:text-yellow-500 px-4 py-2 rounded-lg transition-colors font-medium">Add</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
            <h2 className="text-2xl font-bold text-white uppercase">Official Apparel</h2>
            <button className="text-slate-400 hover:text-yellow-500 transition-colors">View All</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {apparel.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-yellow-500 transition-colors group cursor-pointer"
              >
                <div className="h-48 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                  <ShoppingBag className="w-16 h-16 text-slate-700 group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute bottom-4 right-4 text-xs font-mono text-slate-600 bg-slate-950 px-2 py-1 rounded">IMAGE_PLACEHOLDER</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest">{item.category}</span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-slate-300">{item.price}</span>
                    <button className="text-sm border border-slate-600 hover:border-yellow-500 text-white hover:text-yellow-500 px-4 py-2 rounded-lg transition-colors font-medium">Add</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Store;
