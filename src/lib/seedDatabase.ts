import { filmService, cinemaService, showtimeService, foodService } from '../lib/database'
import { mockMovies, mockCinemas, mockFoodItems } from '../utils/mockData'

// Convert mock data to database format
const convertMockFilmToDB = (mockMovie: any) => ({
  title: mockMovie.title,
  synopsis: mockMovie.synopsis,
  runtime: mockMovie.runtime,
  genres: mockMovie.genres,
  age_rating: mockMovie.ageRating,
  release_date: mockMovie.releaseDate,
  poster_url: mockMovie.poster,
  backdrop_url: mockMovie.backdrop,
  trailer_url: mockMovie.trailer,
  rating: mockMovie.rating,
  status: mockMovie.status
})

const convertMockCinemaToDB = (mockCinema: any) => ({
  name: mockCinema.name,
  address: mockCinema.address,
  city: mockCinema.city,
  county: mockCinema.county,
  phone: mockCinema.phone,
  email: mockCinema.email,
  coordinates_lat: mockCinema.coordinates.lat,
  coordinates_lng: mockCinema.coordinates.lng
})

const convertMockFoodToDB = (mockFood: any) => ({
  name: mockFood.name,
  description: mockFood.description,
  price: mockFood.price,
  category: mockFood.category,
  allergens: mockFood.allergens || [],
  sizes: mockFood.size || [],
  is_available: true
})

// Seed functions
export const seedDatabase = async () => {
  try {
    console.log('🎬 Starting database seeding...')
    
    // Seed Cinemas first
    console.log('🏢 Seeding cinemas...')
    for (const mockCinema of mockCinemas) {
      const cinemaData = convertMockCinemaToDB(mockCinema)
      const { data, error } = await cinemaService.createCinema(cinemaData)
      if (error) {
        console.error(`Error creating cinema ${mockCinema.name}:`, error)
      } else {
        console.log(`✅ Created cinema: ${mockCinema.name}`)
      }
    }

    // Seed Films
    console.log('🎥 Seeding films...')
    for (const mockMovie of mockMovies) {
      const filmData = convertMockFilmToDB(mockMovie)
      const { data, error } = await filmService.createFilm(filmData)
      if (error) {
        console.error(`Error creating film ${mockMovie.title}:`, error)
      } else {
        console.log(`✅ Created film: ${mockMovie.title}`)
      }
    }

    // Seed Food Items
    console.log('🍿 Seeding food items...')
    for (const mockFood of mockFoodItems) {
      const foodData = convertMockFoodToDB(mockFood)
      const { data, error } = await foodService.createFoodOrder(foodData as any)
      if (error) {
        console.error(`Error creating food item ${mockFood.name}:`, error)
      } else {
        console.log(`✅ Created food item: ${mockFood.name}`)
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
    const { data: films } = await filmService.getAllFilms()
    const { data: cinemas } = await cinemaService.getAllCinemas()
    
    if (!films || !cinemas) {
      console.error('No films or cinemas found')
      return
    }

    // Create showtimes for each film at each cinema
    for (const film of films.slice(0, 3)) { // Just first 3 films for demo
      for (const cinema of cinemas) {
        // Create showtimes for next 7 days
        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
          const showDate = new Date()
          showDate.setDate(showDate.getDate() + dayOffset)
          const dateStr = showDate.toISOString().split('T')[0]
          
          // Multiple showtimes per day
          const times = ['11:00', '14:00', '17:00', '20:00', '23:00']
          
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
            
            const { data, error } = await showtimeService.createShowtime(showtimeData)
            if (error) {
              console.error(`Error creating showtime:`, error)
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