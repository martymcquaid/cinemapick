import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'
import Button from '../components/Button'
import { mockMovies } from '../utils/mockData'

const NowShowing: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [selectedFormat, setSelectedFormat] = useState<string>('all')
  
  const nowShowingMovies = mockMovies.filter(movie => movie.status === 'now-showing')
  
  const allGenres = Array.from(new Set(nowShowingMovies.flatMap(movie => movie.genres)))
  const allFormats = Array.from(new Set(nowShowingMovies.flatMap(movie => movie.formats.map(f => f.type))))
  
  const filteredMovies = nowShowingMovies.filter(movie => {
    const genreMatch = selectedGenre === 'all' || movie.genres.includes(selectedGenre)
    const formatMatch = selectedFormat === 'all' || movie.formats.some(f => f.type === selectedFormat)
    return genreMatch && formatMatch
  })

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Now Showing</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the latest blockbusters and critically acclaimed films at Omniplex Cinemas
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
                <label className="block text-sm font-medium text-gray-400 mb-2">Format</label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full md:w-48 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="all">All Formats</option>
                  {allFormats.map(format => (
                    <option key={format} value={format}>
                      {format.charAt(0).toUpperCase() + format.slice(1)}
                    </option>
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
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 text-xl mb-4">No movies found matching your filters</div>
              <Button onClick={() => { setSelectedGenre('all'); setSelectedFormat('all') }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Check out our upcoming releases or sign up for MyOmniPass to get exclusive early access to new films
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/coming-soon" variant="secondary" size="lg">
              Coming Soon
            </Button>
            <Button to="/membership" size="lg">
              Join MyOmniPass
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default NowShowing