import React from 'react'
import style from '../../Style/City/City.module.css';
import heroImage from '../../Assets/images/pexels-asadphoto-1450372.jpg'
import HeroSearchBar from './HeroSearchBar';
import { useTranslation } from 'react-i18next';

const HeroTrip = ({ onSearch }) => {
  const { t } = useTranslation();

  return (
    <div className={style.hero}>
      <img className={style.video} src={heroImage} alt="Discover the World with Us" />

      {/* Centered Content Container */}
      <div className={style.heroCenterContainer}>
        <div className={style.heroContent}>
          <h1 className={style.heroTitle}>{t('discoverNextTrip')}</h1>
          <p className={style.heroSubtitle}>{t('discoverWorld')}</p>
        </div>

        {/* Search Bar */}
        <div className={style.searchBarWrapper}>
          <HeroSearchBar onSearch={onSearch} />
        </div>
      </div>
    </div>
  )
}

export default HeroTrip
