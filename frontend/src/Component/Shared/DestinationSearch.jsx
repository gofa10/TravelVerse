import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { continentData } from '../../Pages/Continent/continentData';
import styles from '../../Style/Shared/DestinationSearch.module.css';

const formatLabel = (value = '') => value.replace(/([a-z])([A-Z])/g, '$1 $2').trim();

const DestinationSearch = ({ onSelect, onClose, onBrowseRegion }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  const destinations = useMemo(() => {
    const data = continentData(t);
    return Object.entries(data).flatMap(([continentSlug, continent]) =>
      (continent?.cities || []).map((cityName) => ({
        id: `${continentSlug}-${cityName}`,
        cityName: formatLabel(cityName),
        countryName: continent?.countryName || formatLabel(continentSlug),
        route: `/city/${encodeURIComponent(cityName)}`,
      }))
    );
  }, [t]);

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return destinations.slice(0, 8);
    }
    return destinations
      .filter((item) =>
        item.cityName.toLowerCase().includes(normalizedQuery) ||
        item.countryName.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, 8);
  }, [destinations, query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!rootRef.current || rootRef.current.contains(event.target)) return;
      onClose?.();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSelect = (destination) => {
    onSelect?.(destination);
    setIsOpen(false);
  };

  const handleBrowseRegion = () => {
    setIsOpen(false);
    onBrowseRegion?.();
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.inputWrapper}>
        <FaSearch className={styles.searchIcon} aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={t('selectDestination') || 'Search destination...'}
          className={styles.input}
          aria-label="Destination Search"
        />
      </div>

      {isOpen ? (
        <div className={styles.dropdown}>
          <div className={styles.list}>
            {suggestions.length > 0 ? (
              suggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.suggestionItem}
                  onClick={() => handleSelect(item)}
                >
                  <span className={styles.cityName}>{item.cityName}</span>
                  <span className={styles.countryName}>{item.countryName}</span>
                </button>
              ))
            ) : (
              <div className={styles.emptyState}>
                {t('noCityFound') || 'No destinations found'}
              </div>
            )}
          </div>

          <button
            type="button"
            className={styles.browseRegion}
            onClick={handleBrowseRegion}
          >
            Browse by region →
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DestinationSearch;
