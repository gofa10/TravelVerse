import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../Radux/axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import CityContent from '../../Component/City/CityContent';
import citiesData from '../../Component/City/citiesData';
import HeroSection from '../../Component/Shared/HeroSection';
import car from '../../Assets/images/tony-lee-i_XLLP08BOc-unsplash.jpg';
import style from '../../Style/Hotel/Hotel.module.css';
import { CheckboxFilter } from '../../Utility/Buttons/CheckboxFilter/CheckboxFilter';
import RangeSlider from '../../Utility/Buttons/RangeSlider/RangeSlider';
import WestIcon from '@mui/icons-material/West';
import HotelCard from '../../Utility/Cards/HotelCard'; // استبدله بـ ActivityCard لو متوفر
import {
  selectActivitySearchQuery,
  setSearchQuery as setActivitySearchQuery,
  selectFilteredActivities,
} from '../../Radux/Slices/activitySlice';

export const AllThings = () => {
  const { cityName } = useParams();
  const { t } = useTranslation();
  
  useEffect(() => {
    document.title = "Activity Details | TravelVerse";
  }, []);
  
  const cityInfo = citiesData.find(city => city.name === cityName);
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectActivitySearchQuery);

  const { data, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: () => api.get('/activities').then(res => res.data)
  });

  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filters, setFilters] = useState({
    Category_types: [],
    Product_Categories: [],
    Traveler_rating: [],
    Duration: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    return () => {
      dispatch(setActivitySearchQuery(''));
    };
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (!cityInfo) return <p>No city found.</p>;

  const activities = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.items)
      ? data.data.items
      : [];

  const allCityActivities = activities.filter(
    (a) => a.location?.toLowerCase().includes(cityName.toLowerCase())
  );
  const searchedActivities = selectFilteredActivities({ activity: { searchQuery } }, allCityActivities);

  const filteredActivities = searchedActivities.filter((item) => {
    const priceMatch = item.price >= priceRange[0] && item.price <= priceRange[1];

    // Check Category_types filter
    if (filters.Category_types && filters.Category_types.length > 0) {
      if (!item.type || !filters.Category_types.includes(item.type)) {
        return false;
      }
    }

    // Check Traveler_rating filter
    if (filters.Traveler_rating && filters.Traveler_rating.length > 0) {
      const itemRate = parseFloat(item.rate) || 0;
      const hasMatchingRating = filters.Traveler_rating.some(rating => {
        const filterRating = parseFloat(rating) || 0;
        return itemRate >= filterRating;
      });
      if (!hasMatchingRating) return false;
    }

    // Check Duration filter
    if (filters.Duration && filters.Duration.length > 0) {
      const duration = item.duration || '';
      let matchesDuration = false;

      if (filters.Duration.includes('Up to 1 hour') && (duration.includes('h') && parseInt(duration) <= 1)) {
        matchesDuration = true;
      }
      if (filters.Duration.includes('1 to 4 hours') && duration.includes('h') && parseInt(duration) > 1 && parseInt(duration) <= 4) {
        matchesDuration = true;
      }
      if (filters.Duration.includes('4 hours to 1 day') && duration.includes('h') && parseInt(duration) > 4 && parseInt(duration) <= 24) {
        matchesDuration = true;
      }
      if (filters.Duration.includes('Multi-day') && duration.includes('day')) {
        matchesDuration = true;
      }

      if (!matchesDuration) return false;
    }

    return priceMatch;
  });

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filterOptions = {
    Category_types: ['Recommended for You', 'Full-day Tours', 'Multi-day Tours'],
    Product_Categories: ['Day Trips', 'Rail Tours'],
    Traveler_rating: ['5', '4.5', '4', '3.5', '3'],
    Duration: ['Up to 1 hour', '1 to 4 hours', '4 hours to 1 day', 'Multi-day'],
  };

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const current = prev[category] || [];
      const newValues = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: newValues };
    });
    setCurrentPage(1);
  };

  const handleRangeChange = (value) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  return (
    <>
      <HeroSection
        image={car}
        title="Discover Things To Do"
        subtitle="Experiences, tours & adventures worldwide"
        placeholder="Search activities or destinations..."
        onSearch={(query) => dispatch(setActivitySearchQuery(query))}
        overlayIntensity="medium"
      />
      <CityContent countryName={cityInfo.name} />
      <h1 className='m-auto my-4' style={{ width: 'fit-content' }}>All Activities in {cityInfo.name}</h1>
      <Container>
        <Row className={style.head}>
          <Link to={`/thingstodo/${cityInfo.name}`} style={{ textDecoration: 'none' }}>
            <h3><WestIcon /> Go Back</h3>
          </Link>

          <Col xs={2}>
            <RangeSlider
              min={0}
              max={2000}
              initialValue={priceRange}
              onChange={handleRangeChange}
            />
            {Object.entries(filterOptions).map(([title, options], index) => (
              <CheckboxFilter
                key={index}
                title={title}
                option={options}
                onChange={handleCheckboxChange}
                selected={filters[title] || []}
              />
            ))}
          </Col>

          <Col xs={10}>
            {(isLoading ? Array(itemsPerPage).fill({}) : paginatedActivities).map((item, index) => (
              <HotelCard key={index} data={item} type="activity" />

            ))}
            {!isLoading && paginatedActivities.length === 0 && (
              <p className="text-muted text-center">لا توجد أنشطة مطابقة للفلاتر.</p>
            )}

            {!isLoading && totalPages > 1 && (
              <div className="pagination d-flex justify-content-center mt-4">
                <button className="btn btn-outline-secondary mx-1" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>السابق</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`btn mx-1 ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                ))}
                <button className="btn btn-outline-secondary mx-1" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>التالي</button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
