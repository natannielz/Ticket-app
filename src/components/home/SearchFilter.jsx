import { Search } from 'lucide-react';
import styles from '../../pages/Home.module.css';

const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={styles.searchContainer}>
      <div className={`${styles.searchWrapper} glass-panel`}>
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
  );
};

export default SearchFilter;
