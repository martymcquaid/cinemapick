import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg overflow-hidden'
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-105 transition-all duration-300' : ''
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  )
}

export default Card