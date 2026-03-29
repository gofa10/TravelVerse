import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ListingPage from './ListingPage';
import { CarCardRow } from '../../Utility/Cards/CarsCard';

const CarListingItem = ({ data }) => {
    const navigate = useNavigate();
    const handleCardClick = (id) => {
        navigate(`/itemdetail/${id}?type=car`);
    };
    return <CarCardRow product={data} onCardClick={handleCardClick} />;
};

const CarsListing = () => {
    const { t } = useTranslation();
    
    return (
        <ListingPage 
            title={t('cars')} 
            endpoint="/cars" 
            CardComponent={CarListingItem}
            type="car"
            icon="🚗"
        />
    );
};

export default CarsListing;
