import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Checkout.module.css';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { events } from '../data/events';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize event from location state directly, avoiding useEffect state update
  const eventId = location.state?.eventId;
  const event = events.find(e => e.id === eventId);

  useEffect(() => {
    if (!event) {
      navigate('/');
    }
  }, [event, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      // Add to global cart context so Ticket page can verify
      if (event) {
        addToCart(event);
        navigate(`/ticket/${event.id}`);
      }
    }, 1500);
  };

  if (!event) return null;

  return (
    <div className={`${styles.container} fade-in`}>
      <button onClick={() => navigate('/')} className={styles.backButton}>
        <ArrowLeft size={20} /> Back to Home
      </button>

      <div className={`${styles.formWrapper} glass-panel`}>
        <h1 className={styles.title}>Secure Checkout</h1>
        <p className={styles.subtitle}>Purchase ticket for <strong>{event.title}</strong></p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Info</h2>
            <Input id="name" label="Full Name" placeholder="Jane Doe" required />
            <Input id="email" label="Email Address" type="email" placeholder="jane@example.com" required />
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Payment Details</h2>
            <Input id="card" label="Card Number" placeholder="0000 0000 0000 0000" required />
            <div className={styles.row}>
              <Input id="expiry" label="MM/YY" placeholder="12/26" required />
              <Input id="cvc" label="CVC" placeholder="123" required />
            </div>
          </div>

          <div className={styles.footer}>
            <Button type="submit" variant="primary" size="large" className={styles.submitButton} disabled={isProcessing}>
              {isProcessing ? 'Processing Payment...' : 'Confirm Purchase'}
            </Button>
            <p className={styles.terms}>By confirming, you agree to our Terms of Service.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
