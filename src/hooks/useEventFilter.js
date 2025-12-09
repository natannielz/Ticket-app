import { useState, useMemo } from 'react';
import { events } from '../data/events';

export const useEventFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    if (!searchTerm) return events;

    const lowerTerm = searchTerm.toLowerCase();
    return events.filter(event =>
      event.artist.toLowerCase().includes(lowerTerm) ||
      event.title.toLowerCase().includes(lowerTerm) ||
      event.venue.toLowerCase().includes(lowerTerm) ||
      // Search by month name (e.g. "October")
      new Date(event.date).toLocaleDateString('en-US', { month: 'long' }).toLowerCase().includes(lowerTerm)
    );
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredEvents
  };
};
