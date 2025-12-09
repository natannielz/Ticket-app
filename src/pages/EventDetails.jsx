import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { events } from '../data/events';
import styles from './EventDetails.module.css';
import Button from '../components/ui/Button';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (isNaN(Number(id))) {
      navigate('/');
    }
  }, [id, navigate]);

  const event = events.find(e => e.id === Number(id));

  if (!event) {
    return <div className={styles.container}>Event not found</div>;
  }

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' };
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', dateOptions);

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/')} className={styles.backButton}>
        <ArrowLeft size={20} /> Back to Home
      </button>

      <div className={styles.grid}>
        <div className={styles.imageColumn}>
          <img src={event.image} alt={event.title} className={styles.image} />
        </div>

        <div className={styles.infoColumn}>
          <div className={styles.header}>
            <p className={styles.artist}>{event.artist}</p>
            <h1 className={styles.title}>{event.title}</h1>
          </div>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <Calendar size={20} className={styles.icon} />
              <span>{formattedDate}</span>
            </div>
            <div className={styles.metaItem}>
              <MapPin size={20} className={styles.icon} />
              <span>{event.venue}</span>
            </div>
          </div>

          <div className={styles.description}>
            <h3 className={styles.sectionTitle}>About</h3>
            <p>{event.description}</p>
          </div>

          <div className={styles.actions}>
            <div className={styles.price}>
              <span className={styles.currency}>$</span>
              <span className={styles.amount}>{event.price}</span>
            </div>
            <Button onClick={() => navigate('/checkout')} size="large" className={styles.buyButton}>
              Get Tickets
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
