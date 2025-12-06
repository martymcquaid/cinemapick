import { supabase } from './supabase'
import type { 
  Film, 
  Cinema, 
  Screen, 
  Showtime, 
  Customer, 
  Booking, 
  Ticket, 
  FoodItem, 
  FoodOrder, 
  Review 
} from '../types'

// Film Services
export const filmService = {
  async getAllFilms() {
    const { data, error } = await supabase
      .from('films')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getFilmById(id: string) {
    const { data, error } = await supabase
      .from('films')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  async getFilmsByStatus(status: 'now-showing' | 'coming-soon') {
    const { data, error } = await supabase
      .from('films')
      .select('*')
      .eq('status', status)
      .order('release_date', { ascending: true })
    return { data, error }
  },

  async searchFilms(query: string) {
    const { data, error } = await supabase
      .from('films')
      .select('*')
      .ilike('title', `%${query}%`)
      .order('title', { ascending: true })
    return { data, error }
  },

  async createFilm(film: Omit<Film, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('films')
      .insert(film)
      .select()
      .single()
    return { data, error }
  }
}

// Cinema Services
export const cinemaService = {
  async getAllCinemas() {
    const { data, error } = await supabase
      .from('cinemas')
      .select('*')
      .order('name', { ascending: true })
    return { data, error }
  },

  async getCinemaById(id: string) {
    const { data, error } = await supabase
      .from('cinemas')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  async getCinemaScreens(cinemaId: string) {
    const { data, error } = await supabase
      .from('screens')
      .select('*')
      .eq('cinema_id', cinemaId)
      .order('screen_number', { ascending: true })
    return { data, error }
  },

  async createCinema(cinema: Omit<Cinema, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('cinemas')
      .insert(cinema)
      .select()
      .single()
    return { data, error }
  }
}

// Showtime Services
export const showtimeService = {
  async getFilmShowtimes(filmId: string, date?: string) {
    let query = supabase
      .from('showtimes')
      .select(`
        *,
        cinemas(name, city),
        screens(screen_number, capacity)
      `)
      .eq('film_id', filmId)
      .order('show_date', { ascending: true })
      .order('show_time', { ascending: true })

    if (date) {
      query = query.eq('show_date', date)
    }

    const { data, error } = await query
    return { data, error }
  },

  async getShowtimeById(id: string) {
    const { data, error } = await supabase
      .from('showtimes')
      .select(`
        *,
        films(*),
        cinemas(*),
        screens(*)
      `)
      .eq('id', id)
      .single()
    return { data, error }
  },

  async createShowtime(showtime: Omit<Showtime, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('showtimes')
      .insert(showtime)
      .select()
      .single()
    return { data, error }
  }
}

// Customer Services
export const customerService = {
  async createCustomer(customer: Omit<Customer, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('customers')
      .insert(customer)
      .select()
      .single()
    return { data, error }
  },

  async getCustomerByEmail(email: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single()
    return { data, error }
  },

  async updateCustomer(id: string, updates: Partial<Customer>) {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  }
}

// Booking Services
export const bookingService = {
  async createBooking(booking: Omit<Booking, 'id' | 'booking_reference' | 'created_at' | 'updated_at'>) {
    // Generate unique booking reference
    const bookingReference = Math.random().toString(36).substring(2, 10).toUpperCase()
    
    const { data, error } = await supabase
      .from('bookings')
      .insert({ ...booking, booking_reference: bookingReference })
      .select()
      .single()
    return { data, error }
  },

  async getBookingByReference(reference: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        customers(first_name, last_name, email),
        showtimes(
          *,
          films(title, poster_url),
          cinemas(name, city, address),
          screens(screen_number)
        )
      `)
      .eq('booking_reference', reference)
      .single()
    return { data, error }
  },

  async getCustomerBookings(customerId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        showtimes(
          *,
          films(title, poster_url),
          cinemas(name, city)
        )
      `)
      .eq('customer_id', customerId)
      .order('booking_date', { ascending: false })
    return { data, error }
  }
}

// Ticket Services
export const ticketService = {
  async createTickets(tickets: Omit<Ticket, 'id' | 'created_at'>[]) {
    const { data, error } = await supabase
      .from('tickets')
      .insert(tickets)
      .select()
    return { data, error }
  },

  async getBookingTickets(bookingId: string) {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('booking_id', bookingId)
      .order('seat_row', { ascending: true })
      .order('seat_number', { ascending: true })
    return { data, error }
  }
}

// Food Services
export const foodService = {
  async getAllFoodItems() {
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .eq('is_available', true)
      .order('category', { ascending: true })
      .order('name', { ascending: true })
    return { data, error }
  },

  async getFoodItemsByCategory(category: string) {
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .eq('category', category)
      .eq('is_available', true)
      .order('name', { ascending: true })
    return { data, error }
  },

  async createFoodOrder(order: Omit<FoodOrder, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('food_orders')
      .insert(order)
      .select()
      .single()
    return { data, error }
  },

  async getBookingFoodOrders(bookingId: string) {
    const { data, error } = await supabase
      .from('food_orders')
      .select(`
        *,
        food_items(name, price)
      `)
      .eq('booking_id', bookingId)
    return { data, error }
  },

  async createFoodItem(item: Omit<FoodItem, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('food_items')
      .insert(item)
      .select()
      .single()
    return { data, error }
  }
}

// Review Services
export const reviewService = {
  async createReview(review: Omit<Review, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single()
    return { data, error }
  },

  async getFilmReviews(filmId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        customers(first_name, last_name)
      `)
      .eq('film_id', filmId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async updateReviewHelpful(reviewId: string, increment: number) {
    const { data, error } = await supabase
      .from('reviews')
      .update({ helpful_count: supabase.rpc('increment', { x: 'helpful_count', y: increment }) })
      .eq('id', reviewId)
      .select()
      .single()
    return { data, error }
  }
}