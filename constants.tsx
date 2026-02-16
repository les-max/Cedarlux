import { Property, SiteSettings } from './types';

export const DEFAULT_SETTINGS: SiteSettings = {
  // [ACTION REQUIRED] Replace the URL below with the URL of the image you uploaded
  logoImage: 'https://lesbrownimages.carrd.co/assets/images/image03.png?v=285ff39d$0',
  heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070',
  heroHeadline: 'Crafting Legacies on the Waterfront.',
  heroSubheadline: 'Bespoke architectural masterpieces designed for those who demand the pinnacle of Cedar Creek Lake living.',
  companyName: 'Cedar Lux Properties',
  lifestyleHeroImage: 'https://images.unsplash.com/photo-1526495124232-a02e18491103?auto=format&fit=crop&q=80&w=2070',
  lifestyleHeroHeadline: "Texas' Premier Waterfront Sanctuary",
  lifestyleHeroSubheadline: 'The perfect balance of adrenaline-fueled adventure and serene lakeside tranquility, just 60 minutes from Dallas.',
  lifestyleHeadline: 'Elevate Your Lakeside Living.',
  lifestyleSubheadline: 'Unrivaled access, proximity to Dallas, and turn-key luxury for the discerning homeowner looking for a legacy retreat.',
  lifestyleImage: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=2070',
  lifestyleQuote: "It's more than a home; it's a legacy of summer memories for our children and grandchildren.",
  lifestyleQuoteAuthor: "The Thompson Family, Dallas TX",
  activities: [
    {
      id: '1',
      icon: 'Waves',
      title: 'Water Sports',
      description: 'Experience crystal clear deep water perfect for wakeboarding, surfing, and private sailing excursions.',
      highlights: ['Private Boat Slips', 'Deep Water Access', 'Sunset Cruising']
    },
    {
      id: '2',
      icon: 'Flag',
      title: 'Championship Golf',
      description: 'The Pinnacle Club and Long Cove offer world-class fairways and greens with breathtaking lake views.',
      highlights: ['Pro-Shop Access', 'Member Tournaments', 'Private Lessons']
    },
    {
      id: '3',
      icon: 'Anchor',
      title: 'Private Yachting',
      description: 'Custom-engineered docks designed for high-performance craft and elite social entertainment.',
      highlights: ['Double-Decker Docks', 'Hydro-Lifts', 'Outdoor Kitchens']
    }
  ],
  localSpots: [
    {
      id: '1',
      category: 'Dining',
      title: "Vetoni's Italian",
      description: 'Refined Italian cuisine in a white-tablecloth setting, widely considered the lake\'s premier dining destination.',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070',
      isFeatured: true
    },
    {
      id: '2',
      category: 'Dining',
      title: "The Pinnacle Club",
      description: 'Exclusive member-only dining with panoramic sunset views and a seasonal, Texas-inspired menu.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070',
      isFeatured: true
    },
    {
      id: '3',
      category: 'Shopping',
      title: "Main Street Mabank",
      description: 'High-end boutiques, antique galleries, and artisan shops curated for luxury lake house decor.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070',
      isFeatured: false
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
  },
  {
    id: '2',
    title: 'Modern Limestone Retreat',
    price: 2100000,
    beds: 4,
    baths: 4,
    sqft: 4100,
    description: 'Clean lines meet Texas charm. This custom-built residence features locally sourced limestone and industrial steel accents with private cove access.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=2070',
    gallery: [],
    status: 'Under Construction',
    neighborhood: 'Long Cove',
    features: ['Smart Home', 'Outdoor Firepit', 'Custom Bunk Room']
  }
];