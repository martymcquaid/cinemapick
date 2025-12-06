export interface Movie {
  id: string
  title: string
  synopsis: string
  runtime: number
  genres: string[]
  ageRating: string
  releaseDate: string
  poster: string
  backdrop: string
  trailer?: string
  cast: CastMember[]
  crew: CrewMember[]
  formats: MovieFormat[]
  showtimes: Showtime[]
  rating: number
  status: 'now-showing' | 'coming-soon'
}

export interface CastMember {
  id: string
  name: string
  role: string
  image?: string
}

export interface CrewMember {
  id: string
  name: string
  role: string
  image?: string
}

export interface MovieFormat {
  type: 'standard' | 'imax' | 'maxx' | 'vip' | 'recline' | '4dx' | 'dolby'
  name: string
  description: string
  price: number
}

export interface Showtime {
  id: string
  time: string
  date: string
  format: MovieFormat['type']
  screen: number
  availableSeats: number
  totalSeats: number
}

export interface Cinema {
  id: string
  name: string
  address: string
  city: string
  county: string
  phone: string
  email: string
  coordinates: {
    lat: number
    lng: number
  }
  screens: Screen[]
  facilities: Facility[]
  openingHours: OpeningHours
  parking: ParkingInfo
  accessibility: AccessibilityInfo
}

export interface Screen {
  number: number
  capacity: number
  format: MovieFormat['type'][]
  seats: SeatType[]
}

export interface SeatType {
  type: 'standard' | 'vip' | 'recline'
  price: number
  count: number
}

export interface Facility {
  name: string
  available: boolean
  description?: string
}

export interface OpeningHours {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
}

export interface ParkingInfo {
  available: boolean
  free: boolean
  spaces: number
  description: string
}

export interface AccessibilityInfo {
  wheelchairAccess: boolean
  audioDescription: boolean
  subtitles: boolean
  disabledToilets: boolean
  description: string
}

export interface FoodItem {
  id: string
  name: string
  description: string
  price: number
  category: 'snacks' | 'drinks' | 'combos' | 'ice-cream'
  image?: string
  allergens?: string[]
  size?: string[]
}

export interface MembershipTier {
  id: string
  name: string
  price: number
  duration: 'monthly' | 'yearly'
  benefits: string[]
  features: {
    freeTickets: number
    bookingFeeWaived: boolean
    discountPercentage: number
    exclusivePreviews: boolean
    priorityBooking: boolean
  }
}

export interface Booking {
  id: string
  movieId: string
  cinemaId: string
  showtimeId: string
  seats: Seat[]
  tickets: Ticket[]
  foodItems: FoodItem[]
  totalPrice: number
  customerInfo: CustomerInfo
  paymentMethod: string
  status: 'pending' | 'confirmed' | 'cancelled'
  bookingDate: string
}

export interface Seat {
  row: string
  number: number
  type: SeatType['type']
  price: number
  available: boolean
}

export interface Ticket {
  type: 'adult' | 'child' | 'senior' | 'student'
  quantity: number
  price: number
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  postcode: string
}

export interface GiftCard {
  id: string
  amount: number
  code: string
  recipientEmail?: string
  message?: string
  purchaseDate: string
  expiryDate: string
  status: 'active' | 'redeemed' | 'expired'
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  cinemaId: string
  price: number
  category: 'classic' | 'live' | 'special' | 'family'
  image?: string
}