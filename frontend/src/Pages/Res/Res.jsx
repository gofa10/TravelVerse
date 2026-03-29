import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroSection from '../../Component/Shared/HeroSection';
import CityContent from '../../Component/City/CityContent';
import citiesData from '../../Component/City/citiesData';
import Head from '../../Component/Trips/Head';
import HotelCard from '../../Utility/Cards/HotelCard.jsx';
import { CheckboxFilter } from '../../Utility/Buttons/CheckboxFilter/CheckboxFilter';
import style from '../../Style/Hotel/Hotel.module.css';
import car from '../../Assets/images/pexels-pixabay-262978.jpg';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import ErrorMessage from '../../Component/Shared/ErrorMessage';
import EmptyState from '../../Component/Shared/EmptyState';
import SkeletonCard from '../../Utility/Cards/SkeletonCard';
import { useQuery } from '@tanstack/react-query';
import api from '../../Radux/axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchQuery as setRestaurantSearchQuery,
  selectRestaurantSearchQuery,
  selectFilteredRestaurants,
} from '../../Radux/Slices/restaurantSlice';

const Restaurants = () => {
  const { cityName } = useParams();
  const { t } = useTranslation();

  React.useEffect(() => {
    document.title = "Restaurants | TravelVerse";
  }, []);

  const cityInfo = citiesData.find(city => city.name === cityName);
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectRestaurantSearchQuery);

  const [filters, setFilters] = useState({
    Cuisine: [],
    Features: [],
    Rating: [],
  });
  const [sortBy, setSortBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  React.useEffect(() => {
    return () => {
      dispatch(setRestaurantSearchQuery(''));
    };
  }, [dispatch]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const res = await api.get(`/restaurants`);
      const response = res.data;
      return Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];
    }
  });

  const filterOptions = {
    // PropertyType: [t('lunch'), t('dinner'), t('breakfast'), t('brunch')],
    Cuisine: [t('seafood'), t('mediterranean'), t('healthy'), t('egyptian'), t('italian'), t('arabic'), t('asian'), t('vegetarian')],
    Features: [t('freeWifi'), t('fullBar'), t('reservations'), t('seating'), t('validatedParking'), t('visa'), t('outdoorSeating'), t('delivery'), t('takeout'), t('liveMusic')],
    Rating: ['5', '4.5', '4', '3.5', '3']
  };

  const filterKeyMap = {
    PropertyType: 'property_type',
    Cuisine: 'cuisine',
    Features: 'features',
    Rating: 'rate'
  };

  const handleFilterChange = (title, option) => {
    setFilters(prev => {
      const current = prev[title] || [];
      const updated = current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option];
      return { ...prev, [title]: updated };
    });
    setCurrentPage(1);
  };

  const restaurantList = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.items)
      ? data.data.items
      : Array.isArray(data)
        ? data
        : [];
  const cityRestaurants = restaurantList.filter(r =>
    r.location?.toLowerCase().includes(cityName.toLowerCase())
  );
  const searchedRestaurants = selectFilteredRestaurants({ restaurant: { searchQuery } }, cityRestaurants);

  const filteredRestaurants = searchedRestaurants.filter(r => {
    const matchFilters = Object.entries(filters).every(([key, values]) => {
      if (values.length === 0) return true;
      const fieldKey = filterKeyMap[key];
      const fieldValue = r[fieldKey];

      if (!fieldValue) return false;

      if (Array.isArray(fieldValue)) {
        return values.every(v => fieldValue.includes(v));
      }

      if (typeof fieldValue === 'string') {
        return values.some(v => fieldValue.toLowerCase().includes(v.toLowerCase()));
      }

      return values.includes(fieldValue);
    });

    return matchFilters;
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === t('topRated')) return parseFloat(b.rate) - parseFloat(a.rate);
    if (sortBy === t('priceLowToHigh')) return a.price - b.price;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedRestaurants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedRestaurants.length / itemsPerPage);

  if (isLoading) return <LoadingSpinner size="lg" fullPage />;
  if (error) return <ErrorMessage message={error?.message ?? error.toString()} onRetry={refetch} />;

  return (
    <div>
      <HeroSection
        image={car}
        title="Find the Best Dining"
        subtitle="Local flavors & world cuisines"
        placeholder="Search restaurants or cuisines..."
        onSearch={(query) => dispatch(setRestaurantSearchQuery(query))}
        overlayIntensity="medium"
      />
      <CityContent countryName={cityInfo?.name} />

      <Container>
        <Row className={style.head} style={{ margin: '20px' }}>
          <Col>
            <h5>{sortedRestaurants.length} {t('handPickedRestaurants')}</h5>
          </Col>
          <Col style={{ maxWidth: 'fit-content' }}>
            <Head
              title={t('sortBy')}
              options={[t('topRated'), t('priceLowToHigh'), t('cuisine')]}
              selected={sortBy}
              onChange={setSortBy}
            />
          </Col>
        </Row>

        <Row className={style.head}>
          <Col xs={2}>
            {Object.entries(filterOptions).map(([title, options], index) => (
              <CheckboxFilter
                key={index}
                title={title}
                option={options}
                onChange={handleFilterChange}
                selected={filters[title] || []}
              />
            ))}
          </Col>

          <Col xs={10}>
            {sortedRestaurants.length === 0 ? (
              <EmptyState title="No restaurants found" subtitle="Try another area" icon="🍽️" />
            ) : (
              <>
                {currentItems.map(restaurant => (
                  <HotelCard key={restaurant.id} data={restaurant} type="restaurant" />
                ))}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-4 gap-2">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>{t('prev')}</button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? 'btn btn-primary' : 'btn btn-outline-primary'}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>{t('next')}</button>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Restaurants;
