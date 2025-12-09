import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import EventCard from '../components/events/EventCard';
import { events } from '../data/events';
import HeroSection from '../components/home/HeroSection';
import SearchFilter from '../components/home/SearchFilter';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredEvents = events.filter(event =>
    event.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        </header>

        <HeroSection />
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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
