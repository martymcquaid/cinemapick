import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { mockFoodItems } from '../utils/mockData'

const FoodDrink: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const categories = ['all', 'snacks', 'drinks', 'combos', 'ice-cream']
  
  const filteredItems = selectedCategory === 'all' 
    ? mockFoodItems 
    : mockFoodItems.filter(item => item.category === selectedCategory)

  const formatPrice = (price: number) => `€${price.toFixed(2)}`
  
  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'snacks': return 'Snacks'
      case 'drinks': return 'Drinks'
      case 'combos': return 'Combos & Deals'
      case 'ice-cream': return 'Ice Cream'
      default: return 'All Items'
    }
  }

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'snacks': return 'Fresh popcorn, nachos, hot dogs and more'
      case 'drinks': return 'Soft drinks, juices, and refreshing beverages'
      case 'combos': return 'Great value deals and combinations'
      case 'ice-cream': return 'Premium ice cream and frozen treats'
      default: return 'Complete menu of cinema refreshments'
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Food & Drink</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Delicious snacks and refreshing drinks to complete your cinema experience
          </p>
        </div>
      </section>

      {/* Online Ordering Banner */}
      <section className="py-12 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Order Online & Skip the Queue!</h2>
          <p className="text-black text-lg mb-6 max-w-2xl mx-auto">
            Pre-order your food and drinks online for quick collection when you arrive
          </p>
          <Button variant="secondary" size="lg">
            Order Online Now
          </Button>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-gray-900 sticky top-16 z-40 border-b border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {getCategoryTitle(category)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {getCategoryTitle(selectedCategory)}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {getCategoryDescription(selectedCategory)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                {/* Item Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm">Food Image</p>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-yellow-400 px-3 py-1 rounded-lg">
                    <span className="text-sm font-semibold">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </div>

                {/* Item Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                  
                  {/* Size Options */}
                  {item.size && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {item.size.map((size) => (
                          <span key={size} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Allergens */}
                  {item.allergens && item.allergens.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-1">Contains:</div>
                      <div className="flex flex-wrap gap-1">
                        {item.allergens.map((allergen) => (
                          <span key={allergen} className="bg-red-900 text-red-300 text-xs px-2 py-1 rounded">
                            {allergen}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-bold text-xl">{formatPrice(item.price)}</span>
                    <Button size="sm">
                      Add to Order
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Special Offers</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Great value deals and combos for your perfect cinema experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-8 text-center">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">MyOmniPass Discount</h3>
              <p className="text-black mb-4">15% off all food & drink</p>
              <Button variant="secondary" size="sm">
                Join Now
              </Button>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Tuesday Deals</h3>
              <p className="text-gray-300 mb-4">50% off selected snacks</p>
              <Button size="sm">
                View Deals
              </Button>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Family Combo</h3>
              <p className="text-gray-300 mb-4">Perfect for families of 4</p>
              <Button size="sm">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Order?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Pre-order your favorite snacks and drinks for quick collection at the cinema
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Order Online
            </Button>
            <Button to="/membership" variant="secondary" size="lg">
              Get Discounts
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FoodDrink