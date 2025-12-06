import { filmService, cinemaService, showtimeService, foodService } from '../lib/database'

// Simple seed data
const sampleFilms = [
  {
    title: 'Dune: Part Two',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    runtime: 166,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    age_rating: '12A',
    release_date: '2024-03-01',
    poster_url: '/images/dune-part-two-poster.jpg',
    backdrop_url: '/images/dune-part-two-backdrop.jpg',
    trailer_url: 'https://www.youtube.com/embed/Way9Dexny3w',
    rating: 8.8,
    status: 'now-showing'
  },
  {
    title: 'Oppenheimer',
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    runtime: 180,
    genres: ['Biography', 'Drama', 'History'],
    age_rating: '15',
    release_date: '2023-07-21',
    poster_url: '/images/oppenheimer-poster.jpg',
    backdrop_url: '/images/oppenheimer-backdrop.jpg',
    trailer_url: 'https://www.youtube.com/embed/uYPbbksJxIg',
    rating: 8.5,
    status: 'now-showing'
  }
]

const sampleCinemas = [
  {
    name: 'Omniplex Dundonald',
    address: 'Sandy Bay Road, Dundonald',
    city: 'Belfast',
    county: 'County Antrim',
    phone: '028 9048 2200',
    email: 'dundonald@omniplex.ie',
    coordinates_lat: 54.5927,
    coordinates_lng: -5.8234
  },
  {
    name: 'Omniplex Newry',
    address: 'Buttercrane Quay, Newry',
    city: 'Newry',
    county: 'County Down',
    phone: '028 3025 9999',
    email: 'newry@omniplex.ie',
    coordinates_lat: 54.1756,
    coordinates_lng: -6.3419
  }
]

const sampleFoodItems = [
  {
    name: 'Popcorn (Sweet)',
    description: 'Freshly popped sweet popcorn',
    price: 4.50,
    category: 'snacks',
    allergens: [],
    sizes: ['Small', 'Medium', 'Large'],
    is_available: true
  },
  {
    name: 'Coca-Cola',
    description: 'Refreshing cola drink',
    price: 3.50,
    category: 'drinks',
    sizes: ['Regular', 'Large'],
    is_available: true
  }
]

// Seed functions
export const seedDatabase = async () => {
  try {
    console.log('🎬 Starting database seeding...')
    
    // Seed Cinemas first
    console.log('🏢 Seeding cinemas...')
    for (const cinema of sampleCinemas) {
      const result = await cinemaService.createCinema(cinema as any)
      if (result.error) {
        console.error(`Error creating cinema ${cinema.name}:`, result.error)
      } else {
        console.log(`✅ Created cinema: ${cinema.name}`)
      }
    }

    // Seed Films
    console.log('🎥 Seeding films...')
    for (const film of sampleFilms) {
      const result = await filmService.createFilm(film as any)
      if (result.error) {
        console.error(`Error creating film ${film.title}:`, result.error)
      } else {
        console.log(`✅ Created film: ${film.title}`)
      }
    }

    // Seed Food Items
    console.log('🍿 Seeding food items...')
    for (const food of sampleFoodItems) {
      const result = await foodService.createFoodItem(food as any)
      if (result.error) {
        console.error(`Error creating food item ${food.name}:`, result.error)
      } else {
        console.log(`✅ Created food item: ${food.name}`)
      }
    }

    console.log('🎉 Database seeding completed!')
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
  }
}

// Create sample showtimes
export const createSampleShowtimes = async () => {
  try {
    console.log('🎬 Creating sample showtimes...')
    
    // Get films and cinemas
    const filmsResult = await filmService.getAllFilms()
    const cinemasResult = await cinemaService.getAllCinemas()
    
    if (!filmsResult.data || !cinemasResult.data) {
      console.error('No films or cinemas found')
      return
    }

    const films = filmsResult.data
    const cinemas = cinemasResult.data

    // Create showtimes for each film at each cinema
    for (const film of films.slice(0, 2)) { // Just first 2 films for demo
      for (const cinema of cinemas) {
        // Create showtimes for next 7 days
        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
          const showDate = new Date()
          showDate.setDate(showDate.getDate() + dayOffset)
          const dateStr = showDate.toISOString().split('T')[0]
          
          // Multiple showtimes per day
          const times = ['11:00', '14:00', '17:00', '20:00']
          
          for (const time of times) {
            const showtimeData = {
              film_id: film.id,
              cinema_id: cinema.id,
              screen_id: cinema.id, // Using cinema.id as placeholder for now
              show_date: dateStr,
              show_time: time,
              format: 'standard',
              base_price: 12.50,
              available_seats: 100,
              total_seats: 120
            }
            
            const result = await showtimeService.createShowtime(showtimeData as any)
            if (result.error) {
              console.error(`Error creating showtime:`, result.error)
            } else {
              console.log(`✅ Created showtime: ${film.title} at ${cinema.name} on ${dateStr} ${time}`)
            }
          }
        }
      }
    }
    
    console.log('🎉 Sample showtimes created!')
    
  } catch (error) {
    console.error('❌ Error creating showtimes:', error)
  }
}