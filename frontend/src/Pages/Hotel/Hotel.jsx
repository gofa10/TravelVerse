// Hotel.jsx
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroHotel from '../../Component/Hotel/HeroHotel';
import CityContent from '../../Component/City/CityContent';
import citiesData from '../../Component/City/citiesData';
import DateFilter from '../../Component/Hotel/DateFilter';
import Head from '../../Component/Trips/Head';
import style from '../../Style/Hotel/Hotel.module.css';
import HotelCard from '../../Utility/Cards/HotelCard';
import { CheckboxFilter } from '../../Utility/Buttons/CheckboxFilter/CheckboxFilter';
import Skeleton from '@mui/material/Skeleton';
import { MDBCard, MDBCardBody, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { useQuery } from '@tanstack/react-query';
import api from '../../Radux/axios';

// Fetch all hotels with pagination
const fetchAllHotels = async () => {
  let page = 1;
  let allData = [];
  let lastPage = 1;

  do {
    const res = await api.get(`/hotels?page=${page}`);
    const responseData = res.data;
    allData = [...allData, ...responseData.data];
    lastPage = responseData.last_page;
    page++;
  } while (page <= lastPage);

  return allData;
};

const Hotel = () => {
  const { cityName } = useParams();
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryKey: ['allHotels'],
    queryFn: fetchAllHotels,
  });

  const cityInfo = citiesData.find(city => city.name === cityName);

  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState(null);
  const [filteredHotels, setFilteredHotels] = useState([]);

  // Keys only, not labels
  const allFilters = {
    amenities: ['pool', 'free_parking', 'free_wifi', 'breakfast_included', 'beach', 'diving'],
    hotelClass: ['5_star', '4_star', '3_star', '2_star', '1_star'],
    style: ['budget', 'mid_range', 'luxury', 'romantic', 'family_friendly', 'modern', 'business', 'ocean_view']
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
            // style is a string, check if it matches any selected style
            return values.some(v => hotel.style?.toLowerCase() === v.toLowerCase());
          }
          if (key === 'hotelClass') {
            // class is a string with the star rating (e.g., "5", "4")
            return values.some(v => {
              const classNum = v.split('_')[0]; // "5_star" -> "5"
              return hotel.class === classNum;
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

    setFilteredHotels(result);
  }, [filters, data, cityName, sortBy]);

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

  return (
    <div>
      <HeroHotel />
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
            {isLoading
              ? renderSkeleton()
              : filteredHotels.length > 0
              ? filteredHotels.map((hotel, index) => (
                  <HotelCard key={index} data={hotel} type="hotel" />
                ))
              : <p>{t('noHotelsFound')}</p>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hotel;
