import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { mockMovies } from '../utils/mockData'

const ComingSoon: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [selectedMonth, setSelectedMonth] = useState<string>('all')
  
  const comingSoonMovies = mockMovies.filter(movie => movie.status === 'coming-soon')
  
  const allGenres = Array.from(new Set(comingSoonMovies.flatMap(movie => movie.genres)))
  const allMonths = Array.from(new Set(comingSoonMovies.map(movie => {
    const date = new Date(movie.releaseDate)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  })))
  
  const filteredMovies = comingSoonMovies.filter(movie => {
    const genreMatch = selectedGenre === 'all' || movie.genres.includes(selectedGenre)
    const monthMatch = selectedMonth === 'all' || 
      new Date(movie.releaseDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) === selectedMonth
    return genreMatch && monthMatch
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getDaysUntilRelease = (dateString: string) => {
    const today = new Date()
    const releaseDate = new Date(dateString)
    const diffTime = releaseDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Coming Soon</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get ready for the most anticipated releases coming to Omniplex Cinemas
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-gray-900 sticky top-16 z-40 border-b border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex-1 md:flex-initial">
                <label className="block text-sm font-medium text-gray-400 mb-2">Genre</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full md:w-48 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="all">All Genres</option>
                  {allGenres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1 md:flex-initial">
                <label className="block text-sm font-medium text-gray-400 mb-2">Release Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full md:w-48 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="all">All Months</option>
                  {allMonths.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="text-gray-400">
              {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'} found
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMovies.map((movie) => (
                <div key={movie.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    {/* Movie Poster */}
                    <div className="aspect-[2/3] relative">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Release Date Badge */}
                      <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-yellow-400 px-3 py-2 rounded-lg">
                        <div className="text-xs font-semibold">RELEASES</div>
                        <div className="text-sm font-bold">
                          {getDaysUntilRelease(movie.releaseDate)} days
                        </div>
                      </div>

                      {/* Age Rating */}
                      <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-lg">
                        <span className="text-sm font-bold">{movie.ageRating}</span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {movie.genres.slice(0, 2).map((genre) => (
                              <span key={genre} className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-semibold">
                                {genre}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-300 text-sm line-clamp-2 mb-3">{movie.synopsis}</p>
                          <div className="text-yellow-400 text-sm font-semibold mb-2">
                            {formatDate(movie.releaseDate)}
                          </div>
                          <Button size="sm" className="w-full">
                            Set Reminder
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Movie Info (always visible) */}
                    <div className="p-4">
                      <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">{movie.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400 font-semibold text-sm">
                          {formatDate(movie.releaseDate)}
                        </span>
                        <span className="text-gray-400 text-sm">{movie.runtime} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 text-xl mb-4">No movies found matching your filters</div>
              <Button onClick={() => { setSelectedGenre('all'); setSelectedMonth('all') }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-gray-400 text-lg mb-8">
              Be the first to know about new releases, special screenings, and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <Button size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want to watch something now?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Check out our current selection of blockbuster movies playing now at Omniplex Cinemas
          </p>
          <Button to="/now-showing" size="lg">
            View Now Showing
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ComingSoon