import styles from './EventCard.module.css';
import { Calendar, MapPin } from 'lucide-react';
import Card from '../ui/Card';

const EventCard = ({ event, onClick }) => {
  const dateOptions = { month: 'short', day: 'numeric', weekday: 'short' };
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', dateOptions);

  return (
    <Card className={styles.card} onClick={() => onClick(event.id)}>
      <div className={styles.imageContainer}>
        <img
          src={event.image}
          alt={event.title}
          className={styles.image}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none'; // Hide broken image
            e.target.parentNode.style.backgroundColor = '#f0f0f0'; // Solid gray background
            e.target.parentNode.style.display = 'flex';
            e.target.parentNode.style.alignItems = 'center';
            e.target.parentNode.style.justifyContent = 'center';
            e.target.parentNode.innerHTML = '<span style="color:#999;font-size:0.8rem">Image Unavailable</span>';
          }}
        />
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
