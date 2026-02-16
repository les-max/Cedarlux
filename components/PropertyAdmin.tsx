import React, { useState } from 'react';
import { Property, PropertyStatus, SiteSettings } from '../types';
import { Layout, Settings, Edit2, Trash2, X, Sun, LogOut, Plus, Save, Code, Copy, CheckCircle } from 'lucide-react';

interface PropertyAdminProps {
  properties: Property[];
  onAdd: (property: Property) => void;
  onUpdate: (property: Property) => void;
  onDelete: (id: string) => void;
  settings: SiteSettings;
  onUpdateSettings: (settings: SiteSettings) => void;
  onLogout: () => void;
}

export const PropertyAdmin: React.FC<PropertyAdminProps> = ({ 
  properties, 
  onAdd, 
  onUpdate,
  onDelete, 
  settings, 
  onUpdateSettings,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'settings' | 'lifestyle'>('inventory');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    price: 0,
    beds: 0,
    baths: 0,
    sqft: 0,
    description: '',
    image: '',
    gallery: [],
    status: 'Available',
    neighborhood: settings.neighborhoods[0] || 'Cedar Creek Lake',
    features: []
  });

  const [tempSettings, setTempSettings] = useState<SiteSettings>(settings);

  const startEdit = (prop: Property) => {
    setEditingProperty(prop);
    setFormData({ ...prop, gallery: prop.gallery || [] });
    setIsAdding(true);
  };

  const handlePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProperty) {
      onUpdate({ ...formData, id: editingProperty.id } as Property);
    } else {
      const newProperty: Property = {
        ...formData as Property,
        id: Math.random().toString(36).substr(2, 9),
      };
      onAdd(newProperty);
    }
    setIsAdding(false);
    setEditingProperty(null);
  };

  const saveSettings = () => {
    onUpdateSettings(tempSettings);
    alert('Settings Saved Successfully');
  };

  const generatePersistentCode = () => {
    const settingsStr = JSON.stringify(tempSettings, null, 2);
    const propertiesStr = JSON.stringify(properties, null, 2);
    
    return `import { Property, SiteSettings } from './types';

export const DEFAULT_SETTINGS: SiteSettings = ${settingsStr};

export const INITIAL_PROPERTIES: Property[] = ${propertiesStr};`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatePersistentCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 flex flex-col md:flex-row min-h-[700px] w-full max-w-6xl mx-auto">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-lake p-8 text-white flex flex-col">
        <h2 className="text-xl font-bold italic serif mb-12">CMS Dashboard</h2>
        <nav className="flex-1 space-y-4">
          <button 
            onClick={() => setActiveTab('inventory')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inventory' ? 'bg-luxury-gold' : 'hover:bg-white/10'}`}
          >
            <Layout size={18} /> <span className="font-bold text-sm">Inventory</span>
          </button>
          <button 
            onClick={() => setActiveTab('lifestyle')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'lifestyle' ? 'bg-luxury-gold' : 'hover:bg-white/10'}`}
          >
            <Sun size={18} /> <span className="font-bold text-sm">Lifestyle Content</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-luxury-gold' : 'hover:bg-white/10'}`}
          >
            <Settings size={18} /> <span className="font-bold text-sm">General Settings</span>
          </button>
        </nav>
        <button onClick={onLogout} className="mt-8 pt-8 border-t border-white/10 text-white/50 hover:text-white flex items-center gap-2">
          <LogOut size={16} /> Log Out
        </button>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[800px]">
        {activeTab === 'inventory' && (
           <div className="space-y-8">
              <div className="flex justify-between items-center">
                 <h3 className="text-3xl font-bold serif italic">Property Management</h3>
                 {!isAdding && (
                   <button 
                    onClick={() => { setIsAdding(true); setEditingProperty(null); }}
                    className="bg-lake text-white px-6 py-2 rounded-full font-bold flex items-center gap-2"
                   >
                     <Plus size={18} /> New Listing
                   </button>
                 )}
              </div>

              {isAdding ? (
                 <form onSubmit={handlePropertySubmit} className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200 space-y-6">
                    <div className="flex justify-between items-center mb-4">
                       <h4 className="text-xl font-bold">{editingProperty ? 'Edit Residence' : 'Add Residence'}</h4>
                       <button onClick={() => setIsAdding(false)}><X /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-neutral-400">Title</label>
                          <input className="w-full p-3 border rounded-xl" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-neutral-400">Price (USD)</label>
                          <input type="number" className="w-full p-3 border rounded-xl" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} required />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-neutral-400">Main Image URL</label>
                          <input className="w-full p-3 border rounded-xl" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-neutral-400">Status</label>
                          <select className="w-full p-3 border rounded-xl" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as PropertyStatus})}>
                             <option value="Available">Available</option>
                             <option value="Under Construction">Under Construction</option>
                             <option value="Sold">Sold</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-neutral-400">Bedrooms</label>
                          <input type="number" step="1" className="w-full p-3 border rounded-xl" value={formData.beds} onChange={e => setFormData({...formData, beds: Number(e.target.value)})} />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-neutral-400">Bathrooms</label>
                          <input type="number" step="0.5" className="w-full p-3 border rounded-xl" value={formData.baths} onChange={e => setFormData({...formData, baths: Number(e.target.value)})} />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-neutral-400">SqFt</label>
                          <input type="number" className="w-full p-3 border rounded-xl" value={formData.sqft} onChange={e => setFormData({...formData, sqft: Number(e.target.value)})} />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-neutral-400">Description</label>
                       <textarea className="w-full p-3 border rounded-xl h-32" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <div className="flex justify-end gap-4">
                       <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2 font-bold text-neutral-500">Cancel</button>
                       <button type="submit" className="bg-luxury-gold text-white px-8 py-2 rounded-full font-bold">Save Listing</button>
                    </div>
                 </form>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                   {properties.map(p => (
                      <div key={p.id} className="bg-neutral-50 p-6 rounded-2xl flex items-center justify-between border border-neutral-100">
                         <div className="flex items-center gap-6">
                            <img src={p.image} className="w-20 h-16 object-cover rounded-xl" alt="" />
                            <div>
                               <h4 className="font-bold text-lake">{p.title}</h4>
                               <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">{p.beds} Beds • {p.baths} Baths • {p.status}</p>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <button onClick={() => startEdit(p)} className="p-3 bg-white rounded-xl text-neutral-400 hover:text-lake transition-colors"><Edit2 size={18}/></button>
                            <button onClick={() => onDelete(p.id)} className="p-3 bg-white rounded-xl text-neutral-400 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                         </div>
                      </div>
                   ))}
                </div>
              )}
           </div>
        )}

        {activeTab === 'lifestyle' && (
           <div className="space-y-8">
              <div className="flex justify-between items-center">
                 <h3 className="text-3xl font-bold serif italic">Lifestyle Content</h3>
                 <button onClick={saveSettings} className="bg-lake text-white px-6 py-2 rounded-full font-bold flex items-center gap-2">
                    <Save size={18} /> Save Changes
                 </button>
              </div>
              <div className="grid grid-cols-1 gap-8">
                 <div className="space-y-4 bg-neutral-50 p-8 rounded-3xl border border-neutral-100">
                    <h4 className="font-bold text-neutral-400 uppercase tracking-widest text-xs">Hero Section (Lifestyle Page)</h4>
                    <input 
                      placeholder="Lifestyle Hero Headline" 
                      className="w-full p-4 border rounded-xl" 
                      value={tempSettings.lifestyleHeroHeadline} 
                      onChange={e => setTempSettings({...tempSettings, lifestyleHeroHeadline: e.target.value})} 
                    />
                    <textarea 
                      placeholder="Lifestyle Hero Subheadline" 
                      className="w-full p-4 border rounded-xl h-24" 
                      value={tempSettings.lifestyleHeroSubheadline} 
                      onChange={e => setTempSettings({...tempSettings, lifestyleHeroSubheadline: e.target.value})} 
                    />
                    <input 
                      placeholder="Hero Image URL" 
                      className="w-full p-4 border rounded-xl" 
                      value={tempSettings.lifestyleHeroImage} 
                      onChange={e => setTempSettings({...tempSettings, lifestyleHeroImage: e.target.value})} 
                    />
                 </div>
                 
                 <div className="space-y-4 bg-neutral-50 p-8 rounded-3xl border border-neutral-100">
                    <h4 className="font-bold text-neutral-400 uppercase tracking-widest text-xs">Home Page Teaser</h4>
                    <input 
                      placeholder="Headline" 
                      className="w-full p-4 border rounded-xl" 
                      value={tempSettings.lifestyleHeadline} 
                      onChange={e => setTempSettings({...tempSettings, lifestyleHeadline: e.target.value})} 
                    />
                    <textarea 
                      placeholder="Subheadline" 
                      className="w-full p-4 border rounded-xl" 
                      value={tempSettings.lifestyleSubheadline} 
                      onChange={e => setTempSettings({...tempSettings, lifestyleSubheadline: e.target.value})} 
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <input 
                         placeholder="Quote" 
                         className="p-4 border rounded-xl" 
                         value={tempSettings.lifestyleQuote} 
                         onChange={e => setTempSettings({...tempSettings, lifestyleQuote: e.target.value})} 
                       />
                       <input 
                         placeholder="Quote Author" 
                         className="p-4 border rounded-xl" 
                         value={tempSettings.lifestyleQuoteAuthor} 
                         onChange={e => setTempSettings({...tempSettings, lifestyleQuoteAuthor: e.target.value})} 
                       />
                    </div>
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'settings' && (
           <div className="space-y-8">
              <div className="flex justify-between items-center">
                 <h3 className="text-3xl font-bold serif italic">General Site Settings</h3>
                 <button onClick={saveSettings} className="bg-lake text-white px-6 py-2 rounded-full font-bold flex items-center gap-2">
                    <Save size={18} /> Save Changes
                 </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-neutral-400">Company Name</label>
                    <input className="w-full p-3 border rounded-xl" value={tempSettings.companyName} onChange={e => setTempSettings({...tempSettings, companyName: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-neutral-400">Contact Phone</label>
                    <input className="w-full p-3 border rounded-xl" value={tempSettings.phone} onChange={e => setTempSettings({...tempSettings, phone: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-neutral-400">Home Hero Headline</label>
                    <input className="w-full p-3 border rounded-xl" value={tempSettings.heroHeadline} onChange={e => setTempSettings({...tempSettings, heroHeadline: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-neutral-400">Home Hero Image</label>
                    <input className="w-full p-3 border rounded-xl" value={tempSettings.heroImage} onChange={e => setTempSettings({...tempSettings, heroImage: e.target.value})} />
                 </div>
                 <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase text-neutral-400">Header Scripts (Analytics, Pixel, etc.)</label>
                    <textarea 
                        className="w-full p-3 border rounded-xl h-40 font-mono text-xs text-neutral-600" 
                        value={tempSettings.externalScripts} 
                        onChange={e => setTempSettings({...tempSettings, externalScripts: e.target.value})}
                        placeholder="<!-- Paste your Google Analytics or Facebook Pixel code here -->"
                    />
                    <p className="text-[10px] text-neutral-400">Warning: Valid HTML/JS only. These scripts will be injected into the &lt;head&gt; of your site.</p>
                 </div>
                 
                 {/* Persistence / Export Section */}
                 <div className="col-span-1 md:col-span-2 mt-8 pt-8 border-t border-neutral-100">
                    <div className="bg-neutral-900 text-white p-8 rounded-2xl">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h4 className="text-xl font-bold flex items-center gap-2"><Code size={20} className="text-luxury-gold"/> Developer Data Persistence</h4>
                                <p className="text-neutral-400 text-sm mt-2 max-w-lg">
                                    Since this site runs without a database, changes are saved to your browser's local storage. 
                                    To make your changes permanent for all visitors, copy the code below and replace the content of 
                                    <code className="bg-white/10 px-2 py-0.5 rounded mx-1 text-luxury-gold">constants.tsx</code> in your source code.
                                </p>
                            </div>
                            <button 
                                onClick={handleCopyCode} 
                                className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${copied ? 'bg-green-500 text-white' : 'bg-luxury-gold text-white hover:bg-white hover:text-lake'}`}
                            >
                                {copied ? <><CheckCircle size={18} /> Copied!</> : <><Copy size={18} /> Copy Code</>}
                            </button>
                        </div>
                        <div className="relative">
                            <pre className="bg-black/50 p-6 rounded-xl overflow-x-auto text-xs font-mono text-neutral-300 h-64 border border-white/10">
                                {generatePersistentCode()}
                            </pre>
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};