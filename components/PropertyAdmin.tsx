
import React, { useState } from 'react';
import { Property, PropertyStatus, SiteSettings, Activity, LocalSpot } from '../types';
import { Plus, X, Save, Trash2, Layout, Settings, Image as ImageIcon, Edit2, Phone, MapPin, Quote, Code, Map, Waves, Flag, Users, ShoppingBag, Utensils, Star, Sun, Coffee, Anchor } from 'lucide-react';

interface PropertyAdminProps {
  properties: Property[];
  onAdd: (property: Property) => void;
  onUpdate: (property: Property) => void;
  onDelete: (id: string) => void;
  settings: SiteSettings;
  onUpdateSettings: (settings: SiteSettings) => void;
  onLogout: () => void;
}

const ICON_MAP: Record<string, any> = { Waves, Flag, Users, ShoppingBag, Utensils, Star, Sun, Coffee, Anchor };

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
  const [newNeighborhoodName, setNewNeighborhoodName] = useState('');
  
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    price: 0,
    beds: 0,
    baths: 0,
    sqft: 0,
    description: '',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2070',
    gallery: [],
    status: 'Available',
    neighborhood: settings.neighborhoods[0] || '',
    features: []
  });

  const [tempSettings, setTempSettings] = useState<SiteSettings>(settings);

  const startEdit = (prop: Property) => {
    setEditingProperty(prop);
    setFormData({
      ...prop,
      gallery: prop.gallery || []
    });
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
    setFormData({
      title: '',
      price: 0,
      beds: 0,
      baths: 0,
      sqft: 0,
      description: '',
      image: '',
      gallery: [],
      status: 'Available',
      neighborhood: tempSettings.neighborhoods[0] || '',
      features: []
    });
  };

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(tempSettings);
    alert('Site content updated successfully!');
  };

  const addGalleryImage = () => {
    setFormData({
      ...formData,
      gallery: [...(formData.gallery || []), '']
    });
  };

  const updateGalleryImage = (index: number, value: string) => {
    const newGallery = [...(formData.gallery || [])];
    newGallery[index] = value;
    setFormData({ ...formData, gallery: newGallery });
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = (formData.gallery || []).filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: newGallery });
  };

  const addNeighborhood = () => {
    if (newNeighborhoodName.trim() && !tempSettings.neighborhoods.includes(newNeighborhoodName.trim())) {
      setTempSettings({
        ...tempSettings,
        neighborhoods: [...tempSettings.neighborhoods, newNeighborhoodName.trim()]
      });
      setNewNeighborhoodName('');
    }
  };

  const removeNeighborhood = (name: string) => {
    setTempSettings({
      ...tempSettings,
      neighborhoods: tempSettings.neighborhoods.filter(n => n !== name)
    });
  };

  const addActivity = () => {
    const newAct: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      icon: 'Waves',
      title: 'New Activity',
      description: 'Describe the lifestyle benefit...',
      highlights: ['Feature 1']
    };
    setTempSettings({...tempSettings, activities: [...tempSettings.activities, newAct]});
  };

  const updateActivity = (id: string, updates: Partial<Activity>) => {
    setTempSettings({
      ...tempSettings,
      activities: tempSettings.activities.map(a => a.id === id ? {...a, ...updates} : a)
    });
  };

  const removeActivity = (id: string) => {
    setTempSettings({
      ...tempSettings,
      activities: tempSettings.activities.filter(a => a.id !== id)
    });
  };

  const addLocalSpot = () => {
    const newSpot: LocalSpot = {
      id: Math.random().toString(36).substr(2, 9),
      category: 'Dining',
      title: 'New Spot',
      description: 'The local favorite for...',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7ed9d421bb?auto=format&fit=crop&q=80&w=2070',
      isFeatured: false
    };
    setTempSettings({...tempSettings, localSpots: [...tempSettings.localSpots, newSpot]});
  };

  const updateLocalSpot = (id: string, updates: Partial<LocalSpot>) => {
    setTempSettings({
      ...tempSettings,
      localSpots: tempSettings.localSpots.map(s => s.id === id ? {...s, ...updates} : s)
    });
  };

  const removeLocalSpot = (id: string) => {
    setTempSettings({
      ...tempSettings,
      localSpots: tempSettings.localSpots.filter(s => s.id !== id)
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-neutral-100 flex flex-col md:flex-row min-h-[800px]">
      {/* CMS Sidebar */}
      <div className="w-full md:w-64 bg-lake p-8 text-white flex flex-col">
        <div className="mb-12">
          <h2 className="text-xl font-bold tracking-tighter serif italic">CMS Backend</h2>
          <p className="text-[10px] uppercase tracking-widest text-white/50">Admin Control Panel</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inventory' ? 'bg-luxury-gold text-white' : 'hover:bg-white/10 text-white/70'}`}
          >
            <Layout size={18} />
            <span className="font-bold text-sm">Residences</span>
          </button>
          <button 
            onClick={() => setActiveTab('lifestyle')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'lifestyle' ? 'bg-luxury-gold text-white' : 'hover:bg-white/10 text-white/70'}`}
          >
            <Sun size={18} />
            <span className="font-bold text-sm">Lifestyle Page</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-luxury-gold text-white' : 'hover:bg-white/10 text-white/70'}`}
          >
            <Settings size={18} />
            <span className="font-bold text-sm">Site Sections</span>
          </button>
        </nav>

        <button 
          onClick={onLogout}
          className="mt-auto pt-8 border-t border-white/10 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2"
        >
          <X size={14} /> Log Out
        </button>
      </div>

      {/* CMS Content */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        {activeTab === 'inventory' ? (
          <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-3xl font-bold">Property Inventory</h3>
                <p className="text-neutral-500">Update and manage your luxury listings.</p>
              </div>
              {!isAdding && (
                <button 
                  onClick={() => { setEditingProperty(null); setIsAdding(true); }}
                  className="bg-lake text-white px-6 py-3 rounded-full font-bold hover:bg-neutral-800 transition-all shadow-lg text-sm flex items-center gap-2"
                >
                  <Plus size={18} /> New Listing
                </button>
              )}
            </div>

            {isAdding && (
              <form onSubmit={handlePropertySubmit} className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200 mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-bold">{editingProperty ? 'Edit Residence' : 'Add New Residence'}</h4>
                  <button type="button" onClick={() => { setIsAdding(false); setEditingProperty(null); }} className="text-neutral-400">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Estate Title</label>
                      <input type="text" required className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-luxury-gold outline-none bg-white" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Price ($)</label>
                        <input type="number" required className="w-full p-3 border border-neutral-200 rounded-lg bg-white" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})}/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Neighborhood</label>
                        <select required className="w-full p-3 border border-neutral-200 rounded-lg bg-white" value={formData.neighborhood} onChange={e => setFormData({...formData, neighborhood: e.target.value})}>
                          <option value="" disabled>Select Community</option>
                          {tempSettings.neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div><label className="block text-xs text-neutral-400">Beds</label><input type="number" className="w-full p-3 border rounded-lg bg-white" value={formData.beds} onChange={e => setFormData({...formData, beds: Number(e.target.value)})}/></div>
                      <div><label className="block text-xs text-neutral-400">Baths</label><input type="number" step="0.5" className="w-full p-3 border rounded-lg bg-white" value={formData.baths} onChange={e => setFormData({...formData, baths: Number(e.target.value)})}/></div>
                      <div><label className="block text-xs text-neutral-400">SqFt</label><input type="number" className="w-full p-3 border rounded-lg bg-white" value={formData.sqft} onChange={e => setFormData({...formData, sqft: Number(e.target.value)})}/></div>
                    </div>
                    
                    {/* Gallery Field */}
                    <div className="pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400">Image Gallery (Links)</label>
                        <button type="button" onClick={addGalleryImage} className="text-[10px] font-black text-luxury-gold uppercase flex items-center gap-1"><Plus size={12}/> Add Photo</button>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto p-2 bg-white rounded-lg border border-neutral-200">
                        {(formData.gallery || []).map((link, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input 
                              type="text" 
                              className="flex-1 p-2 border rounded text-xs" 
                              placeholder="Photo URL" 
                              value={link} 
                              onChange={e => updateGalleryImage(idx, e.target.value)}
                            />
                            <button type="button" onClick={() => removeGalleryImage(idx)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                          </div>
                        ))}
                        {(formData.gallery || []).length === 0 && <p className="text-[10px] text-neutral-300 italic py-2 text-center">No additional photos added yet.</p>}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Main Cover Photo URL</label>
                      <input type="text" required className="w-full p-3 border border-neutral-200 rounded-lg bg-white" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})}/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Property Status</label>
                      <select className="w-full p-3 border border-neutral-200 rounded-lg bg-white" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as PropertyStatus})}>
                        <option value="Available">Available</option>
                        <option value="Under Construction">Under Construction</option>
                        <option value="Sold">Sold</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Short Description</label>
                      <textarea className="w-full p-3 border border-neutral-200 rounded-lg h-24 bg-white" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                  <button type="submit" className="px-10 py-3 bg-luxury-gold text-white font-bold rounded-full shadow-lg hover:bg-opacity-90">
                    <Save size={18} className="inline mr-2" /> {editingProperty ? 'Update Listing' : 'Publish Listing'}
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 gap-4">
              {properties.map(prop => (
                <div key={prop.id} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex items-center gap-8 group hover:border-luxury-gold transition-colors">
                  <img src={prop.image} className="w-32 h-20 object-cover rounded-xl" alt="" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-xl">{prop.title}</h4>
                      <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-full ${prop.status === 'Available' ? 'bg-green-100 text-green-700' : prop.status === 'Sold' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{prop.status}</span>
                    </div>
                    <p className="text-neutral-400 text-sm font-medium">{prop.neighborhood} • ${prop.price.toLocaleString()} • {(prop.gallery || []).length + 1} Photos</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(prop)} className="p-3 bg-neutral-100 text-neutral-600 rounded-full hover:bg-lake hover:text-white transition-all"><Edit2 size={16}/></button>
                    <button onClick={() => onDelete(prop.id)} className="p-3 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'lifestyle' ? (
          <form onSubmit={handleSettingsSave} className="animate-in fade-in duration-500 space-y-12 pb-12">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-8">
              <div>
                <h3 className="text-3xl font-bold italic serif text-lake">Lifestyle Experience Manager</h3>
                <p className="text-neutral-500">Customize the activities and dining spots for the Lifestyle page.</p>
              </div>
              <button type="submit" className="bg-lake text-white px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-2 hover:bg-neutral-800 transition-all">
                <Save size={20} /> Deploy Lifestyle Updates
              </button>
            </div>

            {/* Lifestyle Hero */}
            <section className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200">
              <h4 className="flex items-center gap-2 text-xl font-bold mb-6 text-lake"><ImageIcon size={20} /> Lifestyle Hero</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Hero Image URL</label>
                    <input type="text" className="w-full p-3 border rounded-lg bg-white" value={tempSettings.lifestyleHeroImage} onChange={e => setTempSettings({...tempSettings, lifestyleHeroImage: e.target.value})}/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Hero Headline</label>
                    <input type="text" className="w-full p-3 border rounded-lg bg-white" value={tempSettings.lifestyleHeroHeadline} onChange={e => setTempSettings({...tempSettings, lifestyleHeroHeadline: e.target.value})}/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Hero Subheadline</label>
                    <textarea className="w-full p-3 border rounded-lg bg-white h-24" value={tempSettings.lifestyleHeroSubheadline} onChange={e => setTempSettings({...tempSettings, lifestyleHeroSubheadline: e.target.value})}/>
                  </div>
                </div>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-inner border-2 border-white relative">
                  <img src={tempSettings.lifestyleHeroImage} className="w-full h-full object-cover brightness-75" alt="" />
                </div>
              </div>
            </section>

            {/* Activities Manager */}
            <section className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200">
              <div className="flex justify-between items-center mb-6">
                <h4 className="flex items-center gap-2 text-xl font-bold text-lake"><Waves size={20} /> Lifestyle Activities</h4>
                <button type="button" onClick={addActivity} className="text-xs font-bold uppercase tracking-widest text-luxury-gold flex items-center gap-1 hover:text-lake transition-colors">
                  <Plus size={14} /> Add Activity
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {tempSettings.activities.map((act) => (
                  <div key={act.id} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm relative group">
                    <button type="button" onClick={() => removeActivity(act.id)} className="absolute top-4 right-4 text-neutral-300 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <label className="block text-[10px] uppercase font-black text-neutral-400 mb-2">Icon Type</label>
                        <select 
                          className="w-full p-2 border rounded-lg text-sm bg-neutral-50"
                          value={act.icon}
                          onChange={e => updateActivity(act.id, {icon: e.target.value})}
                        >
                          {Object.keys(ICON_MAP).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                      </div>
                      <div className="md:col-span-3 space-y-4">
                        <input 
                          type="text" 
                          className="w-full p-2 border-b font-bold text-lg outline-none focus:border-luxury-gold" 
                          placeholder="Activity Title"
                          value={act.title}
                          onChange={e => updateActivity(act.id, {title: e.target.value})}
                        />
                        <textarea 
                          className="w-full p-2 border rounded-lg text-sm h-20 bg-neutral-50" 
                          placeholder="Activity Description"
                          value={act.description}
                          onChange={e => updateActivity(act.id, {description: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Local Spots Manager */}
            <section className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200">
              <div className="flex justify-between items-center mb-6">
                <h4 className="flex items-center gap-2 text-xl font-bold text-lake"><Utensils size={20} /> Local Spots (Dining & Shopping)</h4>
                <button type="button" onClick={addLocalSpot} className="text-xs font-bold uppercase tracking-widest text-luxury-gold flex items-center gap-1 hover:text-lake transition-colors">
                  <Plus size={14} /> Add Spot
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tempSettings.localSpots.map((spot) => (
                  <div key={spot.id} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm group">
                    <div className="flex justify-between mb-4">
                      <select 
                        className="text-[10px] uppercase font-black bg-lake text-white px-3 py-1 rounded-full outline-none"
                        value={spot.category}
                        onChange={e => updateLocalSpot(spot.id, {category: e.target.value as any})}
                      >
                        <option value="Dining">Dining</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Attraction">Attraction</option>
                      </select>
                      <button type="button" onClick={() => removeLocalSpot(spot.id)} className="text-neutral-200 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <img src={spot.image} className="w-20 h-20 rounded-xl object-cover" alt="" />
                        <div className="flex-1 space-y-2">
                           <input 
                             type="text" 
                             className="w-full p-1 border-b font-bold outline-none" 
                             placeholder="Spot Name"
                             value={spot.title}
                             onChange={updateLocalSpot.bind(null, spot.id, {title: spot.title})}
                             onBlur={e => updateLocalSpot(spot.id, {title: e.target.value})}
                           />
                           <input 
                             type="text" 
                             className="w-full p-1 border rounded text-[10px] bg-neutral-50" 
                             placeholder="Image URL"
                             value={spot.image}
                             onChange={e => updateLocalSpot(spot.id, {image: e.target.value})}
                           />
                        </div>
                      </div>
                      <textarea 
                        className="w-full p-2 border rounded-lg text-sm h-20 bg-neutral-50" 
                        placeholder="Description..."
                        value={spot.description}
                        onChange={e => updateLocalSpot(spot.id, {description: e.target.value})}
                      />
                      <label className="flex items-center gap-2 text-[10px] font-black uppercase text-neutral-400">
                        <input 
                          type="checkbox" 
                          checked={spot.isFeatured}
                          onChange={e => updateLocalSpot(spot.id, {isFeatured: e.target.checked})}
                        />
                        Feature in Hero Grid
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </form>
        ) : (
          <form onSubmit={handleSettingsSave} className="animate-in fade-in duration-500 space-y-12 pb-12">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-8">
              <div>
                <h3 className="text-3xl font-bold italic serif">Site Content Manager</h3>
                <p className="text-neutral-500">Update global imagery, copy, and integrations.</p>
              </div>
              <button type="submit" className="bg-lake text-white px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-2 hover:bg-neutral-800 transition-all">
                <Save size={20} /> Deploy All Changes
              </button>
            </div>

            {/* Neighborhood Manager */}
            <section className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200">
              <h4 className="flex items-center gap-2 text-xl font-bold mb-6 text-lake"><Map size={20} /> Community Manager</h4>
              <p className="text-xs text-neutral-500 mb-6">Manage the preferred communities shown on the home page and available in listing filters.</p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="New Community Name..." 
                    className="flex-1 p-3 border border-neutral-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-luxury-gold"
                    value={newNeighborhoodName}
                    onChange={e => setNewNeighborhoodName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addNeighborhood())}
                  />
                  <button 
                    type="button" 
                    onClick={addNeighborhood}
                    className="bg-luxury-gold text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md hover:brightness-95"
                  >
                    <Plus size={18} /> Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {tempSettings.neighborhoods.length === 0 && (
                    <p className="text-xs italic text-neutral-400">No communities defined. Use the field above to add one.</p>
                  )}
                  {tempSettings.neighborhoods.map((name) => (
                    <div key={name} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-neutral-200 shadow-sm group">
                      <span className="text-sm font-bold text-lake">{name}</span>
                      <button 
                        type="button" 
                        onClick={() => removeNeighborhood(name)}
                        className="text-neutral-300 hover:text-red-500 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Brand Manager */}
            <section className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200">
              <h4 className="flex items-center gap-2 text-xl font-bold mb-6 text-lake"><ImageIcon size={20} /> Brand Identity</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Logo Image URL</label>
                    <input type="text" className="w-full p-3 border rounded-lg bg-white" value={tempSettings.logoImage} onChange={e => setTempSettings({...tempSettings, logoImage: e.target.value})}/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Company Name</label>
                    <input type="text" className="w-full p-3 border rounded-lg bg-white" value={tempSettings.companyName} onChange={e => setTempSettings({...tempSettings, companyName: e.target.value})}/>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-neutral-300 mb-4 tracking-widest">Logo Preview</span>
                  <img src={tempSettings.logoImage} alt="Brand Logo Preview" className="h-20 w-auto object-contain" />
                </div>
              </div>
            </section>

            {/* Home Hero Manager */}
            <section className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200">
              <h4 className="flex items-center gap-2 text-xl font-bold mb-6 text-lake"><ImageIcon size={20} /> Home Hero Section</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Hero Image URL</label>
                    <input type="text" className="w-full p-3 border rounded-lg bg-white" value={tempSettings.heroImage} onChange={e => setTempSettings({...tempSettings, heroImage: e.target.value})}/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Main Headline</label>
                    <input type="text" className="w-full p-3 border rounded-lg bg-white" value={tempSettings.heroHeadline} onChange={e => setTempSettings({...tempSettings, heroHeadline: e.target.value})}/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Subheadline</label>
                    <textarea className="w-full p-3 border rounded-lg bg-white h-24" value={tempSettings.heroSubheadline} onChange={e => setTempSettings({...tempSettings, heroSubheadline: e.target.value})}/>
                  </div>
                </div>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-inner border-2 border-white relative">
                  <img src={tempSettings.heroImage} className="w-full h-full object-cover brightness-75" alt="" />
                </div>
              </div>
            </section>

            {/* Integrations Manager */}
            <section className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200">
              <h4 className="flex items-center gap-2 text-xl font-bold mb-6 text-lake"><Code size={20} /> Integrations & Scripts</h4>
              <div className="space-y-4">
                <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                  Paste your Google Analytics tags, Facebook Pixel, or custom chatbot snippets (e.g., Intercom, Drift) here. 
                </p>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">Custom HTML / Script Block</label>
                  <textarea 
                    className="w-full p-4 border border-neutral-200 rounded-xl bg-neutral-900 text-green-400 font-mono text-xs h-48 focus:ring-2 focus:ring-luxury-gold outline-none" 
                    placeholder="<script>...</script>"
                    value={tempSettings.externalScripts} 
                    onChange={e => setTempSettings({...tempSettings, externalScripts: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Contact & Global Footer */}
            <section className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200">
              <h4 className="flex items-center gap-2 text-xl font-bold mb-6 text-lake"><Phone size={20} /> Contact Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Public Phone</label>
                  <input type="text" className="w-full p-3 border rounded-lg bg-white" value={tempSettings.phone} onChange={e => setTempSettings({...tempSettings, phone: e.target.value})}/>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Public Email</label>
                  <input type="text" className="w-full p-3 border rounded-lg bg-white" value={tempSettings.email} onChange={e => setTempSettings({...tempSettings, email: e.target.value})}/>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Office Address</label>
                <input type="text" className="w-full p-3 border rounded-lg bg-white" value={tempSettings.address} onChange={e => setTempSettings({...tempSettings, address: e.target.value})}/>
              </div>
            </section>
          </form>
        )}
      </div>
    </div>
  );
};
