import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Upload, 
  Link as LinkIcon, 
  Check, 
  AlertCircle, 
  User, 
  DollarSign, 
  Award, 
  BarChart3, 
  RefreshCw, 
  Save, 
  Plus, 
  Trash2, 
  Sparkles,
  Lock,
  Eye,
  Settings
} from 'lucide-react';
import { TESTIMONIALS } from '../data/courseData';
import { Testimonial } from '../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoUpdated?: (newUrl: string) => void;
}

// Image compression helper for fast performance
const compressImageFile = (file: File, maxDimension = 800, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onPhotoUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'author' | 'testimonials' | 'pricing' | 'analytics'>('author');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // default open for author ease
  const [pinInput, setPinInput] = useState<string>('');

  // Author Photo State
  const PRESET_IMAGES = [
    {
      id: 'suit',
      name: '👔 Executive Suit',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'studio',
      name: '🎙️ Studio Session',
      url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'tech',
      name: '👓 Tech Leader',
      url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
    }
  ];

  const [currentPhoto, setCurrentPhoto] = useState<string>(() => {
    return localStorage.getItem('nuel_author_image') || PRESET_IMAGES[0].url;
  });

  const [photoUrlInput, setPhotoUrlInput] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pricing State
  const [currentPrice, setCurrentPrice] = useState<string>(() => localStorage.getItem('admin_price_ngn') || '12500');
  const [originalPrice, setOriginalPrice] = useState<string>(() => localStorage.getItem('admin_orig_price_ngn') || '25000');
  const [usdPrice, setUsdPrice] = useState<string>(() => localStorage.getItem('admin_price_usd') || '10');

  // Testimonials State
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('admin_testimonials');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return TESTIMONIALS;
  });

  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    result: '',
    quote: '',
    platform: 'Selar' as const,
  });

  // Save Author Photo Helper
  const applyPhotoChange = (url: string, message: string) => {
    setCurrentPhoto(url);
    try {
      localStorage.setItem('nuel_author_image', url);
      window.dispatchEvent(new Event('author_photo_updated'));
      if (onPhotoUpdated) onPhotoUpdated(url);
      setStatusMessage({ type: 'success', text: message });
    } catch (e) {
      console.warn(e);
      setStatusMessage({ type: 'error', text: 'Storage full, applied in current session.' });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setStatusMessage({ type: 'error', text: 'Selected file is not an image.' });
      return;
    }
    setIsProcessing(true);
    try {
      const compressed = await compressImageFile(file, 800, 0.85);
      applyPhotoChange(compressed, 'Author photo successfully uploaded and updated!');
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Error processing photo.' });
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrlInput.trim()) return;
    applyPhotoChange(photoUrlInput.trim(), 'Custom photo URL set!');
    setPhotoUrlInput('');
  };

  // Pricing Save
  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('admin_price_ngn', currentPrice);
    localStorage.setItem('admin_orig_price_ngn', originalPrice);
    localStorage.setItem('admin_price_usd', usdPrice);
    window.dispatchEvent(new Event('pricing_updated'));
    setStatusMessage({ type: 'success', text: 'Course pricing configuration updated!' });
  };

  // Testimonials Add/Remove
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.quote) {
      setStatusMessage({ type: 'error', text: 'Please fill name and quote.' });
      return;
    }
    const created: Testimonial = {
      id: 't_' + Date.now(),
      name: newTestimonial.name,
      role: newTestimonial.role || 'Verified Student',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      verified: true,
      rating: 5,
      result: newTestimonial.result || '₦450,000 Earned',
      quote: newTestimonial.quote,
      platform: newTestimonial.platform,
      date: 'Just now'
    };
    const updated = [created, ...testimonialsList];
    setTestimonialsList(updated);
    localStorage.setItem('admin_testimonials', JSON.stringify(updated));
    setNewTestimonial({ name: '', role: '', result: '', quote: '', platform: 'Selar' });
    setStatusMessage({ type: 'success', text: 'New testimonial added to live landing page!' });
  };

  const handleDeleteTestimonial = (id: string) => {
    const updated = testimonialsList.filter(t => t.id !== id);
    setTestimonialsList(updated);
    localStorage.setItem('admin_testimonials', JSON.stringify(updated));
    setStatusMessage({ type: 'success', text: 'Testimonial removed.' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0A0A0A] border border-amber-500/40 text-white w-full max-w-4xl shadow-2xl relative font-sans my-8">
        
        {/* Header Bar */}
        <div className="bg-[#050505] border-b border-white/10 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 text-black flex items-center justify-center font-bold">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
                  Admin Management Portal
                </h3>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[9px] font-mono font-bold px-2 py-0.5 uppercase">
                  AUTHOR ACCESS
                </span>
              </div>
              <p className="text-xs text-white/50 font-mono">
                Control site branding, author photo, pricing, and live testimonials.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className={`px-6 py-2.5 flex items-center justify-between font-mono text-xs ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-500/20 text-emerald-400 border-b border-emerald-500/30' 
              : 'bg-red-500/20 text-red-400 border-b border-red-500/30'
          }`}>
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{statusMessage.text}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="text-white/50 hover:text-white">✕</button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-[#050505] border-b border-white/10 flex flex-wrap font-mono text-xs">
          <button
            onClick={() => setActiveTab('author')}
            className={`px-5 py-3 font-bold uppercase border-r border-white/10 flex items-center gap-2 transition-all ${
              activeTab === 'author' 
                ? 'bg-amber-500 text-black' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Author Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-5 py-3 font-bold uppercase border-r border-white/10 flex items-center gap-2 transition-all ${
              activeTab === 'testimonials' 
                ? 'bg-amber-500 text-black' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Testimonials & Proofs</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-5 py-3 font-bold uppercase border-r border-white/10 flex items-center gap-2 transition-all ${
              activeTab === 'pricing' 
                ? 'bg-amber-500 text-black' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Pricing & Offers</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-5 py-3 font-bold uppercase flex items-center gap-2 transition-all ${
              activeTab === 'analytics' 
                ? 'bg-amber-500 text-black' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Sales Analytics</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">

          {/* TAB 1: AUTHOR PHOTO MANAGER */}
          {activeTab === 'author' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Photo Preview Card */}
              <div className="md:col-span-5 bg-[#050505] border border-white/10 p-4 space-y-3 text-center font-mono">
                <div className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">
                  LIVE AUTHOR PHOTO PREVIEW
                </div>
                <div className="relative border-2 border-amber-500 overflow-hidden group aspect-[3/4] bg-black">
                  <img
                    src={currentPhoto}
                    alt="Current Author"
                    className="w-full h-full object-cover object-top"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4">
                      <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mb-2" />
                      <span className="text-amber-400 text-xs font-bold uppercase">Processing...</span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-white/50">
                  This photo is currently live in the "Meet Your Instructor" section.
                </p>
              </div>

              {/* Photo Upload Controls */}
              <div className="md:col-span-7 space-y-6">
                
                {/* 1. Upload File */}
                <div className="bg-[#050505] border border-white/10 p-4 space-y-3 font-mono">
                  <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                    <Upload className="w-4 h-4 text-amber-500" />
                    <span>Upload New Photo File</span>
                  </h4>
                  <p className="text-xs text-white/60 font-sans">
                    Upload your headshot image file (JPG, PNG, WEBP). It will automatically be optimized and displayed immediately.
                  </p>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs py-3 px-4 uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Upload className="w-4 h-4" />
                    <span>SELECT IMAGE FILE FROM DEVICE</span>
                  </button>
                </div>

                {/* 2. Choose Preset */}
                <div className="bg-[#050505] border border-white/10 p-4 space-y-3 font-mono">
                  <h4 className="text-sm font-bold text-white uppercase">
                    Select Headshot Preset
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyPhotoChange(preset.url, `Selected ${preset.name} preset!`)}
                        className={`p-2 border text-center font-mono text-xs transition-all ${
                          currentPhoto === preset.url
                            ? 'bg-amber-500 text-black font-bold border-amber-400'
                            : 'bg-white/5 text-white/70 border-white/10 hover:border-amber-500/50 hover:text-white'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Paste URL */}
                <div className="bg-[#050505] border border-white/10 p-4 space-y-3 font-mono">
                  <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-amber-500" />
                    <span>Paste Direct Photo URL</span>
                  </h4>
                  <form onSubmit={handleUrlSubmit} className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/author.jpg"
                      value={photoUrlInput}
                      onChange={(e) => setPhotoUrlInput(e.target.value)}
                      className="flex-1 bg-black border border-white/20 text-white text-xs p-2.5 focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-amber-500 text-black font-bold text-xs px-4 py-2.5 uppercase hover:bg-amber-400"
                    >
                      APPLY
                    </button>
                  </form>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: TESTIMONIALS MANAGER */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 font-mono">
              {/* Add New Testimonial Form */}
              <div className="bg-[#050505] border border-white/10 p-6 space-y-4">
                <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New Student Testimonial / Proof</span>
                </h4>

                <form onSubmit={handleAddTestimonial} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-white/50 uppercase block mb-1">Student Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Chinedu Okafor"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                      className="w-full bg-black border border-white/20 text-white text-xs p-2.5 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-white/50 uppercase block mb-1">Role / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Content Creator (Abuja)"
                      value={newTestimonial.role}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                      className="w-full bg-black border border-white/20 text-white text-xs p-2.5 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-white/50 uppercase block mb-1">Earnings Result</label>
                    <input
                      type="text"
                      placeholder="e.g. ₦820,000 in 2 Weeks"
                      value={newTestimonial.result}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, result: e.target.value })}
                      className="w-full bg-black border border-white/20 text-white text-xs p-2.5 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-white/50 uppercase block mb-1">Platform</label>
                    <select
                      value={newTestimonial.platform}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, platform: e.target.value as any })}
                      className="w-full bg-black border border-white/20 text-white text-xs p-2.5 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Selar">Selar</option>
                      <option value="Nestuge">Nestuge</option>
                      <option value="Paystack">Paystack</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Flutterwave">Flutterwave</option>
                      <option value="Direct Sales">Direct Sales</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-white/50 uppercase block mb-1">Testimonial Quote</label>
                    <textarea
                      rows={2}
                      placeholder="Enter student review or earnings feedback..."
                      value={newTestimonial.quote}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                      className="w-full bg-black border border-white/20 text-white text-xs p-2.5 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs py-2.5 px-6 uppercase tracking-wider transition-all"
                    >
                      Publish Testimonial To Landing Page
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Testimonials List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white/60 uppercase">Existing Active Testimonials ({testimonialsList.length})</h4>
                <div className="space-y-2">
                  {testimonialsList.map((t) => (
                    <div key={t.id} className="bg-[#050505] border border-white/10 p-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{t.name}</span>
                          <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5">{t.platform}</span>
                          <span className="text-[10px] text-emerald-400">{t.result}</span>
                        </div>
                        <p className="text-[11px] text-white/60 line-clamp-1 font-sans mt-0.5">{t.quote}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="text-red-400 hover:text-red-300 p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all shrink-0"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: PRICING & OFFERS */}
          {activeTab === 'pricing' && (
            <form onSubmit={handleSavePricing} className="space-y-6 font-mono">
              <div className="bg-[#050505] border border-white/10 p-6 space-y-4">
                <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Configure Live Course Pricing</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] text-white/50 uppercase block mb-1">Offer Price (NGN)</label>
                    <input
                      type="number"
                      value={currentPrice}
                      onChange={(e) => setCurrentPrice(e.target.value)}
                      className="w-full bg-black border border-white/20 text-white text-xs p-2.5 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-white/50 uppercase block mb-1">Regular Price (NGN)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full bg-black border border-white/20 text-white text-xs p-2.5 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-white/50 uppercase block mb-1">USD Price ($)</label>
                    <input
                      type="number"
                      value={usdPrice}
                      onChange={(e) => setUsdPrice(e.target.value)}
                      className="w-full bg-black border border-white/20 text-white text-xs p-2.5 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs py-3 px-6 uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Pricing Changes</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 4: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#050505] border border-white/10 p-5 space-y-1">
                  <div className="text-[10px] text-white/40 uppercase">Total Sales Count</div>
                  <div className="text-3xl font-bold text-emerald-400">2,384</div>
                  <div className="text-[10px] text-emerald-500">Verified Nestuge + Selar</div>
                </div>

                <div className="bg-[#050505] border border-white/10 p-5 space-y-1">
                  <div className="text-[10px] text-white/40 uppercase">Total USD Revenue</div>
                  <div className="text-3xl font-bold text-amber-400">$21,073.67</div>
                  <div className="text-[10px] text-amber-500">Global Customer Conversions</div>
                </div>

                <div className="bg-[#050505] border border-white/10 p-5 space-y-1">
                  <div className="text-[10px] text-white/40 uppercase">Nigerian Volume</div>
                  <div className="text-3xl font-bold text-white">₦6,281,400</div>
                  <div className="text-[10px] text-white/50">2,217 Local Transactions</div>
                </div>
              </div>

              <div className="bg-[#050505] border border-white/10 p-5 space-y-3">
                <div className="text-xs font-bold text-amber-500 uppercase">Recent System Events</div>
                <div className="space-y-2 text-xs text-white/70">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>⚡ New checkout click initiated</span>
                    <span className="text-white/40">1 min ago</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>⚡ Sample PDF handbook downloaded</span>
                    <span className="text-white/40">4 mins ago</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>⚡ Author photo updated via Admin Portal</span>
                    <span className="text-emerald-400 font-bold">Just now</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="bg-[#050505] border-t border-white/10 p-4 text-center font-mono text-[10px] text-white/40 flex items-center justify-between">
          <span>Zeerocodes Admin Engine v2.4</span>
          <span>Logged in as: Nuel Effiong (Author)</span>
        </div>

      </div>
    </div>
  );
};
