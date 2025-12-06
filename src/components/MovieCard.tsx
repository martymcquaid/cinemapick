import React from 'react'
import { Link } from 'react-router-dom'
import { Movie } from '../types'

interface MovieCardProps {
  movie: Movie
  className?: string
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, className = '' }) => {
  const formatPrice = (price: number) => `€${price.toFixed(2)}`
  
  return (
    <div className={`group cursor-pointer ${className}`}>
      <Link to={`/movie/${movie.id}`}>
        <div className="relative overflow-hidden rounded-xl bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
          {/* Movie Poster */}
          <div className="aspect-[2/3] relative">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Overlay with rating */}
            <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-yellow-400 px-2 py-1 rounded-lg flex items-center space-x-1">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span className="text-sm font-semibold">{movie.rating}</span>
            </div>

            {/* Age Rating */}
            <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-lg">
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
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-semibold">From {formatPrice(movie.formats[0]?.price || 12.50)}</span>
                  <span className="text-gray-300 text-sm">{movie.runtime} min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Info (always visible) */}
          <div className="p-4">
            <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">{movie.title}</h3>
            <div className="flex items-center justify-between">
              <span className="text-yellow-400 font-semibold">From {formatPrice(movie.formats[0]?.price || 12.50)}</span>
              <span className="text-gray-400 text-sm">{movie.runtime} min</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard