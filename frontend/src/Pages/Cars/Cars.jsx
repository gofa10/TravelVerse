import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row, Pagination } from 'react-bootstrap';
import HeroCar from '../../Component/Home/Hero/HeroCar';
import CityContent from '../../Component/City/CityContent';
import Head from '../../Component/Trips/Head';
import RangeSlider from '../../Utility/Buttons/RangeSlider/RangeSlider';
import { CheckboxFilter } from '../../Utility/Buttons/CheckboxFilter/CheckboxFilter';
import CarsCard from '../../Utility/Cards/CarsCard';
import citiesData from '../../Component/City/citiesData';
import car from '../../Assets/images/Top 10 Best 4K Ultra HD Cars Wallpapers For Windows 87XP Download.jpg';
import { useQuery } from '@tanstack/react-query';
import api from '../../Radux/axios';

const fetchCars = async () => {
  const { data } = await api.get('/cars');
  return data;
};

export const Cars = () => {
  const { cityName } = useParams();
  const cityInfo = citiesData.find(city => city.name === cityName);

  const { data: carsData = { data: [] }, isLoading: loading } = useQuery({
    queryKey: ['cars'],
    queryFn: fetchCars
  });

  const [sortOption, setSortOption] = useState(null);
  const [filters, setFilters] = useState({
    CarSpecifications: [],
    Supplier: [],
    priceRange: [0, 2000],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filterOptions = {
    CarSpecifications: ['Air conditioning', 'Automatic transmission', '4 Doors'],
    Supplier: ['Autounion', 'Avis', 'Budget', 'GreenMotion'],
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

  const handlePriceChange = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRange: range
    }));
    setCurrentPage(1);
  };

  const carList = carsData?.data || [];

  let filteredCars = carList.filter(c => {
    if (!c || !c.location) return false;
    const inCity = c.location.toLowerCase().includes(cityName.toLowerCase());
    const inPriceRange =
      parseFloat(c.price) >= filters.priceRange[0] &&
      parseFloat(c.price) <= filters.priceRange[1];
    return inCity && inPriceRange;
  });

  filteredCars = filteredCars.filter(car => {
    return Object.entries(filters).every(([key, values]) => {
      if (key === 'priceRange') return true;
      if (values.length === 0) return true;
      const fieldValue = car[key.toLowerCase()];
      if (Array.isArray(fieldValue)) {
        return values.every(v => fieldValue.includes(v));
      }
      return values.includes(fieldValue);
    });
  });

  if (sortOption === 'Price (high to low)') {
    filteredCars.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sortOption === 'Price (low to high)') {
    filteredCars.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCars = filteredCars.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <HeroCar image={car} />
      <CityContent countryName={cityInfo?.name} />
      <Container>
        <Row>
          <Col xs={3}>
            <RangeSlider
              min={0}
              max={2000}
              initialValue={filters.priceRange}
              onChange={handlePriceChange}
            />
            {Object.entries(filterOptions).map(([title, options], index) => (
              <CheckboxFilter
                key={index}
                title={title}
                option={options}
                onChange={handleFilterChange}
              />
            ))}
          </Col>
          <Col xs={9}>
            <Row className='d-flex justify-content-between my-4'>
              <Col>
                <h5>{filteredCars.length} cars found</h5>
              </Col>
              <Col style={{ maxWidth: 'fit-content' }}>
                <Head
                  title="Sort by"
                  options={['Price (high to low)', 'Price (low to high)']}
                  selected={sortOption}
                  onChange={setSortOption}
                />
              </Col>
            </Row>
            <CarsCard products={paginatedCars} loading={loading} />
            <Pagination className="justify-content-center mt-4">
              <Pagination.Prev
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages).keys()].map(num => (
                <Pagination.Item
                  key={num + 1}
                  active={currentPage === num + 1}
                  onClick={() => setCurrentPage(num + 1)}
                >
                  {num + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cars;
