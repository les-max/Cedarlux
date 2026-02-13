
import React, { useState } from 'react';
import { Property } from '../types.ts';
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-neutral-100 rounded-full"><X size={24} /></button>
        <div className="relative w-full md:w-3/5 bg-neutral-900 overflow-hidden">
            <img src={images[activeImageIndex]} className="w-full h-full object-cover" alt={property.title} />
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 p-2 bg-black/20 rounded-full text-white"><ChevronLeft/></button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 p-2 bg-black/20 rounded-full text-white"><ChevronRight/></button>
              </>
            )}
        </div>
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <h2 className="text-4xl font-bold serif mb-4">{property.title}</h2>
          <p className="text-3xl font-bold text-luxury-gold mb-8">{formatter.format(property.price)}</p>
          <div className="grid grid-cols-3 gap-6 py-8 border-y mb-8">
            <div className="text-center"><Bed size={24} className="mx-auto mb-1"/> {property.beds} Beds</div>
            <div className="text-center"><Bath size={24} className="mx-auto mb-1"/> {property.baths} Baths</div>
            <div className="text-center"><Move size={24} className="mx-auto mb-1"/> {property.sqft} SqFt</div>
          </div>
          <p className="text-neutral-500 leading-relaxed">{property.description}</p>
        </div>
      </div>
    </div>
  );
};
