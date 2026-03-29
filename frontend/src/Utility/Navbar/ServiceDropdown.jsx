import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { continents } from './continentsData';
import { continentData } from '../../Pages/Continent/continentData';
import styles from './ServiceDropdown.module.css';

const serviceRouteMap = {
  hotels: '/hotel',
  flights: '/flight',
  cars: '/car',
  cruises: '/cruises',
};

const getCitySlugFromDestinationLink = (link) => {
  const parts = String(link || '').split('/');
  return parts[parts.length - 1] || '';
};

const getCityName = (city) => {
  if (typeof city === 'string') return city;
  if (city && typeof city.name === 'string') return city.name;
  return '';
};

const ServiceDropdown = ({ service, label, icon: Icon, mobile = false, onNavigate }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [expandedContinent, setExpandedContinent] = useState(null);

  const routePrefix = serviceRouteMap[service];
  const active = Boolean(routePrefix && location.pathname.startsWith(routePrefix));
  const currentCity = routePrefix && location.pathname.startsWith(`${routePrefix}/`)
    ? decodeURIComponent(location.pathname.replace(`${routePrefix}/`, '').split('/')[0] || '')
    : '';

  const continentsDictionary = useMemo(() => continentData(t), [t]);
  const options = useMemo(() => {
    return continents.map((continent) => {
      const continentSlug = getCitySlugFromDestinationLink(continent.link);
      const cities = continentsDictionary?.[continentSlug]?.cities || [];
      return {
        key: continent.name,
        continentSlug,
        destinationLink: continent.link,
        label: t(continent.name),
        cities,
      };
    });
  }, [continentsDictionary, t]);

  const handleSelectCity = (city) => {
    if (!routePrefix) return;
    navigate(`${routePrefix}/${encodeURIComponent(city)}`);
    setOpen(false);
    setExpandedContinent(null);
    if (onNavigate) onNavigate();
  };

  const handleBrowseContinent = (continentLink) => {
    navigate(continentLink);
    setOpen(false);
    setExpandedContinent(null);
    if (onNavigate) onNavigate();
  };

  const toggleContinent = (continentSlug) => {
    setExpandedContinent((prev) => (prev === continentSlug ? null : continentSlug));
  };

  useEffect(() => {
    if (!open) return undefined;
    const handleOutside = (event) => {
      if (!rootRef.current || rootRef.current.contains(event.target)) return;
      setOpen(false);
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setExpandedContinent(null);
    }
  }, [open]);

  if (mobile) {
    return (
      <div className={styles.root} ref={rootRef}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={`${styles.mobileTrigger} ${active ? styles.mobileTriggerActive : ''}`}
        >
          <span>{t(label)}</span>
          <svg className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {open && (
          <div className={styles.dropdownMobile}>
            {options.map((option) => {
              const isExpanded = expandedContinent === option.continentSlug;
              return (
                <div key={option.key} className={styles.accordionItem}>
                  <button
                    type="button"
                    onClick={() => toggleContinent(option.continentSlug)}
                    className={`${styles.continentItem} ${styles.mobileContinentItem}`}
                  >
                    <span>{option.label}</span>
                    <svg className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div className={`${styles.cityPanel} ${isExpanded ? styles.cityPanelOpen : ''}`}>
                    <div className={styles.cityList}>
                      {option.cities.map((city) => {
                        const cityName = getCityName(city);
                        if (!cityName) return null;
                        const isActiveCity = currentCity === cityName;
                        return (
                          <button
                            key={`${option.continentSlug}-${cityName}`}
                            type="button"
                            onClick={() => handleSelectCity(cityName)}
                            className={`${styles.cityItem} ${styles.mobileCityItem} ${isActiveCity ? styles.cityItemActive : ''}`}
                          >
                            {cityName}
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => handleBrowseContinent(option.destinationLink)}
                        className={`${styles.cityItem} ${styles.mobileCityItem} ${styles.browseContinentItem}`}
                      >
                        {`${t('all')} ${option.label}`}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`${styles.triggerDesktop} ${active ? styles.triggerDesktopActive : ''}`}
      >
        {Icon && <Icon className={styles.triggerDesktopIcon} />}
        {t(label)}
        <svg className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
        {active && <span className={styles.desktopUnderline} />}
      </button>

      <div className={`${styles.dropdownDesktop} ${open ? styles.dropdownDesktopOpen : ''}`}>
        {options.map((option) => {
          const isExpanded = expandedContinent === option.continentSlug;
          return (
            <div key={option.key} className={styles.accordionItem}>
              <button
                type="button"
                onClick={() => toggleContinent(option.continentSlug)}
                className={styles.continentItem}
              >
                <span>{option.label}</span>
                <svg className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className={`${styles.cityPanel} ${isExpanded ? styles.cityPanelOpen : ''}`}>
                <div className={styles.cityList}>
                  {option.cities.map((city) => {
                    const cityName = getCityName(city);
                    if (!cityName) return null;
                    const isActiveCity = currentCity === cityName;
                    return (
                      <button
                        key={`${option.continentSlug}-${cityName}`}
                        type="button"
                        onClick={() => handleSelectCity(cityName)}
                        className={`${styles.cityItem} ${isActiveCity ? styles.cityItemActive : ''}`}
                      >
                        {cityName}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => handleBrowseContinent(option.destinationLink)}
                    className={`${styles.cityItem} ${styles.browseContinentItem}`}
                  >
                    {`${t('all')} ${option.label}`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceDropdown;
