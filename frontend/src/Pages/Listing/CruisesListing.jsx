import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ListingPage from './ListingPage';
import { CruiseCardRow } from '../../Utility/Cards/CruiseCard';

const CruiseListingItem = ({ data }) => {
    const navigate = useNavigate();
    const handleCardClick = (id) => {
        navigate(`/itemdetail/${id}?type=cruise`);
    };
    return <CruiseCardRow cruise={data} onCardClick={handleCardClick} />;
};

const CruisesListing = () => {
    const { t } = useTranslation();
    
    return (
        <ListingPage 
            title={t('cruises') || 'Cruises'} 
            endpoint="/cruises" 
            CardComponent={CruiseListingItem}
            type="cruise"
            icon="🛳️"
        />
    );
};

export default CruisesListing;
