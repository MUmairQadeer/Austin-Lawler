import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Calendar } from 'lucide-react';
import { client, isSanityConfigured } from '../sanityClient';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      if (!isSanityConfigured) {
        setLoading(false);
        return;
      }
      
      try {
        // Fetch gallery images and get their absolute URLs directly in the query
        const query = `*[_type == "gallery"] | order(_createdAt desc) {
          _id,
          title,
          date,
          "imageUrl": image.asset->url
        }`;
        
        const data = await client.fetch(query);
        setImages(data);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 py-16 relative overflow-hidden flex flex-col">
      {/* Background Ambient Gradients */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
              Training <span className="text-yellow-500">Gallery</span>
            </h1>
            <p className="text-xl text-slate-400">
              Moments from our live training sessions, certifications, and on-site rescues.
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mb-4"></div>
            <p className="text-slate-400 font-medium">Loading gallery...</p>
          </div>
        ) : images.length > 0 ? (
          /* Masonry CSS Layout using Tailwind Columns */
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 pb-20">
            {images.map((img, i) => (
              <motion.div
                key={img._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-xl bg-slate-800"
              >
                {img.imageUrl ? (
                  <img 
                    src={img.imageUrl} 
                    alt={img.title} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-slate-800">
                    <ImageIcon className="w-12 h-12 text-slate-600" />
                  </div>
                )}
                
                {/* Premium Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-lg leading-tight mb-1">{img.title}</h3>
                  {img.date && (
                    <div className="flex items-center text-yellow-500 text-sm font-medium">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      {new Date(img.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-3xl p-12 text-center max-w-2xl mx-auto">
            <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No Images Yet</h3>
            <p className="text-slate-400">
              The gallery is currently empty. Check back soon for photos of our recent training events!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Gallery;
