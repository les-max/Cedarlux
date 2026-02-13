
import React, { useState, useEffect } from 'react';
import { Property, SiteSettings } from './types.ts';
import { INITIAL_PROPERTIES, DEFAULT_SETTINGS } from './constants.tsx';
import { PropertyCard } from './components/PropertyCard.tsx';
import { PropertyAdmin } from './components/PropertyAdmin.tsx';
import { AIConsultant } from './components/AIConsultant.tsx';
import { PropertyDetailsModal } from './components/PropertyDetailsModal.tsx';
import { 
  Menu, X, Map, Phone, Instagram, Facebook, LayoutDashboard, 
  Lock, ArrowRight, Quote, Filter, Search, ChevronLeft, 
  Waves, Flag, Users, Camera, Utensils, Anchor, MapPin, 
  ShoppingBag, Sun, Coffee, Star
} from 'lucide-react';

const ICON_MAP: Record<string, any> = { Waves, Flag, Users, ShoppingBag, Utensils, Star, Sun, Coffee, Anchor };

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('creekside_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('creekside_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_SETTINGS, ...parsed };
      } catch (e) {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [view, setView] = useState<'home' | 'admin' | 'listings' | 'lifestyle'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [filterNeighborhood, setFilterNeighborhood] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  useEffect(() => {
    localStorage.setItem('creekside_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('creekside_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (settings.externalScripts) {
      const scriptId = 'custom-site-integrations';
      let scriptContainer = document.getElementById(scriptId);
      if (!scriptContainer) {
        scriptContainer = document.createElement('div');
        scriptContainer.id = scriptId;
        scriptContainer.style.display = 'none';
        document.body.appendChild(scriptContainer);
      }
      const range = document.createRange();
      scriptContainer.innerHTML = ''; 
      const fragment = range.createContextualFragment(settings.externalScripts);
      scriptContainer.appendChild(fragment);
    }
  }, [settings.externalScripts]);

  const addProperty = (newProperty: Property) => {
    setProperties(prev => [newProperty, ...prev]);
  };

  const updateProperty = (updated: Property) => {
    setProperties(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'cedarcreek') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const navigateToLifestyle = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setView('lifestyle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const filteredProperties = properties.filter(p => {
    const neighborhoodMatch = filterNeighborhood === 'All' || p.neighborhood === filterNeighborhood;
    const statusMatch = filterStatus === 'All' || p.status === filterStatus;
    return neighborhoodMatch && statusMatch;
  });

  const neighborhoodsList = ['All', ...settings.neighborhoods];
  const statusesList = ['All', 'Available', 'Under Construction', 'Sold'];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <nav className="fixed w-full z-50 glass shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('home')}>
            <img src={settings.logoImage} alt={`${settings.companyName} Logo`} className="h-14 md:h-16 w-auto object-contain transition-all" />
          </div>

          <div className="hidden md:flex items-center gap-10">
            <button onClick={() => setView('home')} className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors ${view === 'home' ? 'text-luxury-gold' : 'text-neutral-600 hover:text-lake'}`}>Home</button>
            <button onClick={() => setView('listings')} className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors ${view === 'listings' ? 'text-luxury-gold' : 'text-neutral-600 hover:text-lake'}`}>Collection</button>
            <button onClick={navigateToLifestyle} className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors ${view === 'lifestyle' ? 'text-luxury-gold' : 'text-neutral-600 hover:text-lake'}`}>Lifestyle</button>
            <button 
              onClick={() => setView('admin')} 
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-[0.1em] transition-all ${view === 'admin' ? 'bg-lake text-white' : 'border border-lake text-lake hover:bg-lake hover:text-white'}`}
            >
              <LayoutDashboard size={14} /> Backend
            </button>
          </div>

          <button className="md:hidden text-lake" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col p-12 pt-32 gap-8 md:hidden animate-in fade-in slide-in-from-right duration-300">
          <button onClick={() => { setView('home'); setIsMenuOpen(false); }} className="text-3xl font-bold serif text-left">Home</button>
          <button onClick={() => { setView('listings'); setIsMenuOpen(false); }} className="text-3xl font-bold serif text-left">The Collection</button>
          <button onClick={navigateToLifestyle} className="text-3xl font-bold serif text-left">Lifestyle</button>
          <button onClick={() => { setView('admin'); setIsMenuOpen(false); }} className="text-3xl font-bold serif text-left text-luxury-gold">CMS Login</button>
          <div className="mt-auto flex gap-6 text-neutral-400">
            <Instagram size={24} /> <Facebook size={24} />
          </div>
        </div>
      )}

      {view === 'home' && (
        <main className="flex-1">
          <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
            <div className="absolute inset-0">
              <img src={settings.heroImage} className="w-full h-full object-cover brightness-[0.65] scale-105 transition-all duration-1000" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-lake/60 via-transparent to-black/30"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-6 pt-24 text-white">
              <div className="inline-block px-4 py-2 border border-white/30 bg-white/10 backdrop-blur-md rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Exclusively Cedar Creek Lake</span>
              </div>
              <h1 className="text-6xl md:text-[5.5rem] font-medium leading-[1.05] mb-8 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {(settings.heroHeadline || '').split('.').map((p, i) => i === 0 ? p + '.' : <span key={i} className="italic serif text-luxury-gold ml-2 block">{p}</span>)}
              </h1>
              <p className="text-xl md:text-2xl text-neutral-200 max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1200 leading-relaxed font-light">
                {settings.heroSubheadline}
              </p>
              <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1500">
                <button onClick={() => setView('listings')} className="px-12 py-5 bg-luxury-gold text-white font-bold rounded-full hover:bg-white hover:text-lake transition-all shadow-2xl text-lg flex items-center gap-3">
                  Explore The Collection <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </section>

          <section className="py-32 bg-white" id="portfolio">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                <div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 italic serif tracking-tight">Current Portfolio</h2>
                  <p className="text-neutral-400 text-xl max-w-2xl font-light">Uncompromising quality. Breathtaking views. These are the estates currently setting the standard for lakefront living.</p>
                </div>
                <button onClick={() => setView('listings')} className="text-luxury-gold font-bold flex items-center gap-2 hover:gap-4 transition-all">
                  View All Listings <ArrowRight size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {properties.slice(0, 3).map(property => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    onViewDetails={setSelectedProperty}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="py-40 bg-lake text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="relative">
                  <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl group">
                    <img src={settings.lifestyleImage || 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=2070'} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                  </div>
                  <div className="absolute -bottom-16 -right-16 w-3/4 aspect-video bg-luxury-gold p-12 rounded-[2rem] shadow-2xl hidden xl:block">
                    <Quote className="text-white/20 absolute top-8 left-8" size={64} />
                    <p className="text-3xl font-bold serif italic mb-6 leading-tight">"{settings.lifestyleQuote || "It's more than a home; it's a legacy."}"</p>
                    <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/70">— {settings.lifestyleQuoteAuthor || "Our Residents"}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-5xl md:text-7xl font-medium mb-10 leading-tight">
                    {(settings.lifestyleHeadline || 'Experience Lake Life').split(' ').map((word, i) => i > 1 ? <span key={i} className="italic serif text-luxury-gold block">{word}</span> : word + ' ')}
                  </h2>
                  <p className="text-xl text-neutral-400 mb-12 font-light leading-relaxed">{settings.lifestyleSubheadline}</p>
                  <button onClick={navigateToLifestyle} className="px-10 py-4 border-2 border-luxury-gold text-luxury-gold font-bold rounded-full hover:bg-luxury-gold hover:text-white transition-all uppercase tracking-widest text-xs">
                    Explore The Lifestyle
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {view === 'lifestyle' && (
        <main className="flex-1">
          <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
            <div className="absolute inset-0">
              <img src={settings.lifestyleHeroImage} className="w-full h-full object-cover brightness-[0.45]" alt="Cedar Creek Lake Lifestyle" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-neutral-50"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-6 text-white text-center">
              <span className="text-xs font-bold uppercase tracking-[0.5em] text-luxury-gold mb-6 block">Cedar Creek Lake, Texas</span>
              <h1 className="text-6xl md:text-[6rem] font-medium serif italic mb-8 leading-tight">
                 {settings.lifestyleHeroHeadline.split(' ').map((word, i) => i === 2 ? <span key={i} className="block">{word}</span> : word + ' ')}
              </h1>
              <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed">
                {settings.lifestyleHeroSubheadline}
              </p>
            </div>
          </section>
          {/* Rest of the Lifestyle components... */}
        </main>
      )}

      {view === 'listings' && (
        <main className="flex-1 pt-40 pb-32">
          <div className="max-w-7xl mx-auto px-6">
            <button onClick={() => setView('home')} className="flex items-center gap-2 text-neutral-400 hover:text-lake mb-12 transition-colors font-bold uppercase tracking-widest text-xs">
              <ChevronLeft size={16} /> Back to Experience
            </button>
            <div className="mb-16">
              <h1 className="text-6xl font-medium serif italic mb-6">The Collection</h1>
              <p className="text-xl text-neutral-400 font-light max-w-2xl">Bespoke lakefront residences currently available or under craftsmanship on Cedar Creek Lake.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 mb-16 flex flex-wrap gap-12 items-end">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-4 ml-1">Location</label>
                <div className="flex gap-3 flex-wrap">
                  {neighborhoodsList.map(n => (
                    <button key={n} onClick={() => setFilterNeighborhood(n)} className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${filterNeighborhood === n ? 'bg-lake text-white shadow-lg' : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100'}`}>{n}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-4 ml-1">Status</label>
                <div className="flex gap-3 flex-wrap">
                  {statusesList.map(s => (
                    <button key={s} onClick={() => setFilterStatus(s)} className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${filterStatus === s ? 'bg-lake text-white shadow-lg' : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100'}`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProperties.length > 0 ? (
                filteredProperties.map(property => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    onViewDetails={setSelectedProperty}
                  />
                ))
              ) : (
                <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-dashed border-neutral-200">
                  <Search size={48} className="mx-auto text-neutral-200 mb-6" />
                  <h3 className="text-2xl font-bold serif italic mb-2">No matching residences</h3>
                  <p className="text-neutral-400">Adjust your filters to see more of our collection.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {view === 'admin' && (
        <main className="flex-1 min-h-screen flex items-center justify-center pt-32 pb-24 px-6 bg-neutral-100 relative overflow-hidden">
          {!isAuthenticated ? (
            <div className="w-full max-w-md bg-white p-12 rounded-[2.5rem] shadow-2xl relative z-10 border border-neutral-200">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold serif italic mb-2">CMS Gate</h2>
                <p className="text-neutral-400 text-sm font-medium">Authorized Personnel Only</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className={`w-full p-4 bg-neutral-50 border rounded-2xl outline-none text-center text-xl tracking-widest ${loginError ? 'border-red-500 animate-shake' : 'border-neutral-200'}`}
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="w-full py-5 bg-lake text-white font-black rounded-2xl hover:bg-neutral-800 transition-all uppercase tracking-widest text-xs">Unlock Backend</button>
              </form>
            </div>
          ) : (
            <PropertyAdmin 
              properties={properties} 
              onAdd={addProperty} 
              onUpdate={updateProperty}
              onDelete={deleteProperty} 
              settings={settings}
              onUpdateSettings={setSettings}
              onLogout={() => { setIsAuthenticated(false); setPasswordInput(''); }}
            />
          )}
        </main>
      )}

      {selectedProperty && (
        <PropertyDetailsModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}
      <AIConsultant />
      <footer className="bg-white border-t border-neutral-100 py-24">
        {/* Footer content... */}
      </footer>
    </div>
  );
};

export default App;
