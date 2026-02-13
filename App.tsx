import React, { useState, useEffect } from 'react';
import { Property, SiteSettings } from './types';
import { INITIAL_PROPERTIES, DEFAULT_SETTINGS } from './constants';
import { PropertyCard } from './components/PropertyCard';
import { PropertyAdmin } from './components/PropertyAdmin';
import { AIConsultant } from './components/AIConsultant';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { 
  Menu, X, Phone, Instagram, Facebook, LayoutDashboard, 
  ArrowRight, Quote, Search, ChevronLeft, 
  Waves, Flag, Users, ShoppingBag, Utensils, Anchor, MapPin, 
  Sun, Coffee, Star
} from 'lucide-react';

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
            <h2 className="text-2xl font-bold serif tracking-tight">CEDAR <span className="text-luxury-gold italic">LUX</span></h2>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <button onClick={() => setView('home')} className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors ${view === 'home' ? 'text-luxury-gold' : 'text-neutral-600 hover:text-lake'}`}>Home</button>
            <button onClick={() => setView('listings')} className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors ${view === 'listings' ? 'text-luxury-gold' : 'text-neutral-600 hover:text-lake'}`}>Collection</button>
            <button onClick={() => setView('lifestyle')} className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors ${view === 'lifestyle' ? 'text-luxury-gold' : 'text-neutral-600 hover:text-lake'}`}>Lifestyle</button>
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

      {view === 'home' && (
        <main className="flex-1">
          <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
            <div className="absolute inset-0">
              <img src={settings.heroImage} className="w-full h-full object-cover brightness-[0.65]" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-lake/60 via-transparent to-black/30"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-6 pt-24 text-white">
              <div className="inline-block px-4 py-2 border border-white/30 bg-white/10 backdrop-blur-md rounded-full mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Exclusively Cedar Creek Lake</span>
              </div>
              <h1 className="text-6xl md:text-[5.5rem] font-medium leading-[1.05] mb-8 max-w-4xl">
                {settings.heroHeadline}
              </h1>
              <p className="text-xl md:text-2xl text-neutral-200 max-w-2xl mb-12 font-light">
                {settings.heroSubheadline}
              </p>
              <button onClick={() => setView('listings')} className="px-12 py-5 bg-luxury-gold text-white font-bold rounded-full hover:bg-white hover:text-lake transition-all shadow-2xl text-lg flex items-center gap-3">
                Explore The Collection <ArrowRight size={20} />
              </button>
            </div>
          </section>

          <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-5xl md:text-6xl font-bold mb-16 italic serif">Featured Estates</h2>
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
        </main>
      )}

      {view === 'listings' && (
        <main className="flex-1 pt-40 pb-32">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-6xl font-medium serif italic mb-12">The Collection</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  onViewDetails={setSelectedProperty}
                />
              ))}
            </div>
          </div>
        </main>
      )}

      {view === 'admin' && (
        <main className="flex-1 pt-40 pb-24 px-6 bg-neutral-100 flex items-center justify-center">
          {!isAuthenticated ? (
            <div className="w-full max-w-md bg-white p-12 rounded-[2.5rem] shadow-2xl">
              <h2 className="text-2xl font-bold serif italic mb-8 text-center">CMS Access</h2>
              <form onSubmit={handleLogin} className="space-y-6">
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full p-4 border rounded-xl outline-none"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                />
                <button type="submit" className="w-full py-4 bg-lake text-white font-bold rounded-xl hover:bg-neutral-800 transition-all">Login</button>
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
    </div>
  );
};

export default App;