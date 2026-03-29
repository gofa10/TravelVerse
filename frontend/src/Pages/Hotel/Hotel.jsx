// Hotel.jsx
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroSection from '../../Component/Shared/HeroSection';
import CityContent from '../../Component/City/CityContent';
import citiesData from '../../Component/City/citiesData';
import DateFilter from '../../Component/Hotel/DateFilter';
import Head from '../../Component/Trips/Head';
import style from '../../Style/Hotel/Hotel.module.css';
import HotelCard from '../../Utility/Cards/HotelCard';
import { CheckboxFilter } from '../../Utility/Buttons/CheckboxFilter/CheckboxFilter';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import ErrorMessage from '../../Component/Shared/ErrorMessage';
import EmptyState from '../../Component/Shared/EmptyState';
import Skeleton from '@mui/material/Skeleton';
import { MDBCard, MDBCardBody, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { useQuery } from '@tanstack/react-query';
import api from '../../Radux/axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchQuery,
  selectHotelSearchQuery,
  selectFilteredHotels,
} from '../../Radux/Slices/hotelSlice';
import hotelHero from '../../assets/images/hotel_hero.jpg';

// Fetch all hotels with pagination
const fetchAllHotels = async () => {
  let page = 1;
  let allData = [];
  let lastPage = 1;

  do {
    const res = await api.get(`/hotels?page=${page}`);
    const responseData = res.data?.data;
    const pageItems = Array.isArray(responseData?.items)
      ? responseData.items
      : Array.isArray(responseData)
        ? responseData
        : [];
    allData = [...allData, ...pageItems];
    lastPage = responseData?.last_page || 1;
    page++;
  } while (page <= lastPage);

  return allData;
};

const Hotel = () => {
  const { cityName } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Hotels | TravelVerse";
  }, []);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['allHotels'],
    queryFn: fetchAllHotels,
  });

  const cityInfo = citiesData.find(city => city.name === cityName);
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectHotelSearchQuery);

  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState(null);
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    return () => dispatch(setSearchQuery(''));
  }, [dispatch]);

  // Keys only, not labels - updated to match actual data
  const allFilters = {
    amenities: ['Free parking', 'Pool', 'Free breakfast', 'Beach', 'Diving', 'Air conditioning', 'Bar / lounge', 'Fitness Center with Gym / Workout Room'],
    hotelClass: ['5 star', '4 star', '5', '4', '4.5'],
    style: ['Luxury', 'Romantic', 'Modern', 'Family', 'Classic', 'Ocean View', 'City View', 'Mountain View', 'Park View', 'Trendy', 'Quiet', 'Value']
  };

  const handleFilterChange = (title, option) => {
    setFilters(prev => {
      const current = prev[title] || [];
      const updated = current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option];
      return { ...prev, [title]: updated };
    });
  };

  useEffect(() => {
    if (!data) return;

    // Start filtering by city
    let result = data.filter(hotel =>
      hotel.location?.toLowerCase().includes(cityName.toLowerCase())
    );

    // Apply filters
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter(hotel => {
          if (key === 'amenities') {
            // amenities is an array in the hotel object
            return values.every(v => hotel.amenities?.includes(v));
          }
          if (key === 'style') {
            // style is a string with multiple styles separated by commas
            const hotelStyles = hotel.style?.split(',').map(s => s.trim().toLowerCase()) || [];
            return values.some(v => hotelStyles.includes(v.toLowerCase()));
          }
          if (key === 'hotelClass') {
            // class can be "5 star", "4 star", "5", "4", "4.5"
            return values.some(v => {
              // Handle both string and numeric comparisons
              if (v.includes('.')) {
                return hotel.class === v; // Exact match for "4.5"
              }
              if (v.includes('star')) {
                return hotel.class === v; // Exact match for "5 star"
              }
              // For numeric values, check if hotel class contains the number
              return hotel.class?.includes(v);
            });
          }
          return true;
        });
      }
    });

    // Apply sorting
    if (sortBy === 'Best Value') {
      result.sort((a, b) => b.rate - a.rate);
    } else if (sortBy === 'Price (low to high)') {
      result.sort((a, b) => a.price - b.price);
    }

    const searched = selectFilteredHotels({ hotel: { searchQuery } }, result);
    setFilteredHotels(searched);
  }, [filters, data, cityName, sortBy, searchQuery]);

  if (!cityInfo) return <p>No city found.</p>;

  // Skeleton Loader
  const renderSkeleton = () =>
    Array.from({ length: 3 }).map((_, index) => (
      <MDBRow key={index} className="justify-content-center mb-3">
        <MDBCol md="12" xl="10">
          <MDBCard className="shadow-0 border rounded-3">
            <MDBCardBody style={{ padding: '0' }}>
              <MDBRow>
                <MDBCol md="12" lg="5" className="mb-4 mb-lg-0">
                  <Skeleton variant="rectangular" height={200} width="100%" />
                </MDBCol>
                <MDBCol md="4">
                  <Skeleton height={40} width="80%" />
                  <Skeleton height={20} width="60%" />
                  <Skeleton height={60} width="90%" />
                </MDBCol>
                <MDBCol md="6" lg="3">
                  <Skeleton height={40} width="70%" />
                  <Skeleton height={40} width="90%" />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    ));

  if (isLoading) return <LoadingSpinner size="lg" fullPage />;
  if (error) return <ErrorMessage message={error?.message ?? error.toString()} onRetry={refetch} />;

  return (
    <div>
      <HeroSection
        image={hotelHero}
        title="Find Your Perfect Stay"
        subtitle="Explore thousands of hotels worldwide"
        placeholder="Search hotels or destinations..."
        onSearch={(query) => dispatch(setSearchQuery(query))}
        overlayIntensity="medium"
      />
      <CityContent countryName={cityInfo.name} />
      {/* <DateFilter countryName={cityInfo.name} /> */}
      <Container>
        <Row className={`${style.head} mb-3`}>
          <Col>
            <h5>{t('tailorMadeHotels')}</h5>
          </Col>
          <Col style={{ maxWidth: 'fit-content' }}>
            <Head
              title={t('sortBy')}
              options={[t('bestValue'), t('travelerRanked'), t('priceLowHigh')]}
              selected={sortBy}
              onChange={setSortBy}
            />
          </Col>
        </Row>

        <Row className={style.head}>
          <Col xs={2}>
            {Object.entries(allFilters).map(([title, options], index) => (
              <CheckboxFilter
                key={index}
                title={title}
                option={options}
                selected={filters[title] || []}
                onChange={handleFilterChange}
              />
            ))}
          </Col>

          <Col xs={10}>
            {filteredHotels.length > 0
                ? filteredHotels.map((hotel, index) => (
                  <HotelCard key={index} data={hotel} type="hotel" />
                ))
                : <EmptyState title="No hotels found" subtitle="Try different filters" icon="🏨" />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hotel;
