import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from '../../Style/Shared/HeroSection.module.css';

const intensityClassMap = {
  light: styles.overlayLight,
  medium: styles.overlayMedium,
  strong: styles.overlayStrong,
};

const HeroSection = ({
  image,
  title,
  subtitle,
  placeholder,
  onSearch,
  heroContent,
  heroContentPosition = 'below',
  overlayIntensity = 'medium',
}) => {
  const [searchValue, setSearchValue] = useState('');
  const overlayClass = intensityClassMap[overlayIntensity] || intensityClassMap.medium;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof onSearch === 'function') {
      onSearch(searchValue.trim());
    }
  };

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setSearchValue(nextValue);
    if (typeof onSearch === 'function') {
      onSearch(nextValue);
    }
  };

  return (
    <section className={`${styles.hero} ${overlayClass}`}>
      <img src={image} alt={title || 'Hero'} className={styles.heroImage} />
      <div className={styles.heroCenter}>
        {heroContent && heroContentPosition === 'above' ? (
          <div className={`${styles.heroContentSlot} ${styles.heroContentSlotTop}`}>{heroContent}</div>
        ) : null}

        <div className={styles.heroContent}>
          {title ? <h1 className={styles.heroTitle}>{title}</h1> : null}
          {subtitle ? <p className={styles.heroSubtitle}>{subtitle}</p> : null}
        </div>

        {heroContent && heroContentPosition !== 'above' ? (
          <div className={styles.heroContentSlot}>{heroContent}</div>
        ) : !heroContent ? (
          <form className={styles.searchBarWrapper} onSubmit={handleSubmit}>
            <FaSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="text"
              value={searchValue}
              onChange={handleChange}
              placeholder={placeholder}
              className={styles.searchInput}
              aria-label={placeholder || 'Search'}
            />
          </form>
        ) : null}
      </div>
    </section>
  );
};

export default HeroSection;
