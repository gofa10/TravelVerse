import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaSearch, FaDollarSign } from 'react-icons/fa';
import style from '../../Style/Trips/HeroSearchBar.module.css';

const HeroSearchBar = ({ onSearch }) => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useState({
        location: '',
        minPrice: '',
        maxPrice: '',
    });

    const handleChange = (field, value) => {
        setSearchParams(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(searchParams);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <div className={style.searchContainer}>
            <div className={style.searchBar}>
                {/* Location - Text Input */}
                <div className={style.searchField}>
                    <FaMapMarkerAlt className={style.icon} />
                    <input
                        type="text"
                        placeholder={t('location')}
                        value={searchParams.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={style.input}
                    />
                </div>

                <div className={style.divider}></div>

                {/* Min Price */}
                <div className={style.searchField}>
                    <FaDollarSign className={style.icon} />
                    <input
                        type="number"
                        placeholder={t('min_price')}
                        value={searchParams.minPrice}
                        onChange={(e) => handleChange('minPrice', e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={style.input}
                        min="0"
                    />
                </div>

                <div className={style.divider}></div>

                {/* Max Price */}
                <div className={style.searchField}>
                    <FaDollarSign className={style.icon} />
                    <input
                        type="number"
                        placeholder={t('max_price')}
                        value={searchParams.maxPrice}
                        onChange={(e) => handleChange('maxPrice', e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={style.input}
                        min="0"
                    />
                </div>

                {/* Search Button */}
                <Button className={style.searchButton} onClick={handleSearchClick}>
                    <FaSearch className={style.searchIcon} />
                    <span>{t('search')}</span>
                </Button>
            </div>
        </div>
    );
};

export default HeroSearchBar;
