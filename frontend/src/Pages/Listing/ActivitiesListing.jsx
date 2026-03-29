import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ListingPage from './ListingPage';
import ItemCard from '../../Utility/Cards/ItemCard';

const ActivityListingItem = ({ data }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    // Transform data for ItemCard
    const activityData = {
        id: data.id,
        title: data.title || data.name,
        image: data.images,
        rating: data.rate || data.rating,
        meta: [
            { label: 'Location', value: data.location || t('not_available') },
            { label: 'Duration', value: data.duration || t('not_available') }
        ],
        price: `$${data.price}`
    };

    return (
        <ItemCard 
            {...activityData}
            type="activity"
            fluid={true}
            onClick={() => navigate(`/itemdetail/${data.id}?type=activity`)}
        />
    );
};

const ActivitiesListing = () => {
    const { t } = useTranslation();
    
    return (
        <ListingPage 
            title={t('listing.activities') || 'All Activities'} 
            endpoint="/activities" 
            CardComponent={ActivityListingItem}
            type="activity"
            layout="grid"
            icon="🎟️"
        />
    );
};

export default ActivitiesListing;
