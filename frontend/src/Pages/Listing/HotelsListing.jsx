import React from 'react';
import { useTranslation } from 'react-i18next';
import ListingPage from './ListingPage';
import HotelCard from '../../Utility/Cards/HotelCard';

const HotelsListing = () => {
    const { t } = useTranslation();
    
    return (
        <ListingPage 
            title={t('hotels')} 
            endpoint="/hotels" 
            CardComponent={HotelCard}
            type="hotel"
            icon="🏨"
        />
    );
};

export default HotelsListing;
