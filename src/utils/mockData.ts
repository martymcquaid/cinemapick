import { Movie, Cinema, FoodItem, MembershipTier, GiftCard, Event } from '../types'

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Dune: Part Two',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
    runtime: 166,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    ageRating: '12A',
    releaseDate: '2024-03-01',
    poster: '/images/dune-part-two-poster.jpg',
    backdrop: '/images/dune-part-two-backdrop.jpg',
    trailer: 'https://www.youtube.com/embed/Way9Dexny3w',
    cast: [
      { id: '1', name: 'Timothée Chalamet', role: 'Paul Atreides' },
      { id: '2', name: 'Zendaya', role: 'Chani' },
      { id: '3', name: 'Rebecca Ferguson', role: 'Lady Jessica' },
      { id: '4', name: 'Josh Brolin', role: 'Gurney Halleck' }
    ],
    crew: [
      { id: '1', name: 'Denis Villeneuve', role: 'Director' },
      { id: '2', name: 'Hans Zimmer', role: 'Composer' }
    ],
    formats: [
      { type: 'standard', name: 'Standard', description: 'Regular screening', price: 12.50 },
      { type: 'imax', name: 'IMAX', description: 'Immersive large format', price: 18.50 },
      { type: 'maxx', name: 'MAXX', description: 'Premium large format', price: 16.50 }
    ],
    showtimes: [],
    rating: 8.8,
    status: 'now-showing'
  },
  {
    id: '2',
    title: 'Oppenheimer',
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    runtime: 180,
    genres: ['Biography', 'Drama', 'History'],
    ageRating: '15',
    releaseDate: '2023-07-21',
    poster: '/images/oppenheimer-poster.jpg',
    backdrop: '/images/oppenheimer-backdrop.jpg',
    trailer: 'https://www.youtube.com/embed/uYPbbksJxIg',
    cast: [
      { id: '1', name: 'Cillian Murphy', role: 'J. Robert Oppenheimer' },
      { id: '2', name: 'Emily Blunt', role: 'Katherine Oppenheimer' },
      { id: '3', name: 'Matt Damon', role: 'Leslie Groves' },
      { id: '4', name: 'Robert Downey Jr.', role: 'Lewis Strauss' }
    ],
    crew: [
      { id: '1', name: 'Christopher Nolan', role: 'Director' },
      { id: '2', name: 'Ludwig Göransson', role: 'Composer' }
    ],
    formats: [
      { type: 'standard', name: 'Standard', description: 'Regular screening', price: 12.50 },
      { type: 'imax', name: 'IMAX 70mm', description: '70mm IMAX film', price: 19.50 },
      { type: 'maxx', name: 'MAXX', description: 'Premium large format', price: 16.50 }
    ],
    showtimes: [],
    rating: 8.5,
    status: 'now-showing'
  },
  {
    id: '3',
    title: 'The Marvels',
    synopsis: 'Carol Danvers, aka Captain Marvel, has reclaimed her identity from the tyrannical Kree and taken revenge on the Supreme Intelligence. But unintended consequences see her shouldering the burden of a destabilized universe.',
    runtime: 105,
    genres: ['Action', 'Adventure', 'Fantasy'],
    ageRating: '12A',
    releaseDate: '2023-11-10',
    poster: '/images/the-marvels-poster.jpg',
    backdrop: '/images/the-marvels-backdrop.jpg',
    trailer: 'https://www.youtube.com/embed/wS_qbDztgVY',
    cast: [
      { id: '1', name: 'Brie Larson', role: 'Carol Danvers' },
      { id: '2', name: 'Teyonah Parris', role: 'Monica Rambeau' },
      { id: '3', name: 'Iman Vellani', role: 'Kamala Khan' },
      { id: '4', name: 'Samuel L. Jackson', role: 'Nick Fury' }
    ],
    crew: [
      { id: '1', name: 'Nia DaCosta', role: 'Director' }
    ],
    formats: [
      { type: 'standard', name: 'Standard', description: 'Regular screening', price: 12.50 },
      { type: 'imax', name: 'IMAX', description: 'Immersive large format', price: 18.50 },
      { type: '4dx', name: '4DX', description: 'Multi-sensory experience', price: 20.50 }
    ],
    showtimes: [],
    rating: 6.8,
    status: 'now-showing'
  },
  {
    id: '4',
    title: 'Godzilla x Kong: The New Empire',
    synopsis: 'Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island\'s mysteries.',
    runtime: 115,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    ageRating: '12A',
    releaseDate: '2024-03-29',
    poster: '/images/godzilla-kong-poster.jpg',
    backdrop: '/images/godzilla-kong-backdrop.jpg',
    trailer: 'https://www.youtube.com/embed/qZkJl8BhA_8',
    cast: [
      { id: '1', name: 'Rebecca Hall', role: 'Dr. Ilene Andrews' },
      { id: '2', name: 'Brian Tyree Henry', role: 'Bernie Hayes' },
      { id: '3', name: 'Dan Stevens', role: 'Trapper' },
      { id: '4', name: 'Kaylee Hottle', role: 'Jia' }
    ],
    crew: [
      { id: '1', name: 'Adam Wingard', role: 'Director' }
    ],
    formats: [
      { type: 'standard', name: 'Standard', description: 'Regular screening', price: 12.50 },
      { type: 'imax', name: 'IMAX', description: 'Immersive large format', price: 18.50 },
      { type: '4dx', name: '4DX', description: 'Multi-sensory experience', price: 20.50 }
    ],
    showtimes: [],
    rating: 7.2,
    status: 'coming-soon'
  },
  {
    id: '5',
    title: 'Ghostbusters: Frozen Empire',
    synopsis: 'The Spengler family returns to where it all started – the iconic New York City firehouse – to team up with the original Ghostbusters, who\'ve developed a top-secret research lab to take busting ghosts to the next level.',
    runtime: 115,
    genres: ['Comedy', 'Fantasy', 'Adventure'],
    ageRating: 'PG',
    releaseDate: '2024-03-22',
    poster: '/images/ghostbusters-frozen-empire-poster.jpg',
    backdrop: '/images/ghostbusters-frozen-empire-backdrop.jpg',
    trailer: 'https://www.youtube.com/embed/dkF1xLj4s5w',
    cast: [
      { id: '1', name: 'Paul Rudd', role: 'Gary Grooberson' },
      { id: '2', name: 'Carrie Coon', role: 'Callie Spengler' },
      { id: '3', name: 'Finn Wolfhard', role: 'Trevor Spengler' },
      { id: '4', name: 'McKenna Grace', role: 'Phoebe Spengler' }
    ],
    crew: [
      { id: '1', name: 'Gil Kenan', role: 'Director' }
    ],
    formats: [
      { type: 'standard', name: 'Standard', description: 'Regular screening', price: 12.50 },
      { type: 'maxx', name: 'MAXX', description: 'Premium large format', price: 16.50 }
    ],
    showtimes: [],
    rating: 7.5,
    status: 'coming-soon'
  }
]

export const mockCinemas: Cinema[] = [
  {
    id: '1',
    name: 'Omniplex Dundonald',
    address: 'Sandy Bay Road, Dundonald',
    city: 'Belfast',
    county: 'County Antrim',
    phone: '028 9048 2200',
    email: 'dundonald@omniplex.ie',
    coordinates: { lat: 54.5927, lng: -5.8234 },
    screens: [
      {
        number: 1,
        capacity: 350,
        format: ['imax', 'maxx', 'standard'],
        seats: [
          { type: 'standard', price: 12.50, count: 250 },
          { type: 'recline', price: 16.50, count: 80 },
          { type: 'vip', price: 22.50, count: 20 }
        ]
      },
      {
        number: 2,
        capacity: 200,
        format: ['maxx', 'standard'],
        seats: [
          { type: 'standard', price: 12.50, count: 150 },
          { type: 'recline', price: 16.50, count: 50 }
        ]
      },
      {
        number: 3,
        capacity: 150,
        format: ['standard'],
        seats: [
          { type: 'standard', price: 12.50, count: 150 }
        ]
      }
    ],
    facilities: [
      { name: 'ATM', available: true },
      { name: 'Restaurant', available: true, description: 'Ben & Jerry\'s' },
      { name: 'Games Room', available: true },
      { name: 'Party Rooms', available: true },
      { name: 'Disabled Access', available: true },
      { name: 'Infant Changing', available: true }
    ],
    openingHours: {
      monday: '11:30 - 23:00',
      tuesday: '11:30 - 23:00',
      wednesday: '11:30 - 23:00',
      thursday: '11:30 - 23:00',
      friday: '11:30 - 23:30',
      saturday: '11:00 - 23:30',
      sunday: '11:00 - 23:00'
    },
    parking: {
      available: true,
      free: true,
      spaces: 500,
      description: 'Free parking available on site'
    },
    accessibility: {
      wheelchairAccess: true,
      audioDescription: true,
      subtitles: true,
      disabledToilets: true,
      description: 'Full wheelchair access and disabled facilities available'
    }
  },
  {
    id: '2',
    name: 'Omniplex Newry',
    address: 'Buttercrane Quay, Newry',
    city: 'Newry',
    county: 'County Down',
    phone: '028 3025 9999',
    email: 'newry@omniplex.ie',
    coordinates: { lat: 54.1756, lng: -6.3419 },
    screens: [
      {
        number: 1,
        capacity: 280,
        format: ['maxx', 'standard'],
        seats: [
          { type: 'standard', price: 12.50, count: 200 },
          { type: 'recline', price: 16.50, count: 80 }
        ]
      },
      {
        number: 2,
        capacity: 180,
        format: ['standard'],
        seats: [
          { type: 'standard', price: 12.50, count: 180 }
        ]
      }
    ],
    facilities: [
      { name: 'ATM', available: true },
      { name: 'Restaurant', available: true, description: 'Ben & Jerry\'s' },
      { name: 'Games Room', available: true },
      { name: 'Disabled Access', available: true },
      { name: 'Infant Changing', available: true }
    ],
    openingHours: {
      monday: '12:00 - 22:30',
      tuesday: '12:00 - 22:30',
      wednesday: '12:00 - 22:30',
      thursday: '12:00 - 22:30',
      friday: '12:00 - 23:00',
      saturday: '11:30 - 23:00',
      sunday: '11:30 - 22:30'
    },
    parking: {
      available: true,
      free: true,
      spaces: 300,
      description: 'Free parking available in Buttercrane Centre'
    },
    accessibility: {
      wheelchairAccess: true,
      audioDescription: true,
      subtitles: true,
      disabledToilets: true,
      description: 'Full wheelchair access and disabled facilities available'
    }
  }
]

export const mockFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Popcorn (Sweet)',
    description: 'Freshly popped sweet popcorn',
    price: 4.50,
    category: 'snacks',
    size: ['Small', 'Medium', 'Large'],
    allergens: []
  },
  {
    id: '2',
    name: 'Popcorn (Salted)',
    description: 'Freshly popped salted popcorn',
    price: 4.50,
    category: 'snacks',
    size: ['Small', 'Medium', 'Large'],
    allergens: []
  },
  {
    id: '3',
    name: 'Nachos',
    description: 'Crispy tortilla chips with cheese sauce and jalapeños',
    price: 6.50,
    category: 'snacks',
    allergens: ['Dairy', 'Gluten']
  },
  {
    id: '4',
    name: 'Hot Dog',
    description: 'Classic beef hot dog with ketchup and mustard',
    price: 5.50,
    category: 'snacks',
    allergens: ['Gluten']
  },
  {
    id: '5',
    name: 'Coca-Cola',
    description: 'Refreshing cola drink',
    price: 3.50,
    category: 'drinks',
    size: ['Regular', 'Large']
  },
  {
    id: '6',
    name: 'Orange Juice',
    description: 'Fresh orange juice',
    price: 3.00,
    category: 'drinks',
    size: ['Regular', 'Large']
  },
  {
    id: '7',
    name: 'Family Combo',
    description: '2 large popcorns, 4 drinks, 2 hot dogs, 1 nachos',
    price: 35.00,
    category: 'combos',
    allergens: ['Dairy', 'Gluten']
  },
  {
    id: '8',
    name: 'Ben & Jerry\'s Ice Cream',
    description: 'Premium ice cream in various flavors',
    price: 4.50,
    category: 'ice-cream',
    allergens: ['Dairy']
  }
]

export const mockMembershipTiers: MembershipTier[] = [
  {
    id: '1',
    name: 'MyOmniPass',
    price: 15.99,
    duration: 'monthly',
    benefits: [
      '1 free movie ticket per month',
      'No booking fees',
      '10% discount on food & drink',
      'Exclusive preview screenings',
      'Priority booking for new releases'
    ],
    features: {
      freeTickets: 1,
      bookingFeeWaived: true,
      discountPercentage: 10,
      exclusivePreviews: true,
      priorityBooking: true
    }
  },
  {
    id: '2',
    name: 'MyOmniPass Premium',
    price: 19.99,
    duration: 'monthly',
    benefits: [
      '2 free movie tickets per month',
      'No booking fees',
      '15% discount on food & drink',
      'Exclusive preview screenings',
      'Priority booking for new releases',
      'Free large popcorn per visit'
    ],
    features: {
      freeTickets: 2,
      bookingFeeWaived: true,
      discountPercentage: 15,
      exclusivePreviews: true,
      priorityBooking: true
    }
  }
]

export const mockGiftCards: GiftCard[] = [
  {
    id: '1',
    amount: 25,
    code: 'OMNI25-123456',
    purchaseDate: '2024-01-15',
    expiryDate: '2025-01-15',
    status: 'active'
  },
  {
    id: '2',
    amount: 50,
    code: 'OMNI50-789012',
    purchaseDate: '2024-01-10',
    expiryDate: '2025-01-10',
    status: 'active'
  }
]

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Classic Cinema: The Godfather',
    description: 'Experience Coppola\'s masterpiece on the big screen',
    date: '2024-03-15',
    time: '19:30',
    cinemaId: '1',
    price: 10.00,
    category: 'classic'
  },
  {
    id: '2',
    title: 'NT Live: Hamlet',
    description: 'Royal Shakespeare Company\'s acclaimed production',
    date: '2024-03-20',
    time: '19:00',
    cinemaId: '1',
    price: 18.00,
    category: 'live'
  },
  {
    id: '3',
    title: 'Family Club: The Little Mermaid',
    description: 'Weekend family fun with Disney classic',
    date: '2024-03-16',
    time: '11:00',
    cinemaId: '2',
    price: 5.00,
    category: 'family'
  }
]