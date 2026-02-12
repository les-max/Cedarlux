
import { Property, SiteSettings } from './types';

export const DEFAULT_SETTINGS: SiteSettings = {
  logoImage: 'logo.png',
  heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070',
  heroHeadline: 'Crafting Legacies on the Waterfront.',
  heroSubheadline: 'Bespoke architectural masterpieces designed for those who demand the pinnacle of Cedar Creek Lake living.',
  companyName: 'Cedar Lux Properties',
  lifestyleHeroImage: 'https://images.unsplash.com/photo-1526495124232-a02e18491103?auto=format&fit=crop&q=80&w=2070',
  lifestyleHeroHeadline: "Texas' Premier Waterfront Sanctuary",
  lifestyleHeroSubheadline: 'Discover the perfect balance of adrenaline-fueled adventure and serene lakeside tranquility, just 60 minutes from the heart of Dallas.',
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
      description: 'Experience some of the deepest water in Texas. Perfect for high-performance wakeboarding, private sailing excursions, and jet skiing. Our estates include bespoke boat houses designed for rapid deployment.',
      highlights: ['Private Boat Slips', 'Sunset Cruising']
    },
    {
      id: '2',
      icon: 'Flag',
      title: 'Elite Golfing',
      description: 'Home to the prestigious Pinnacle Golf Club and The King’s Creek. Enjoy manicured fairways that trace the shoreline, offering a world-class golfing experience just minutes from your front door.',
      highlights: ['Pro-Shop Services', 'Lakeside Fairways']
    },
    {
      id: '3',
      icon: 'Users',
      title: 'Family Traditions',
      description: 'From the legendary Fourth of July fireworks over the bay to weekend hikes at nearby Purtis Creek State Park. Create memories with family movie nights on the lawn and local Mabank festivals.',
      highlights: ['Local Festivities', 'Nature Trails']
    }
  ],
  localSpots: [
    {
      id: '1',
      category: 'Dining',
      title: "Vetoni's Italian",
      description: 'The pinnacle of local dining. Authentic Italian cuisine in a refined setting, perfect for celebratory dinners.',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070',
      isFeatured: true
    },
    {
      id: '2',
      category: 'Dining',
      title: 'Boondocks',
      description: 'A waterfront favorite for casual sunset cocktails and quality comfort food accessible directly by boat.',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2074',
      isFeatured: false
    },
    {
      id: '3',
      category: 'Shopping',
      title: 'Old Main Street',
      description: 'Explore the historic boutiques in Mabank and Gun Barrel City for curated home decor and local artisan goods.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070',
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
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2090',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=2070'
    ],
    status: 'Available',
    neighborhood: 'Enchanted Isle',
    features: ['Wine Cellar', 'Infinity Pool', 'Private Beach', 'Chef\'s Kitchen']
  },
  {
    id: '2',
    title: 'Sunset Cove Sanctuary',
    price: 2890000,
    beds: 4,
    baths: 4.5,
    sqft: 4800,
    description: 'Rustic elegance meets high-end luxury in this custom timber-frame home. Nestled in a private cove, offering the ultimate in tranquility.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1974'
    ],
    status: 'Under Construction',
    neighborhood: 'Pinnacle Golf Club',
    features: ['Outdoor Kitchen', 'Guest Casita', 'Boat Lift', 'Smart Home System']
  },
  {
    id: '3',
    title: 'Waterfront Modernist',
    price: 4200000,
    beds: 6,
    baths: 7.5,
    sqft: 7500,
    description: 'The pinnacle of luxury in East Texas. This sprawling estate features marble throughout, a private theater, and a master suite that defines opulence.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2090',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2090',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=2070'
    ],
    status: 'Sold',
    neighborhood: 'Long Cove',
    features: ['Home Theater', 'Elevator', 'Putting Green', 'Steam Room']
  }
];

export const CEDAR_CREEK_NEIGHBORHOODS = [
  'Long Cove',
  'Enchanted Isle',
  'Pinnacle Golf Club',
  'Star Harbor',
  'Beacon Hill',
  'Mabank Waterfront',
  'Gun Barrel City Shoreline'
];
