import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CinemaCard from '../components/CinemaCard'
import Button from '../components/Button'
import { mockCinemas } from '../utils/mockData'

const Cinemas: React.FC = () => {
  const [selectedCounty, setSelectedCounty] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  
  const allCounties = Array.from(new Set(mockCinemas.map(cinema => cinema.county)))
  
  const filteredCinemas = mockCinemas.filter(cinema => {
    const countyMatch = selectedCounty === 'all' || cinema.county === selectedCounty
    const searchMatch = searchTerm === '' || 
      cinema.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cinema.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cinema.address.toLowerCase().includes(searchTerm.toLowerCase())
    return countyMatch && searchMatch
  })

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Find Your Cinema</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover your nearest Omniplex cinema across Ireland & Northern Ireland
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search by name, city, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <Button variant="secondary" size="lg">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-gray-900 sticky top-16 z-40 border-b border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex-1 md:flex-initial">
                <label className="block text-sm font-medium text-gray-400 mb-2">County</label>
                <select
                  value={selectedCounty}
                  onChange={(e) => setSelectedCounty(e.target.value)}
                  className="w-full md:w-48 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="all">All Counties</option>
                  {allCounties.map(county => (
                    <option key={county} value={county}>{county}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="text-gray-400">
              {filteredCinemas.length} {filteredCinemas.length === 1 ? 'cinema' : 'cinemas'} found
            </div>
          </div>
        </div>
      </section>

      {/* Cinemas Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {filteredCinemas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCinemas.map((cinema) => (
                <CinemaCard key={cinema.id} cinema={cinema} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 text-xl mb-4">No cinemas found matching your criteria</div>
              <Button onClick={() => { setSelectedCounty('all'); setSearchTerm('') }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Omniplex?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the difference at Ireland's premier cinema chain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">30+ Locations</h3>
              <p className="text-gray-400">Conveniently located across Ireland & Northern Ireland</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Experience</h3>
              <p className="text-gray-400">State-of-the-art screens and luxury seating options</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">MyOmniPass</h3>
              <p className="text-gray-400">Exclusive membership with free tickets and discounts</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Your Next Movie?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Find your nearest cinema and book tickets for the latest blockbusters
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/now-showing" size="lg">
              View Movies
            </Button>
            <Button to="/membership" variant="secondary" size="lg">
              Join MyOmniPass
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Cinemas