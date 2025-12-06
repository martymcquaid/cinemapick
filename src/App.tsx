import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NowShowing from './pages/NowShowing'
import ComingSoon from './pages/ComingSoon'

// IMPORTANT: For navigation, always use <Link> from react-router-dom, not <a> tags
// This ensures client-side routing works correctly with the preview URL base path
// Example: <Link to="/about">About</Link> instead of <a href="/about">About</a>

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/now-showing" element={<NowShowing />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="/movie/:id" element={<div>Movie Detail Page - Coming Soon</div>} />
      <Route path="/cinemas" element={<div>Cinema Locations Page - Coming Soon</div>} />
      <Route path="/cinema/:id" element={<div>Cinema Detail Page - Coming Soon</div>} />
      <Route path="/book-tickets" element={<div>Book Tickets Page - Coming Soon</div>} />
      <Route path="/food-drink" element={<div>Food & Drink Page - Coming Soon</div>} />
      <Route path="/membership" element={<div>Membership Page - Coming Soon</div>} />
      <Route path="/gift-cards" element={<div>Gift Cards Page - Coming Soon</div>} />
      <Route path="/events" element={<div>Events Page - Coming Soon</div>} />
      <Route path="/contact" element={<div>Contact Page - Coming Soon</div>} />
      <Route path="/faq" element={<div>FAQ Page - Coming Soon</div>} />
      <Route path="/careers" element={<div>Careers Page - Coming Soon</div>} />
      <Route path="/private-hire" element={<div>Private Hire Page - Coming Soon</div>} />
      <Route path="/accessibility" element={<div>Accessibility Page - Coming Soon</div>} />
      <Route path="/terms" element={<div>Terms Page - Coming Soon</div>} />
      <Route path="/privacy" element={<div>Privacy Page - Coming Soon</div>} />
      <Route path="/cookies" element={<div>Cookies Page - Coming Soon</div>} />
      <Route path="/age-rating" element={<div>Age Rating Page - Coming Soon</div>} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  )
}

export default App
