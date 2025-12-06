import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { mockMovies } from '../utils/mockData'

interface Review {
  id: string
  author: string
  rating: number
  date: string
  content: string
  helpful: number
}

interface SocialLink {
  platform: string
  url: string
  icon: string
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<typeof mockMovies[0] | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<string>('standard')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [showTrailer, setShowTrailer] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'reviews' | 'similar'>('reviews')
  const [selectedSeats, setSelectedSeats] = useState<number>(1)
  const [ticketType, setTicketType] = useState<'adult' | 'child' | 'senior' | 'student'>('adult')

  useEffect(() => {
    try {
      if (id) {
        const foundMovie = mockMovies.find(m => m.id === id)
        setMovie(foundMovie || null)
      }
    } catch (error) {
      console.error('Error loading movie:', error)
      setMovie(null)
    }
  }, [id])

  if (!movie) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Movie Not Found</h1>
            <Link to="/now-showing">
              <Button>Back to Movies</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const formatPrice = (price: number) => `€${price.toFixed(2)}`
  
  const generateShowtimes = () => {
    const times = ['11:00', '13:30', '16:00', '18:30', '21:00', '23:30']
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return { dates, times }
  }

  const mockReviews: Review[] = [
    {
      id: '1',
      author: 'Sarah M.',
      rating: 5,
      date: '2024-03-01',
      content: 'Absolutely stunning visuals and incredible performances. Denis Villeneuve has outdone himself!',
      helpful: 24
    },
    {
      id: '2',
      author: 'John D.',
      rating: 4,
      date: '2024-03-02',
      content: 'Great sequel that lives up to the hype. The world-building is phenomenal.',
      helpful: 18
    },
    {
      id: '3',
      author: 'Emma L.',
      rating: 5,
      date: '2024-03-03',
      content: 'Timothée Chalamet and Zendaya have amazing chemistry. A must-see on the big screen!',
      helpful: 31
    }
  ]

  const getSimilarMovies = () => {
    return mockMovies.filter(m => 
      m.id !== id && 
      m.genres.some(g => movie?.genres.includes(g)) &&
      m.status === movie?.status
    ).slice(0, 3)
  }

  const getTicketPrice = () => {
    const basePrice = selectedFormatInfo?.price || movie?.formats[0].price || 12.50
    const multipliers = { adult: 1, child: 0.7, senior: 0.8, student: 0.8 }
    return basePrice * multipliers[ticketType] * selectedSeats
  }

  const shareMovie = (platform: string) => {
    const url = window.location.href
    const text = `Check out ${movie?.title} at Omniplex!`
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${text} ${url}`, '_blank')
        break
    }
  }

  const { dates, times } = generateShowtimes()

  const selectedFormatInfo = movie.formats.find(f => f.type === selectedFormat)

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section with Backdrop */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-bold text-sm">
                {movie.ageRating}
              </span>
              <div className="flex items-center text-yellow-400">
                <svg className="w-5 h-5 fill-current mr-1" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <span className="font-bold">{movie.rating}</span>
              </div>
              <span className="text-gray-300">{movie.runtime} min</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span key={genre} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/book-tickets" size="lg">
                Book Tickets Now
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => setShowTrailer(true)}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                </svg>
                Watch Trailer
              </Button>
              
              <Button 
                variant="tertiary" 
                size="lg"
                onClick={() => {
                  try {
                    const dropdown = document.getElementById('share-dropdown')
                    if (dropdown) {
                      dropdown.classList.toggle('hidden')
                    }
                  } catch (error) {
                    console.error('Error toggling share dropdown:', error)
                  }
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                </svg>
                Share
              </Button>
              
              <div id="share-dropdown" className="hidden absolute top-full mt-2 bg-gray-800 rounded-lg shadow-xl p-2 z-50">
                <button type="button" onClick={() => shareMovie('facebook')} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded">Facebook</button>
                <button type="button" onClick={() => shareMovie('twitter')} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded">Twitter</button>
                <button type="button" onClick={() => shareMovie('whatsapp')} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded">WhatsApp</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trailer Modal */}
      {showTrailer && movie?.trailer && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={movie.trailer}
                className="w-full h-96 md:h-[500px] rounded-lg"
                allowFullScreen
                title={`${movie.title} Trailer`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Movie Details */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Synopsis */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Synopsis</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{movie.synopsis}</p>
              </div>

              {/* Cast & Crew */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Cast & Crew</h2>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Cast</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {movie.cast.map((member) => (
                      <div key={member.id} className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                          <span className="text-gray-400 text-2xl font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{member.name}</div>
                          <div className="text-gray-400 text-sm">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Crew</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {movie.crew.map((member) => (
                      <div key={member.id} className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                          <span className="text-gray-400 text-2xl font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{member.name}</div>
                          <div className="text-gray-400 text-sm">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Formats */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Available Formats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {movie.formats.map((format) => (
                    <div
                      key={format.type}
                      className={`bg-gray-900 rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                        selectedFormat === format.type
                          ? 'border-yellow-400 bg-gray-800'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedFormat(format.type)}
                    >
                      <h3 className="text-xl font-bold text-white mb-2">{format.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{format.description}</p>
                      <div className="text-yellow-400 font-bold text-lg">{formatPrice(format.price)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Movie Info Card */}
              <div className="bg-gray-900 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Movie Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Runtime</span>
                    <span className="text-white">{movie.runtime} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating</span>
                    <span className="text-white">{movie.ageRating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Release Date</span>
                    <span className="text-white">
                      {new Date(movie.releaseDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Genres</span>
                    <span className="text-white text-right">{movie.genres.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Booking Card */}
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6">
                <h3 className="text-xl font-bold text-black mb-4">Book Tickets</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-black mb-2">Date</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    <option value="">Select Date</option>
                    {dates.map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-black mb-2">Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    disabled={!selectedDate}
                  >
                    <option value="">Select Time</option>
                    {times.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-black font-medium">From</span>
                    <span className="text-black font-bold text-xl">
                      {selectedFormatInfo ? formatPrice(selectedFormatInfo.price) : formatPrice(movie.formats[0].price)}
                    </span>
                  </div>
                </div>

                <Button
                  to="/book-tickets"
                  className="w-full bg-black text-yellow-400 hover:bg-gray-800"
                  disabled={!selectedDate || !selectedTime}
                >
                  Select Seats
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default MovieDetail