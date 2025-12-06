import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-black shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">O</span>
            </div>
            <span className="text-white font-bold text-xl">Omniplex</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/now-showing" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
              Now Showing
            </Link>
            <Link to="/coming-soon" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
              Coming Soon
            </Link>
            <Link to="/cinemas" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
              Cinemas
            </Link>
            <Link to="/food-drink" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
              Food & Drink
            </Link>
            <Link to="/membership" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
              MyOmniPass
            </Link>
            <Link to="/gift-cards" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
              Gift Cards
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link to="/book-tickets" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Book Tickets
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-300 hover:text-yellow-400 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <nav className="flex flex-col space-y-4 py-4">
              <Link
                to="/now-showing"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Now Showing
              </Link>
              <Link
                to="/coming-soon"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Coming Soon
              </Link>
              <Link
                to="/cinemas"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cinemas
              </Link>
              <Link
                to="/food-drink"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Food & Drink
              </Link>
              <Link
                to="/membership"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                MyOmniPass
              </Link>
              <Link
                to="/gift-cards"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gift Cards
              </Link>
              <div className="px-4 pt-2">
                <Link
                  to="/book-tickets"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl block text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Tickets
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header