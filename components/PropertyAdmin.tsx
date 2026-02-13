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
    neighborhood: settings.neighborhoods[0] || '',
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

  const addGalleryImage = () => {
    setFormData(prev => ({
      ...prev,
      gallery: [...(prev.gallery || []), '']
    }));
  };

  const updateGalleryImage = (idx: number, val: string) => {
    const newGallery = [...(formData.gallery || [])];
    newGallery[idx] = val;
    setFormData({ ...formData, gallery: newGallery });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-neutral-100 flex flex-col md:flex-row min-h-[800px] w-full max-w-7xl mx-auto">
      <div className="w-full md:w-64 bg-lake p-8 text-white flex flex-col">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-xl font-bold tracking-tighter serif italic">CMS Backend</h2>
        </div>
        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveTab('inventory')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inventory' ? 'bg-luxury-gold' : 'hover:bg-white/10'}`}>
            <Layout size={18} /> <span className="font-bold text-sm">Residences</span>
          </button>
          <button onClick={() => setActiveTab('lifestyle')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'lifestyle' ? 'bg-luxury-gold' : 'hover:bg-white/10'}`}>
            <Sun size={18} /> <span className="font-bold text-sm">Lifestyle</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-luxury-gold' : 'hover:bg-white/10'}`}>
            <Settings size={18} /> <span className="font-bold text-sm">Site Sections</span>
          </button>
        </nav>
        <button onClick={onLogout} className="mt-8 pt-8 border-t border-white/10 text-white/50 hover:text-white flex items-center gap-2">
          <X size={14} /> Log Out
        </button>
      </div>

      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        {activeTab === 'inventory' && (
           <div className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-3xl font-bold">Property Inventory</h3>
                <button onClick={() => { setFormData({ title: '', price: 0, beds: 0, baths: 0, sqft: 0, description: '', image: '', gallery: [], status: 'Available', neighborhood: settings.neighborhoods[0], features: [] }); setEditingProperty(null); setIsAdding(true); }} className="bg-lake text-white px-6 py-2 rounded-full font-bold">+ New Listing</button>
              </div>

              {isAdding && (
                <form onSubmit={handlePropertySubmit} className="bg-neutral-50 p-6 rounded-2xl border mb-8 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Title" className="p-3 border rounded-xl" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                    <input type="number" placeholder="Price" className="p-3 border rounded-xl" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} required />
                    <input placeholder="Image URL" className="p-3 border rounded-xl" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required />
                    <select className="p-3 border rounded-xl" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as PropertyStatus})}>
                      <option value="Available">Available</option>
                      <option value="Under Construction">Under Construction</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-neutral-400 ml-1">Gallery Photos</label>
                    {formData.gallery?.map((img, i) => (
                      <input key={i} placeholder={`Photo URL ${i+1}`} className="w-full p-3 border rounded-xl" value={img} onChange={e => updateGalleryImage(i, e.target.value)} />
                    ))}
                    <button type="button" onClick={addGalleryImage} className="text-xs text-luxury-gold font-bold p-2">+ Add Photo</button>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2 font-bold text-neutral-500">Cancel</button>
                    <button type="submit" className="px-8 py-2 bg-luxury-gold text-white rounded-full font-bold">Save Residence</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 gap-4">
                {properties.map(p => (
                   <div key={p.id} className="p-4 border rounded-2xl flex justify-between items-center bg-white shadow-sm">
                      <div className="flex items-center gap-4">
                        <img src={p.image} className="w-16 h-12 object-cover rounded-lg" />
                        <div>
                          <p className="font-bold text-neutral-800">{p.title}</p>
                          <p className="text-[10px] uppercase font-black text-neutral-400 tracking-wider">{p.neighborhood} • {p.status}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(p)} className="p-2.5 bg-neutral-100 rounded-xl hover:bg-lake hover:text-white transition-all"><Edit2 size={16}/></button>
                        <button onClick={() => { if(confirm('Delete listing?')) onDelete(p.id)}} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                      </div>
                   </div>
                ))}
              </div>
           </div>
        )}
      </div>
    </div>
  );
};