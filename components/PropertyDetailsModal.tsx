import React, { useState } from 'react';
import { Property } from '../types';
import { X, Bed, Bath, Move, ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors">
          <X size={24} />
        </button>
        <div className="relative w-full md:w-3/5 bg-neutral-900 overflow-hidden">
            <img src={images[activeImageIndex]} className="w-full h-full object-cover" alt={property.title} />
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 rounded-full text-white hover:bg-black/50 transition-all">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 rounded-full text-white hover:bg-black/50 transition-all">
                  <ChevronRight size={24} />
                </button>
              </>
            )}
        </div>
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <h2 className="text-4xl font-bold serif mb-4">{property.title}</h2>
          <p className="text-3xl font-bold text-luxury-gold mb-8">{formatter.format(property.price)}</p>
          <div className="grid grid-cols-3 gap-6 py-8 border-y border-neutral-100 mb-8">
            <div className="text-center">
              <Bed size={24} className="mx-auto mb-2 text-neutral-400"/> 
              <span className="font-bold">{property.beds}</span>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400">Beds</p>
            </div>
            <div className="text-center">
              <Bath size={24} className="mx-auto mb-2 text-neutral-400"/> 
              <span className="font-bold">{property.baths}</span>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400">Baths</p>
            </div>
            <div className="text-center">
              <Move size={24} className="mx-auto mb-2 text-neutral-400"/> 
              <span className="font-bold">{property.sqft.toLocaleString()}</span>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400">SqFt</p>
            </div>
          </div>
          <p className="text-neutral-500 leading-relaxed text-lg font-light">{property.description}</p>
        </div>
      </div>
    </div>
  );
};