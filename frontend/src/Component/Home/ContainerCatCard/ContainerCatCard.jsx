// src/Component/Home/ContainerCatCard/ContainerCatCard.jsx
import React from 'react';
import ItemCard from '../../../Utility/Cards/ItemCard';
import { useQuery } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// ─── API ─────────────────────────────────────────────────────────────────────

const getApiEndpoint = (type) => {
  const pluralMap = {
    activitie: 'activities',
    trip: 'trips',
    hotel: 'hotels',
    restaurant: 'restaurants',
    cruise: 'cruises',
    car: 'cars',
    flight: 'flights',
  };
  return pluralMap[type] || `${type}s`;
};

const fetchData = async (type) => {
  const endpoint = getApiEndpoint(type);
  const res = await api.get(`/${endpoint}`);
  return res.data;
};

// ─── Meta builder ─────────────────────────────────────────────────────────────
/**
 * Builds the `meta` array for ItemCard based on the item type.
 * Each entry: { label: string, value: string }
 */
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

    // activitie, trip – and everything else
    default:
      return [
        { label: 'Duration', value: item.duration || '—' },
        { label: 'Location', value: location },
        { label: 'Price', value: item.price ? `$${item.price}` : '—' },
        ...(hasGuide ? [{ label: 'Guide', value: hasGuide }] : []),
      ];
  }
};

// ─── Component ────────────────────────────────────────────────────────────────

const ContainerCatCard = ({
  type,
  data: externalData = null,
  isLoading: externalLoading = null,
  continent = null,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: queryData, isLoading } = useQuery({
    queryKey: [type],
    queryFn: () => fetchData(type),
    enabled: !externalData,
    staleTime: 5 * 60 * 1000,
  });

  const loading = externalLoading ?? isLoading;
  const rawData = externalData || queryData || [];
  const data = Array.isArray(rawData) ? rawData : rawData.data || [];

  // Title → prefer translation, fall back to raw type
  const sectionTitle = t(type, { defaultValue: type });

  // Helper: canonical item title
  const getItemTitle = (item) => {
    // Check for 'title' first (from API Resources), then fallback to 'name' variants
    if (item.title) return item.title;
    if (item.name || item.name_en) return item.name || item.name_en;
    if (item.from_location && item.to_location) return `${item.from_location} → ${item.to_location}`;
    return 'Untitled';
  };

  return (
    <>
      <style>{`
        .global-recommendations-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px 0;
        }
        .global-recommendations-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 24px;
          color: #1a1a1a;
          padding-left: 10px;
          border-left: 5px solid #1a73e8;
          text-transform: capitalize;
        }
        .global-recommendations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          padding-bottom: 40px;
        }
        /* Override ItemCard wrapper width constraints for grid flow */
        .global-recommendations-grid .item-card-wrapper {
          width: 100% !important;
          scroll-snap-align: none;
        }
        .loading-text {
          text-align: center;
          padding: 40px;
          font-size: 16px;
          color: #888;
        }
      `}</style>

      <div className="global-recommendations-section">
        <h2 className="global-recommendations-title">{sectionTitle}</h2>

        {loading ? (
          <div className="loading-text">Loading {sectionTitle}...</div>
        ) : data.length > 0 ? (
          <div className="global-recommendations-grid">
            {data.map((item, index) => (
              <ItemCard
                key={item.id ?? index}
                id={item.id}
                image={item?.images?.[0]}
                title={getItemTitle(item)}
                rating={parseFloat(item.rating ?? item.rate ?? item.average_rating ?? item.stars ?? 0)}
                meta={buildMeta(item, type)}
                type={type}
                to={item?.id ? `/itemdetail/${item.id}?type=${type}` : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="loading-text">No items available.</div>
        )}
      </div>
    </>
  );
};

export default ContainerCatCard;
