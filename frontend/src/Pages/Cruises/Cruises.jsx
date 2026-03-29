import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../Radux/axios';

import CityContent from '../../Component/City/CityContent';
import citiesData from '../../Component/City/citiesData';
import Head from '../../Component/Trips/Head';
import HeroSection from '../../Component/Shared/HeroSection';
import { CheckboxFilter } from '../../Utility/Buttons/CheckboxFilter/CheckboxFilter';
import HotelCard from '../../Utility/Cards/HotelCard';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import ErrorMessage from '../../Component/Shared/ErrorMessage';
import EmptyState from '../../Component/Shared/EmptyState';
import {
  setSearchQuery as setCruiseSearchQuery,
  selectCruiseSearchQuery,
  selectFilteredCruises,
} from '../../Radux/Slices/cruiseSlice';

import style from '../../Style/Hotel/Hotel.module.css';
import cruiseBg from '../../Assets/images/tecnomar-for-lamborghini-63-superyacht-motor-yacht-luxury-5026x3348-6233.jpg';

export const Cruises = () => {
  const { cityName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Cruises | TravelVerse";
  }, []);
  const searchQuery = useSelector(selectCruiseSearchQuery);
  const normalizedCityName = cityName?.trim().toLowerCase() || 'all';
  const isAllCities = normalizedCityName === 'all';
  const cityInfo = isAllCities ? { name: 'All' } : citiesData.find(city => city.name === cityName);
  const displayLocationName = cityInfo?.name || cityName || 'All';

  const [sortOption, setSortOption] = useState(null);
  const [filters, setFilters] = useState({
    propertyTypes: [],
    amenities: [],
    style: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    return () => {
      dispatch(setCruiseSearchQuery(''));
    };
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const { data: response = [], isLoading: loading, error, refetch } = useQuery({
    queryKey: ['cruises'],
    queryFn: async () => {
      const res = await api.get('/cruises');
      return res.data;
    },
  });

  const cruises = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response?.data?.items)
      ? response.data.items
      : [];
  const searchedCruises = selectFilteredCruises({ cruise: { searchQuery } }, cruises);

  const travelStyles = ['Best Value', 'Traveler Ranked', 'Price (low to high)', 'Price (high to low)'];

  const filterOptions = {
    propertyTypes: ['resort', 'yacht', 'luxury', 'standard'],
    amenities: ['pool', 'free_wifi', 'breakfast_included', 'beach'],
    style: ['romantic', 'family_friendly', 'modern', 'business'],
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

  let filteredCruises = searchedCruises.filter(cruise => {
    // Check propertyTypes filter
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      if (!cruise.property_type || !filters.propertyTypes.includes(cruise.property_type)) {
        return false;
      }
    }

    // Check amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      const cruiseAmenities = cruise.amenities || [];
      const hasAllAmenities = filters.amenities.every(amenity =>
        cruiseAmenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }

    // Check style filter
    if (filters.style && filters.style.length > 0) {
      if (!cruise.style || !filters.style.includes(cruise.style)) {
        return false;
      }
    }

    return true;
  });

  if (sortOption === 'Price (low to high)') {
    filteredCruises.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortOption === 'Price (high to low)') {
    filteredCruises.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  const totalPages = Math.ceil(filteredCruises.length / itemsPerPage);
  const paginatedCruises = filteredCruises.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <LoadingSpinner size="lg" fullPage />;
  if (error) return <ErrorMessage message={error?.message ?? error.toString()} onRetry={refetch} />;

  return (
    <div>
      <HeroSection
        image={cruiseBg}
        title="Explore the Open Sea"
        subtitle="Unforgettable cruise experiences"
        placeholder="Search cruises or destinations..."
        onSearch={(query) => dispatch(setCruiseSearchQuery(query))}
        overlayIntensity="medium"
      />
      <CityContent countryName={displayLocationName} />

      <Container>
        <Row className={style.head}>
          <Col>
            <h5>{filteredCruises.length} cruises found</h5>
          </Col>
          <Col style={{ maxWidth: 'fit-content' }}>
            <Head title="Sort by" options={travelStyles} selected={sortOption} onChange={setSortOption} />
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
            {filteredCruises.length === 0 ? (
              <EmptyState title="No cruises found" subtitle="Try different dates" icon="🚢" />
            ) : (
              <>
                {paginatedCruises.map((cruise, i) => (
                  <HotelCard key={i} data={cruise} type={'cruise'} />
                ))}
                <div className="d-flex justify-content-center mt-4 gap-2">
                  <Button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i}
                      variant={i + 1 === currentPage ? 'primary' : 'outline-primary'}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                    Next
                  </Button>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cruises;
