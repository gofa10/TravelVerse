import React, { useMemo } from 'react';
import ItemCard from '../Cards/ItemCard';
import { useTranslation } from 'react-i18next';

// Utility to build consistent meta items for the Card
const buildMeta = (item, type) => {
     const location = item.location || item.city || item.country || item.location_en || '—';
     const hasGuide = item.guide_available != null
          ? (item.guide_available ? 'Yes' : 'No')
          : item.has_guide != null
               ? (item.has_guide ? 'Yes' : 'No')
               : null;

     switch (type) {
          case 'hotel':
               return [
                    { label: 'Stars', value: item.stars ? `${'★'.repeat(item.stars)}` : '—' },
                    { label: 'Location', value: location },
                    { label: 'Price', value: item.price_per_night ? `$${item.price_per_night}/night` : (item.price ? `$${item.price}` : '—') },
               ];
          case 'restaurant':
               return [
                    { label: 'Cuisine', value: item.cuisine_type || item.type || '—' },
                    { label: 'Location', value: location },
                    { label: 'Price', value: item.price_range || (item.price ? `$${item.price}` : '—') },
               ];
          case 'cruise':
               return [
                    { label: 'Duration', value: item.duration || '—' },
                    { label: 'Location', value: location },
                    { label: 'Price', value: item.price ? `$${item.price}` : '—' },
               ];
          case 'car':
               return [
                    { label: 'Type', value: item.car_type || item.type || '—' },
                    { label: 'Location', value: location },
                    { label: 'Price', value: item.price_per_day ? `$${item.price_per_day}/day` : (item.price ? `$${item.price}` : '—') },
               ];
          default:
               return [
                    { label: 'Duration', value: item.duration || '—' },
                    { label: 'Location', value: location },
                    { label: 'Price', value: item.price ? `$${item.price}` : '—' },
                    ...(hasGuide ? [{ label: 'Guide', value: hasGuide }] : []),
               ];
     }
};

const getItemTitle = (item) => {
     if (item.title) return item.title;
     if (item.name || item.name_en) return item.name || item.name_en;
     if (item.from_location && item.to_location) return `${item.from_location} → ${item.to_location}`;
     return 'Untitled';
};

const RecommendationsGrid = ({ homeData, isLoading }) => {
     const { t } = useTranslation();

     const recommendations = useMemo(() => {
          if (!homeData) return [];

          // Tag each item with its type for buildMeta and routing
          const trips = (homeData.trips || []).map(i => ({ ...i, _type: 'trip' }));
          const hotels = (homeData.hotels || []).map(i => ({ ...i, _type: 'hotel' }));
          const restaurants = (homeData.restaurants || []).map(i => ({ ...i, _type: 'restaurant' }));
          const activities = (homeData.activities || []).map(i => ({ ...i, _type: 'activitie' }));

          const combined = [...trips, ...hotels, ...restaurants, ...activities];

          // Sort and take top items, or shuffle if preferred. 
          // Here we'll take a slice and then shuffle for variety.
          return combined
               .sort(() => 0.5 - Math.random()) // Shuffle
               .slice(0, 8); // Top 8 items
     }, [homeData]);

     if (isLoading) {
          return (
               <div className="recommendations-loading" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                    {t('loading_recommendations', 'Finding perfect matches for you...')}
               </div>
          );
     }

     if (!recommendations.length) return null;

     return (
          <section className="recommendations-container" style={{ padding: 'var(--space-16, 64px) 0' }}>
               <style>{`
        .recommendations-title-wrapper {
          text-align: center;
          margin-bottom: 40px;
        }
        .recommendations-title {
          font-size: var(--font-size-3xl, 1.875rem);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .recommendations-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
        }
        .recommendations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 16px;
        }
        /* Ensure ItemCards fit the grid */
        .recommendations-grid .item-card-wrapper {
          width: 100% !important;
          margin: 0 !important;
        }
      `}</style>

               <div className="recommendations-title-wrapper">
                    <h2 className="recommendations-title">{t('recommendations_for_you', 'Recommendations for You')}</h2>
                    <p className="recommendations-subtitle">{t('recommendations_subtitle', 'Hand-picked experiences tailored to your style')}</p>
               </div>

               <div className="recommendations-grid">
                    {recommendations.map((item, index) => (
                         <ItemCard
                              key={`${item._type}-${item.id || index}`}
                              id={item.id}
                              image={item?.images?.[0] || item?.image}
                              title={getItemTitle(item)}
                              rating={parseFloat(item.rating ?? item.rate ?? item.average_rating ?? item.stars ?? 0)}
                              meta={buildMeta(item, item._type)}
                              type={item._type}
                              to={item?.id ? `/itemdetail/${item.id}?type=${item._type}` : undefined}
                         />
                    ))}
               </div>
          </section>
     );
};

export default RecommendationsGrid;
