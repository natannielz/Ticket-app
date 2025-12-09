import styles from '../../pages/Home.module.css';
import ThreeScene from './ThreeScene';

const HeroSection = () => {
  return (
    <section className={`${styles.hero} animate-enter delay-100`}>
      <ThreeScene />
      <div className={styles.heroContent}>
        <h2 className={styles.heroTitle}>Experience it live.</h2>
        <p className={styles.heroSubtitle}>Simplicity in every ticket.</p>
      </div>
    </section>
  );
};

export default HeroSection;
