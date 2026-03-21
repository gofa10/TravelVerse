import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../Radux/axios';

import CityContent from '../../Component/City/CityContent';
import citiesData from '../../Component/City/citiesData';
import Head from '../../Component/Trips/Head';
import HeroCar from '../../Component/Home/Hero/HeroCar';
import FlightFilter from '../../Component/Flight/FlightFilter';
import { CheckboxFilter } from '../../Utility/Buttons/CheckboxFilter/CheckboxFilter';
import HotelCard from '../../Utility/Cards/HotelCard';

import style from '../../Style/Hotel/Hotel.module.css';
import cruiseBg from '../../Assets/images/tecnomar-for-lamborghini-63-superyacht-motor-yacht-luxury-5026x3348-6233.jpg';

export const Cruises = () => {
  const { cityName } = useParams();
  const cityInfo = citiesData.find(city => city.name === cityName);

  const [sortOption, setSortOption] = useState(null);
  const [filters, setFilters] = useState({});
  const [flightFilters, setFlightFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const { data: cruises = [], isLoading: loading } = useQuery({
    queryKey: ['cruises'],
    queryFn: async () => {
      const res = await api.get('/cruises');
      return res.data.data;
    },
  });

  const travelStyles = ['Best Value', 'Traveler Ranked', 'Price (low to high)', 'Price (high to low)'];

  const filterOptions = {
    propertyTypes: ['Resort', 'Yacht', 'Luxury', 'Standard'],
    amenities: ['Pool', 'Free Wifi', 'All inclusive', 'Kids Friendly'],
    style: ['Romantic', 'Family', 'Adventure', 'Relax'],
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

  const handleFlightFiltersChange = (newFilters) => {
    setFlightFilters(newFilters);
  };

  if (!cityInfo) return <p>No city found.</p>;

  let filteredCruises = cruises.filter(c => {
    if (!c || !c.location) return false;
    return c.location.toLowerCase().includes(cityName.toLowerCase());
  });

  filteredCruises = filteredCruises.filter(c => {
    const fromMatch = flightFilters.from ? c.from?.toLowerCase().includes(flightFilters.from.toLowerCase()) : true;
    const toMatch = flightFilters.to ? c.to?.toLowerCase().includes(flightFilters.to.toLowerCase()) : true;
    const departMatch = flightFilters.departDate ? c.start_date?.includes(flightFilters.departDate) : true;
    const returnMatch = flightFilters.returnDate ? c.end_date?.includes(flightFilters.returnDate) : true;
    return fromMatch && toMatch && departMatch && returnMatch;
  });

  filteredCruises = filteredCruises.filter(c => {
    return Object.entries(filters).every(([key, values]) => {
      if (values.length === 0) return true;
      const fieldValue = c[key.toLowerCase()];
      if (Array.isArray(fieldValue)) {
        return values.every(v => fieldValue.includes(v));
      }
      return values.includes(fieldValue);
    });
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

  return (
    <div>
      <HeroCar image={cruiseBg} />
      <CityContent countryName={cityInfo.name} />

      <FlightFilter
        countryName={cityInfo.name}
        title="Cruises"
        onFilterChange={handleFlightFiltersChange}
      />

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
              <CheckboxFilter key={index} title={title} option={options} onChange={handleFilterChange} />
            ))}
          </Col>

          <Col xs={10}>
            {loading ? (
              <p>Loading cruises...</p>
            ) : filteredCruises.length === 0 ? (
              <p>No cruises found in {cityName}</p>
            ) : (
              <>
                {paginatedCruises.map((cruise, i) => (
                  <HotelCard key={i} data={cruise} type={'cruise'}/>
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
