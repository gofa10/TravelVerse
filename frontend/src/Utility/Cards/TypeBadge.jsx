import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const TypeBadge = ({ type }) => {
     const { t } = useTranslation();

     const typeMap = {
          trip: { label: t('trip'), color: '#3b82f6' }, // Blue
          hotel: { label: t('hotel'), color: '#a855f7' }, // Purple
          restaurant: { label: t('restaurant'), color: '#f97316' }, // Orange
          activity: { label: t('activity'), color: '#22c55e' }, // Green
          activitie: { label: t('activity'), color: '#22c55e' }, // Green (backup)
          cruise: { label: t('cruise'), color: '#06b6d4' }, // Cyan
          car: { label: t('car'), color: '#ef4444' }, // Red
          flight: { label: t('flight'), color: '#6366f1' }, // Indigo
     };

     const currentType = typeMap[type?.toLowerCase()] || { label: type, color: '#64748b' };

     return (
          <BadgeWrapper style={{ backgroundColor: currentType.color }}>
               {currentType.label}
          </BadgeWrapper>
     );
};

const BadgeWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  padding: 2px 9px;
  border-radius: 9999px;
  color: #fff !important;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: capitalize;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
  letter-spacing: 0.3px;
`;

export default TypeBadge;
