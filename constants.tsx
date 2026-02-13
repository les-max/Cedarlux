import { Property, SiteSettings } from './types';

export const DEFAULT_SETTINGS: SiteSettings = {
  logoImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=100&h=100',
  heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070',
  heroHeadline: 'Crafting Legacies on the Waterfront.',
  heroSubheadline: 'Bespoke architectural masterpieces designed for those who demand the pinnacle of Cedar Creek Lake living.',
  companyName: 'Cedar Lux Properties',
  lifestyleHeroImage: 'https://images.unsplash.com/photo-1526495124232-a02e18491103?auto=format&fit=crop&q=80&w=2070',
  lifestyleHeroHeadline: "Texas' Premier Waterfront Sanctuary",
  lifestyleHeroSubheadline: 'Discover the perfect balance of adrenaline-fueled adventure and serene lakeside tranquility, just 60 minutes from Dallas.',
  lifestyleHeadline: 'Elevate Your Lakeside Living.',
  lifestyleSubheadline: 'Unrivaled access, proximity to Dallas, and turn-key luxury for the discerning homeowner.',
  lifestyleImage: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=2070',
  lifestyleQuote: "It's more than a home; it's a legacy of summer memories.",
  lifestyleQuoteAuthor: "The Thompson Family, Dallas TX",
  activities: [
    {
      id: '1',
      icon: 'Waves',
      title: 'Water Sports',
      description: 'Experience deep water perfect for wakeboarding and private sailing excursions.',
      highlights: ['Private Boat Slips', 'Sunset Cruising']
    }
  ],
  localSpots: [
    {
      id: '1',
      category: 'Dining',
      title: "Vetoni's Italian",
      description: 'Authentic Italian cuisine in a refined setting.',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070',
      isFeatured: true
    }
  ],
  neighborhoods: ['Long Cove', 'Enchanted Isle', 'Pinnacle Club', 'Star Harbor', 'Beacon Hill'],
  phone: '214-555-0199',
  email: 'info@cedarluxproperties.com',
  address: 'Mabank, TX 75147',
  externalScripts: ''
};

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'The Azure Peninsula Estate',
    price: 3450000,
    beds: 5,
    baths: 6.5,
    sqft: 6200,
    description: 'A masterpiece of modern lakefront living. Floor-to-ceiling windows offer 270-degree views of Cedar Creek Lake. Includes a double-decker boat house and infinity edge pool.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070'
    ],
    status: 'Available',
    neighborhood: 'Enchanted Isle',
    features: ['Wine Cellar', 'Infinity Pool', 'Private Beach']
  }
];