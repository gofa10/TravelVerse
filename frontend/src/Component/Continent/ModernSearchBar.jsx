import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../../Style/Continent/ModernSearchBar.module.css';

const ModernSearchBar = ({ countries = [] }) => {
     const { t } = useTranslation();
     const [searchTerm, setSearchTerm] = useState('');
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const dropdownRef = useRef(null);
     const navigate = useNavigate();

     // Close dropdown on outside click
     useEffect(() => {
          const handleClickOutside = (event) => {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsDropdownOpen(false);
               }
          };
          document.addEventListener('mousedown', handleClickOutside);
          return () => document.removeEventListener('mousedown', handleClickOutside);
     }, []);

     const filteredCountries = countries.filter((country) =>
          country.toLowerCase().includes(searchTerm.toLowerCase())
     );

     const handleSelectCountry = (country) => {
          setSearchTerm(country);
          setIsDropdownOpen(false);
          navigate(`/city/${encodeURIComponent(country)}`);
     };

     const handleSearch = () => {
          if (searchTerm.trim() === '') return;

          const match = countries.find(c => c.toLowerCase() === searchTerm.toLowerCase());
          if (match) {
               navigate(`/city/${encodeURIComponent(match)}`);
          } else if (filteredCountries.length > 0) {
               navigate(`/city/${encodeURIComponent(filteredCountries[0])}`);
          }
          setIsDropdownOpen(false);
     };

     const handleKeyDown = (e) => {
          if (e.key === 'Enter') {
               handleSearch();
          }
     };

     return (
          <div className={styles.searchWrapper} ref={dropdownRef}>
               <div className={styles.searchContainer}>
                    <div className={styles.searchIcon}>
                         <SearchIcon />
                    </div>

                    <input
                         id="main-search-input"
                         type="text"
                         name="query"
                         aria-label={t('search')}
                         placeholder={t('search')}
                         className={styles.searchInput}
                         value={searchTerm}
                         onChange={(e) => {
                              setSearchTerm(e.target.value);
                              setIsDropdownOpen(true);
                         }}
                         onFocus={() => setIsDropdownOpen(true)}
                         onKeyDown={handleKeyDown}
                    />

                    <button
                         className={styles.searchButton}
                         onClick={handleSearch}
                         aria-label={t('search')}
                    >
                         {t('search')}
                    </button>
               </div>

               {/* Dropdown Menu */}
               {isDropdownOpen && (
                    <div className={styles.dropdown} role="listbox">
                         {filteredCountries.length > 0 ? (
                              filteredCountries.map((country, index) => (
                                   <div
                                        key={index}
                                        className={styles.dropdownItem}
                                        onClick={() => handleSelectCountry(country)}
                                        role="option"
                                   >
                                        <span className={styles.markerIcon}>📍</span>
                                        <span>{country}</span>
                                   </div>
                              ))
                         ) : (
                              <div className={styles.dropdownEmpty}>
                                   {t('no_results')}
                              </div>
                         )}
                    </div>
               )}
          </div>
     );
};

export default ModernSearchBar;
