import styles from './EventCard.module.css';
import { Calendar, MapPin } from 'lucide-react';
import Card from '../ui/Card';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event, onClick }) => {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const dateOptions = { month: 'short', day: 'numeric', weekday: 'short' };
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', dateOptions);

  const handleQuickBuy = (e) => {
    e.stopPropagation();
    navigate('/checkout', { state: { eventId: event.id } });
  };

  return (
    <Card className={styles.card} onClick={() => onClick(event.id)}>
      <div className={styles.imageContainer}>
        {!hasError ? (
          <img
            src={event.image}
            alt={event.title}
            className={styles.image}
            onError={() => setHasError(true)}
          />
        ) : (
          <div className={styles.fallbackImage}>
            <span style={{ color: '#999', fontSize: '0.8rem' }}>Image Unavailable</span>
          </div>
        )}
        <button className={styles.quickBuy} onClick={handleQuickBuy}>Quick Buy</button>
      </div>
      <div className={styles.content}>
        <h3 className={styles.artist}>{event.artist}</h3>
        <p className={styles.title}>{event.title}</p>
        <div className={styles.details}>
          <span className={styles.info}>
            <Calendar size={14} /> {formattedDate}
          </span>
          <span className={styles.info}>
            <MapPin size={14} /> {event.venue}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
