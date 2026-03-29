import React, { useMemo } from 'react';
import ItemCard from '../Cards/ItemCard';
import { useTranslation } from 'react-i18next';
import { getItemImage } from '../dataUtils.js';

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

const getItemTitle = (item, type) => {
     if (type === 'car') {
          const carName = [item.brand, item.model].filter(Boolean).join(' ').trim();
          if (carName) return carName;
     }
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
          const activities = (homeData.activities || []).map(i => ({ ...i, _type: 'activity' }));

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
          <section
               className="recommendations-container"
               style={{
                    padding: 'var(--space-6, 24px) 0 var(--space-16, 64px)',
                    background:
                         'radial-gradient(circle at center, color-mix(in srgb, var(--color-primary-200) 26%, transparent) 0%, transparent 60%)',
               }}
          >
              <style>{`
        .recommendations-title-wrapper {
          text-align: center;
          margin-bottom: var(--space-8, 32px);
        }
        .recommendations-title {
          font-size: clamp(var(--font-size-2xl, 1.5rem), 2.5vw, var(--font-size-4xl, 2.25rem));
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-3, 12px);
          letter-spacing: -0.01em;
        }
        .recommendations-subtitle {
          color: var(--text-secondary);
          font-size: var(--font-size-base, 1rem);
          max-width: 42rem;
          margin: 0 auto;
          line-height: 1.7;
        }
        .recommendations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-6, 24px);
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-4, 16px);
        }
        /* Ensure ItemCards fit the grid */
        .recommendations-grid .item-card-wrapper {
          width: 100% !important;
          margin: 0 !important;
        }
      `}</style>

               <div className="recommendations-title-wrapper">
                    <h2 className="recommendations-title">{t('recommendations_for_you')}</h2>
                    <p className="recommendations-subtitle">{t('handpicked_experiences')}</p>
               </div>

               <div className="recommendations-grid">
                    {recommendations.map((item, index) => (
                         <ItemCard
                              key={`${item._type}-${item.id || index}`}
                              id={item.id}
                              image={getItemImage(item)}
                              title={getItemTitle(item, item._type)}
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
