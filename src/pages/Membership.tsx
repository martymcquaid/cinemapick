import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { mockMembershipTiers } from '../utils/mockData'

const Membership: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>('1')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  
  const formatPrice = (price: number) => `€${price.toFixed(2)}`

  const getYearlySavings = (monthlyPrice: number) => {
    const yearlyPrice = monthlyPrice * 12
    const discountedPrice = monthlyPrice * 12 * 0.9
    return yearlyPrice - discountedPrice
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">MyOmniPass</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            The ultimate cinema membership with free tickets, no booking fees, and exclusive perks
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-yellow-400 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
                billingCycle === 'yearly'
                  ? 'bg-yellow-400 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly (Save 10%)
            </button>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mockMembershipTiers.map((tier) => {
              const isPopular = tier.name === 'MyOmniPass Premium'
              const price = billingCycle === 'monthly' ? tier.price : tier.price * 12 * 0.9
              
              return (
                <div
                  key={tier.id}
                  className={`relative bg-gray-900 rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 ${
                    selectedTier === tier.id
                      ? 'border-yellow-400 shadow-2xl'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-yellow-400">
                        {formatPrice(price)}
                      </span>
                      <span className="text-gray-400">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-green-400 text-sm">
                        Save {formatPrice(getYearlySavings(tier.price))} per year
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    {tier.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      selectedTier === tier.id
                        ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                        : ''
                    }`}
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    {selectedTier === tier.id ? 'Selected' : 'Select Plan'}
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Compare Features</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              See how MyOmniPass compares to regular ticket purchases
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-6 text-gray-400">Feature</th>
                    <th className="text-center p-6 text-white">Regular</th>
                    <th className="text-center p-6 text-yellow-400">MyOmniPass</th>
                    <th className="text-center p-6 text-yellow-400">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="p-6 text-gray-300">Free Tickets</td>
                    <td className="p-6 text-center text-gray-400">None</td>
                    <td className="p-6 text-center text-white">1/month</td>
                    <td className="p-6 text-center text-white">2/month</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-6 text-gray-300">Booking Fees</td>
                    <td className="p-6 text-center text-gray-400">€1.50</td>
                    <td className="p-6 text-center text-green-400">Waived</td>
                    <td className="p-6 text-center text-green-400">Waived</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-6 text-gray-300">Food & Drink Discount</td>
                    <td className="p-6 text-center text-gray-400">None</td>
                    <td className="p-6 text-center text-white">10%</td>
                    <td className="p-6 text-center text-white">15%</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-6 text-gray-300">Exclusive Previews</td>
                    <td className="p-6 text-center text-gray-400">No</td>
                    <td className="p-6 text-center text-green-400">Yes</td>
                    <td className="p-6 text-center text-green-400">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-gray-300">Priority Booking</td>
                    <td className="p-6 text-center text-gray-400">No</td>
                    <td className="p-6 text-center text-green-400">Yes</td>
                    <td className="p-6 text-center text-green-400">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get started with MyOmniPass in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Choose Your Plan</h3>
              <p className="text-gray-400">Select MyOmniPass or Premium based on your movie habits</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sign Up & Pay</h3>
              <p className="text-gray-400">Create your account and choose monthly or yearly billing</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enjoy Benefits</h3>
              <p className="text-gray-400">Start using your free tickets and member perks immediately</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-4">Ready to Join?</h2>
          <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
            Start saving on your cinema experience today with MyOmniPass
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Learn More
            </Button>
            <Button size="lg">
              Join MyOmniPass
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Membership