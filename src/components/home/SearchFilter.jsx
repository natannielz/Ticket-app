import { Search } from 'lucide-react';
import styles from '../../pages/Home.module.css';

const SearchFilter = ({ searchTerm, setSearchTerm, filters, setFilters }) => {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
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

      <div className={styles.filtersWrapper}>
        <select
          className={styles.filterSelect}
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Art">Art</option>
          <option value="Classical">Classical</option>
          <option value="Festival">Festival</option>
        </select>

        <select
          className={styles.filterSelect}
          value={filters.priceRange}
          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
        >
          <option value="">Any Price</option>
          <option value="under50">Under $50</option>
          <option value="50to100">$50 - $100</option>
          <option value="over100">Over $100</option>
        </select>

        <input
          type="date"
          className={styles.filterDate}
          value={filters.date}
          onChange={(e) => handleFilterChange('date', e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
