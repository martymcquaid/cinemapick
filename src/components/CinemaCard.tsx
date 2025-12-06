import React from 'react'
import { Link } from 'react-router-dom'
import { Cinema } from '../types'

interface CinemaCardProps {
  cinema: Cinema
  className?: string
}

const CinemaCard: React.FC<CinemaCardProps> = ({ cinema, className = '' }) => {
  return (
    <Link to={`/cinema/${cinema.id}`} className={`block ${className}`}>
      <div className="bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
        {/* Cinema Image Placeholder */}
        <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                </svg>
              </div>
              <p className="text-gray-400 text-sm">Cinema Image</p>
            </div>
          </div>
          
          {/* Screen Count Badge */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-yellow-400 px-3 py-1 rounded-lg">
            <span className="text-sm font-semibold">{cinema.screens.length} Screens</span>
          </div>
        </div>

        {/* Cinema Info */}
        <div className="p-6">
          <h3 className="text-white font-bold text-xl mb-2">{cinema.name}</h3>
          <p className="text-gray-400 mb-4">{cinema.address}, {cinema.city}</p>
          
          {/* Facilities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {cinema.facilities.slice(0, 4).map((facility) => (
              facility.available && (
                <span key={facility.name} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {facility.name}
                </span>
              )
            ))}
          </div>

          {/* Key Features */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-400">
              <svg className="w-4 h-4 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              {cinema.city}, {cinema.county}
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <svg className="w-4 h-4 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              {cinema.phone}
            </div>
            {cinema.parking.available && (
              <div className="flex items-center text-sm text-gray-400">
                <svg className="w-4 h-4 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                </svg>
                {cinema.parking.free ? 'Free Parking' : 'Parking Available'}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 font-semibold">View Details</span>
            <svg className="w-5 h-5 text-yellow-400 transform group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CinemaCard