import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import styles from './Home.module.css';
import EventCard from '../components/events/EventCard';
import { events } from '../data/events';
import HeroSection from '../components/home/HeroSection';
import SearchFilter from '../components/home/SearchFilter';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    date: ''
  });
  const navigate = useNavigate();
  const { cart, isAnimating } = useCart();

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Text Search
      const matchesSearch =
        event.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase());

      // Category Filter
      const matchesCategory = filters.category ? event.category === filters.category : true;

      // Price Filter
      let matchesPrice = true;
      if (filters.priceRange === 'under50') matchesPrice = event.price < 50;
      else if (filters.priceRange === '50to100') matchesPrice = event.price >= 50 && event.price <= 100;
      else if (filters.priceRange === 'over100') matchesPrice = event.price > 100;

      // Date Filter
      const matchesDate = filters.date ? event.date.startsWith(filters.date) : true;

      return matchesSearch && matchesCategory && matchesPrice && matchesDate;
    });
  }, [searchTerm, filters]);

  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };

  return (
    <div className={styles.wrapper}>
      {/* Abstract CSS-only Background */}
      <div className={styles.bgPattern}></div>

      <div className={styles.container}>
        <header className={`${styles.header} animate-enter`}>
          <h1 className={styles.logo}>Canvas Tickets</h1>
          <div className={styles.cartIconWrapper} style={{ position: 'absolute', top: '2rem', right: '1.5rem' }}>
            <ShoppingBag size={24} color="var(--color-black)" />
            {cart.length > 0 && (
              <span className={`${styles.cartCount} ${isAnimating ? styles.cartAnimate : ''}`}>
                {cart.length}
              </span>
            )}
          </div>
        </header>

        <HeroSection />
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
        />

        <main className={styles.grid}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className={`animate-enter`}
                style={{ animationDelay: `${200 + index * 100}ms` }} // Staggered delay logic
              >
                <EventCard event={event} onClick={handleEventClick} />
              </div>
            ))
          ) : (
            <div className={`${styles.noResults} animate-enter delay-200`}>
              <p>No events found matching "{searchTerm}"</p>
              <button onClick={() => setSearchTerm('')} className={styles.clearSearch}>Clear Search</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
