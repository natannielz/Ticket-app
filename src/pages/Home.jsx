import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import EventCard from '../components/events/EventCard';
import { events } from '../data/events';
import { Search } from 'lucide-react';

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

        <section className={`${styles.hero} animate-enter delay-100`}>
          <div className={styles.heroContent}>
            <h2 className={styles.heroTitle}>Experience it live.</h2>
            <p className={styles.heroSubtitle}>Simplicity in every ticket.</p>
          </div>

          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Search artists, venues..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

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
