import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import HeroContinent from "../../Component/Continent/HeroContinent";
import ItemCard from "../../Utility/Cards/ItemCard";
import { continentData } from "./continentData";
import { useQuery } from "@tanstack/react-query";
import api from '../../Radux/axios';
import { useTranslation } from "react-i18next";

const fetchData = async (endpoint) => {
  const res = await api.get(`/${endpoint}`);
  return res.data;
};

// Extracted from ContainerCatCard to build meta uniformly
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

const Continent = () => {
  const { continent } = useParams();
  const { t } = useTranslation();
  const currentContinent = continentData(t)[continent];

  const { data: tripsData = [], isLoading: tripsLoading } = useQuery({
    queryKey: ["trips"],
    queryFn: () => fetchData("trips"),
    staleTime: 1000 * 60 * 5,
  });

  const { data: hotelsData = [], isLoading: hotelsLoading } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => fetchData("hotels"),
    staleTime: 1000 * 60 * 5,
  });

  const { data: restaurantsData = [], isLoading: restaurantsLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchData("restaurants"),
    staleTime: 1000 * 60 * 5,
  });

  const { data: activitiesData = [], isLoading: activitiesLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: () => fetchData("activities"),
    staleTime: 1000 * 60 * 5,
  });

  const filterByContinent = (items) => {
    if (!items) return [];
    return items.filter((item) =>
      currentContinent?.cities.some((city) =>
        item.location?.toLowerCase().includes(city.trim().toLowerCase())
      )
    );
  };

  const filteredTrips = useMemo(() => filterByContinent(tripsData?.data).map(item => ({ ...item, _type: 'trip' })), [continent, tripsData]);
  const filteredHotels = useMemo(() => filterByContinent(hotelsData?.data).map(item => ({ ...item, _type: 'hotel' })), [continent, hotelsData]);
  const filteredRestaurants = useMemo(() => filterByContinent(restaurantsData?.data).map(item => ({ ...item, _type: 'restaurant' })), [continent, restaurantsData]);
  const filteredActivities = useMemo(() => filterByContinent(activitiesData?.data).map(item => ({ ...item, _type: 'activitie' })), [continent, activitiesData]);

  // Aggregate and shuffle recommendations
  const recommendations = useMemo(() => {
    const combined = [...filteredTrips, ...filteredHotels, ...filteredRestaurants, ...filteredActivities];
    // Simple shuffle to interleave types
    return combined.sort(() => 0.5 - Math.random());
  }, [filteredTrips, filteredHotels, filteredRestaurants, filteredActivities]);

  const isLoading = tripsLoading || hotelsLoading || restaurantsLoading || activitiesLoading;

  return (
    <>
      <style>{`
        .recommendations-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }
        .recommendations-title {
          font-size: 32px;
          font-weight: 700;
          margin: 40px 0 30px;
          color: #1a1a1a;
          padding-left: 10px;
          border-left: 5px solid #1a73e8;
        }
        .recommendations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          padding-bottom: 60px;
        }
        /* Override ItemCard wrapper width constraints for grid flow */
        .recommendations-grid .item-card-wrapper {
          width: 100% !important;
          scroll-snap-align: none;
        }
        .loading-text {
          text-align: center;
          padding: 50px;
          font-size: 18px;
          color: #888;
        }
      `}</style>
      <div className="continent-wrapper">
        <HeroContinent {...currentContinent} cities={currentContinent?.cities} />

        <div className="recommendations-section">
          <h2 className="recommendations-title">Recommendations for You</h2>

          {isLoading ? (
            <div className="loading-text">Loading recommendations...</div>
          ) : recommendations.length > 0 ? (
            <div className="recommendations-grid">
              {recommendations.map((item, index) => (
                <ItemCard
                  key={`${item._type}-${item.id || index}`}
                  id={item.id}
                  type={item._type}
                  image={item?.images?.[0]}
                  title={getItemTitle(item)}
                  rating={parseFloat(item.rating ?? item.rate ?? item.average_rating ?? item.stars ?? 0)}
                  meta={buildMeta(item, item._type)}
                  to={item?.id ? `/itemdetail/${item.id}?type=${item._type}` : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="loading-text">No recommendations found for this continent.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Continent;
