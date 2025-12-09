import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EventDetails from './pages/EventDetails'
import Checkout from './pages/Checkout'
import Ticket from './pages/Ticket'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/ticket/:id" element={<Ticket />} />
    </Routes>
  )
}

export default App
