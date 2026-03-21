import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../Radux/axios';

import CityContent from '../../Component/City/CityContent';
import citiesData from '../../Component/City/citiesData';
import HeroCar from '../../Component/Home/Hero/HeroCar';
import car from '../../Assets/images/tony-lee-i_XLLP08BOc-unsplash.jpg';
import style from '../../Style/Hotel/Hotel.module.css';
import { CheckboxFilter } from '../../Utility/Buttons/CheckboxFilter/CheckboxFilter';
import RangeSlider from '../../Utility/Buttons/RangeSlider/RangeSlider';
import WestIcon from '@mui/icons-material/West';
import HotelCard from '../../Utility/Cards/HotelCard'; // استبدله بـ ActivityCard لو متوفر

export const AllThings = () => {
  const { cityName } = useParams();
  const cityInfo = citiesData.find(city => city.name === cityName);

  const { data, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: () => api.get('/activities').then(res => res.data)
  });

  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!cityInfo) return <p>No city found.</p>;

  const activities = data?.data || [];

  const allCityActivities = activities.filter(
    (a) => a.location?.toLowerCase().includes(cityName.toLowerCase())
  );

  const filteredActivities = allCityActivities.filter((item) => {
    const priceMatch = item.price >= priceRange[0] && item.price <= priceRange[1];
    const allFiltersMatch = Object.entries(filters).every(([key, selectedValues]) => {
      if (!selectedValues.length) return true;
      const itemValue = (item[key] || '').toLowerCase();
      return selectedValues.some(val => itemValue.includes(val.toLowerCase()));
    });
    return priceMatch && allFiltersMatch;
  });

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filterOptions = {
    Category_types: ['Attractions', 'Tours', 'Day Trips', 'Outdoor Activities'],
    Product_Categories: ['Day Trips', 'Rail Tours'],
    Traveler_rating: ['5 Star', '4 Star', '3 Star'],
    Duration: ['Up to 1 hour', '1 to 4 hours', '4 hours to 1 day'],
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
      <HeroCar image={car} />
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
