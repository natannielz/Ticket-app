import { useParams, Link } from 'react-router-dom';
import styles from './Ticket.module.css';
import QRCode from 'react-qr-code';
import { events } from '../data/events';
import { useCart } from '../hooks/useCart';

const Ticket = () => {
  const { id } = useParams();
  const { cart } = useCart();

  // Try to find in cart first to verify purchase, otherwise fall back to url param for demo
  const purchasedItem = cart.find(item => item.id === Number(id));
  const event = purchasedItem || events.find(e => e.id === Number(id));

  if (!event) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.successMessage}>Ticket Not Found</h1>
          <ButtonLink to="/">Return Home</ButtonLink>
        </div>
      </div>
    );
  }

  const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', dateOptions);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.successMessage}>You're Going!</h1>
        <p className={styles.subtitle}>Order #{id}</p>
      </header>

      <div className={styles.ticketCard}>
        <div className={styles.qrSection}>
          <QRCode value={`TICKET-${id}`} size={200} />
        </div>

        <div className={styles.details}>
          <h2 className={styles.eventTitle}>{event.title}</h2>
          <p className={styles.artist}>{event.artist}</p>

          <div className={styles.meta}>
            <div className={styles.row}>
              <span className={styles.label}>Date</span>
              <span className={styles.value}>{formattedDate}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Venue</span>
              <span className={styles.value}>{event.venue}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Ticket</span>
              <span className={styles.value}>General Admission</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <ButtonLink to="/">Back to Home</ButtonLink>
      </div>
    </div>
  );
};

const ButtonLink = ({ to, children }) => (
  <Link to={to} className={styles.buttonLink}>{children}</Link>
);

export default Ticket;
