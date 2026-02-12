
import React, { useState } from 'react';
import { Property } from '../types';
import { X, Bed, Bath, Move, MapPin, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface PropertyDetailsModalProps {
  property: Property;
  onClose: () => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ property, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image];

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-500">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/20 hover:bg-white/40 text-white md:text-neutral-900 md:bg-neutral-100 md:hover:bg-neutral-200 rounded-full transition-all"
        >
          <X size={24} />
        </button>

        {/* Gallery Section */}
        <div className="relative w-full md:w-3/5 bg-neutral-900 flex flex-col">
          <div className="flex-1 relative group overflow-hidden">
            <img 
              src={images[activeImageIndex]} 
              className="w-full h-full object-cover transition-all duration-700"
              alt={`${property.title} view ${activeImageIndex + 1}`}
            />
            
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all opacity-0 group-hover:opacity-100">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all opacity-0 group-hover:opacity-100">
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-white text-[10px] font-bold tracking-widest uppercase">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="h-24 bg-neutral-800 p-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-24 h-full rounded-lg overflow-hidden transition-all ${activeImageIndex === idx ? 'ring-2 ring-luxury-gold opacity-100 scale-95' : 'opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="Thumbnail" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-white">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-luxury-gold mb-4">
              <MapPin size={16} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{property.neighborhood}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold italic serif mb-4 text-lake">{property.title}</h2>
            <p className="text-3xl font-bold text-luxury-gold">{formatter.format(property.price)}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 py-8 border-y border-neutral-100 mb-8">
            <div className="text-center">
              <div className="flex justify-center mb-2 text-lake"><Bed size={24} /></div>
              <div className="text-xl font-bold">{property.beds}</div>
              <div className="text-[10px] uppercase font-black tracking-widest text-neutral-400">Bedrooms</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2 text-lake"><Bath size={24} /></div>
              <div className="text-xl font-bold">{property.baths}</div>
              <div className="text-[10px] uppercase font-black tracking-widest text-neutral-400">Bathrooms</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2 text-lake"><Move size={24} /></div>
              <div className="text-xl font-bold">{property.sqft.toLocaleString()}</div>
              <div className="text-[10px] uppercase font-black tracking-widest text-neutral-400">Sq Ft</div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-300 mb-4">Architectural Vision</h4>
              <p className="text-neutral-500 leading-relaxed font-light text-lg">
                {property.description}
              </p>
            </div>

            {property.features && property.features.length > 0 && (
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-300 mb-4">Premium Features</h4>
                <div className="grid grid-cols-2 gap-4">
                  {property.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-neutral-600">
                      <div className="w-5 h-5 bg-neutral-50 rounded-full flex items-center justify-center border border-neutral-100">
                        <Check size={12} className="text-luxury-gold" />
                      </div>
                      <span className="text-sm font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8">
              <button className="w-full py-5 bg-lake text-white font-black rounded-2xl hover:bg-neutral-800 shadow-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3">
                Inquire About This Residence
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
