import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Calendar, Lock, Unlock, Upload, CheckCircle2 } from 'lucide-react';
import { client, isSanityConfigured } from '../sanityClient';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Admin States
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // Upload States
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const fetchImages = async () => {
    if (!isSanityConfigured) {
      setLoading(false);
      return;
    }
    
    try {
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

  useEffect(() => {
    fetchImages();

    // Check if URL has ?admin=true
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setShowAdminLogin(true);
    }
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const correctPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'wvh6vay2';
    if (adminPassword === correctPasscode) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Incorrect admin passcode.');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadError("Please select an image first.");
      return;
    }
    if (!uploadTitle.trim()) {
      setUploadError("Please enter a title.");
      return;
    }

    setUploadError('');
    setIsUploading(true);

    try {
      // 1. Upload the image file to Sanity Assets
      const asset = await client.assets.upload('image', uploadFile, {
        filename: uploadFile.name
      });

      // 2. Create the Gallery document linking the uploaded asset
      await client.create({
        _type: 'gallery',
        title: uploadTitle,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        image: {
          _type: 'image',
          asset: {
            _type: "reference",
            _ref: asset._id
          }
        }
      });

      // 3. Reset form and refresh gallery
      setUploadFile(null);
      setUploadTitle('');
      setUploadSuccess(true);
      
      // Refresh images to show the new one instantly
      await fetchImages();

      setTimeout(() => setUploadSuccess(false), 4000);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError("Failed to upload image. Please check your connection.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-16 relative overflow-hidden flex flex-col">
      {/* Background Ambient Gradients */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
              Training <span className="text-yellow-500">Gallery</span>
            </h1>
            <p className="text-xl text-slate-400">
              Moments from our live training sessions, certifications, and on-site rescues.
            </p>
          </motion.div>

          {/* Hidden Admin Trigger removed, access via ?admin=true */}
        </div>

        {/* Admin Login Dialog */}
        <AnimatePresence>
          {showAdminLogin && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="max-w-md mx-auto mb-12 p-6 bg-slate-950 border border-slate-800 rounded-2xl"
            >
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold mb-2">
                  <Lock className="w-5 h-5 text-yellow-500" />
                  <span>Gallery Admin Portal</span>
                </div>
                <input 
                  type="password" 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                  placeholder="Enter admin passcode..."
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
                <div className="flex gap-4">
                  <button type="submit" className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold py-2 rounded-lg">
                    Unlock Portal
                  </button>
                  <button type="button" onClick={() => setShowAdminLogin(false)} className="px-4 py-2 border border-slate-700 text-slate-400 rounded-lg hover:text-white">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Upload Panel */}
        <AnimatePresence>
          {isAdmin && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-16 p-8 bg-slate-950/60 border border-yellow-500/20 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Upload className="w-5 h-5 text-yellow-500" />
                    Upload New Image
                  </h2>
                </div>
                <button 
                  onClick={() => setIsAdmin(false)}
                  className="text-sm border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg"
                >
                  Exit Admin Mode
                </button>
              </div>

              {uploadSuccess && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-400 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  Image successfully uploaded and added to the gallery!
                </div>
              )}

              {uploadError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 font-bold">
                  {uploadError}
                </div>
              )}

              <form onSubmit={handleUpload} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Select Image File</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setUploadFile(e.target.files[0])}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500/10 file:text-yellow-500 hover:file:bg-yellow-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Image Title / Description</label>
                    <input 
                      type="text" 
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="e.g., Tower Rescue Course 2026"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload to Gallery
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Grid */}
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
