import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// Icons
import MapIcon from '@mui/icons-material/Map';
import HotelIcon from '@mui/icons-material/Hotel';
import RowingIcon from '@mui/icons-material/Rowing';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-bottom: 2rem;
  position: sticky;
  top: 64px;
  z-index: 40;
  width: 100%;
`;

const NavContainer = styled(motion.div)`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 8px;
  gap: 10px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  max-width: fit-content;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .dark & {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

const NavItem = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 40px;
  cursor: pointer;
  color: var(--text-primary);
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  font-size: 0.95rem;
  transition: color 0.3s ease;

  svg {
    font-size: 1.4rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.2) rotate(5deg);
  }

  &.active {
    color: white;
  }
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-primary-600);
  border-radius: 40px;
  z-index: -1;
`;

const ModernCategoryBar = ({ countryName }) => {
     const { t } = useTranslation();
     const location = useLocation();

     const categories = [
          { id: 'city', path: `/city/${countryName}`, label: countryName || 'TravelVerse', icon: <MapIcon /> },
          { id: 'hotels', path: `/hotel/${countryName}`, label: t('hotels'), icon: <HotelIcon /> },
          { id: 'activities', path: `/thingstodo/${countryName}`, label: t('activitie'), icon: <RowingIcon /> },
          { id: 'restaurants', path: `/restaurants/${countryName}`, label: t('restaurant'), icon: <RestaurantIcon /> },
          { id: 'flights', path: `/flight/${countryName}`, label: t('flights'), icon: <ConnectingAirportsIcon /> },
     ];

     return (
          <NavWrapper>
               <NavContainer
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
               >
                    {categories.map((cat) => {
                         const isActive = location.pathname.startsWith(cat.path);
                         return (
                              <Link to={cat.path} key={cat.id} style={{ textDecoration: 'none' }}>
                                   <NavItem
                                        className={isActive ? 'active' : ''}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                   >
                                        {isActive && (
                                             <ActiveIndicator
                                                  layoutId="activeCategory"
                                                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                             />
                                        )}
                                        {cat.icon}
                                        <span>{cat.label}</span>
                                   </NavItem>
                              </Link>
                         );
                    })}
               </NavContainer>
          </NavWrapper>
     );
};

export default ModernCategoryBar;
