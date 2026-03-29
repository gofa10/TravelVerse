import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../../Component/Shared/HeroSection';
import CityContent from '../../Component/City/CityContent';
import Head from '../../Component/Trips/Head';
import RangeSlider from '../../Utility/Buttons/RangeSlider/RangeSlider';
import { CheckboxFilter } from '../../Utility/Buttons/CheckboxFilter/CheckboxFilter';
import CarsCard from '../../Utility/Cards/CarsCard';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import ErrorMessage from '../../Component/Shared/ErrorMessage';
import EmptyState from '../../Component/Shared/EmptyState';
import citiesData from '../../Component/City/citiesData';
import car from '../../Assets/images/Top 10 Best 4K Ultra HD Cars Wallpapers For Windows 87XP Download.jpg';
import { useQuery } from '@tanstack/react-query';
import api from '../../Radux/axios';
import {
  setSearchQuery as setCarSearchQuery,
  selectCarSearchQuery,
  selectFilteredCars,
} from '../../Radux/Slices/carSlice';

const fetchCars = async () => {
  const { data } = await api.get('/cars');
  return data;
};

export const Cars = () => {
  const { cityName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Car Rentals | TravelVerse";
  }, []);
  const searchQuery = useSelector(selectCarSearchQuery);
  const normalizedCityName = cityName?.trim().toLowerCase() || 'all';
  const isAllCities = normalizedCityName === 'all';
  const cityInfo = isAllCities ? { name: 'All' } : citiesData.find(city => city.name === cityName);
  const displayLocationName = cityInfo?.name || cityName || 'All';

  const { data: carsData = { data: [] }, isLoading: loading, error, refetch } = useQuery({
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

  useEffect(() => {
    return () => {
      dispatch(setCarSearchQuery(''));
    };
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filterOptions = {
    CarSpecifications: ['Air conditioning', 'Automatic transmission', '4 Doors'],
    Supplier: ['Green Motion', 'Autounion', 'Avis', 'Budget'],
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

  const carList = Array.isArray(carsData?.data)
    ? carsData.data
    : Array.isArray(carsData?.data?.items)
      ? carsData.data.items
      : [];
  const searchedCars = selectFilteredCars({ car: { searchQuery } }, carList);

  let filteredCars = searchedCars.filter(c => {
    if (!c || !c.location) return false;
    const inCity = isAllCities || c.location.toLowerCase().includes(normalizedCityName);
    const inPriceRange =
      parseFloat(c.price) >= filters.priceRange[0] &&
      parseFloat(c.price) <= filters.priceRange[1];
    return inCity && inPriceRange;
  });

  // Apply additional filters
  filteredCars = filteredCars.filter(car => {
    // Check CarSpecifications filter
    if (filters.CarSpecifications && filters.CarSpecifications.length > 0) {
      const specs = (car.car_specification || '').toLowerCase();
      const hasAirConditioning = filters.CarSpecifications.includes('Air conditioning') && specs.includes('air');
      const hasAutomaticTransmission = filters.CarSpecifications.includes('Automatic transmission') && specs.includes('automatic');
      const hasFourDoors = filters.CarSpecifications.includes('4 Doors'); // Assume all cars have 4 doors for now

      const selectedSpecs = filters.CarSpecifications;
      const specsMatch =
        (!selectedSpecs.includes('Air conditioning') || hasAirConditioning) &&
        (!selectedSpecs.includes('Automatic transmission') || hasAutomaticTransmission) &&
        (!selectedSpecs.includes('4 Doors') || hasFourDoors);

      if (!specsMatch) return false;
    }

    // Check Supplier filter
    if (filters.Supplier && filters.Supplier.length > 0) {
      const brand = (car.brand || '').toLowerCase();
      const supplierMatch = filters.Supplier.some(s =>
        brand.includes(s.toLowerCase())
      );
      if (!supplierMatch) return false;
    }

    return true;
  });

  if (sortOption === 'Price (high to low)') {
    filteredCars.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sortOption === 'Price (low to high)') {
    filteredCars.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCars = filteredCars.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <LoadingSpinner size="lg" fullPage />;
  if (error) return <ErrorMessage message={error?.message ?? error.toString()} onRetry={refetch} />;

  return (
    <div>
      <HeroSection
        image={car}
        title="Rent Your Perfect Car"
        subtitle="Best deals on car rentals worldwide"
        placeholder="Search cars or locations..."
        onSearch={(query) => dispatch(setCarSearchQuery(query))}
        overlayIntensity="medium"
      />
      <CityContent countryName={displayLocationName} />
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
                selected={filters[title] || []}
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
            {filteredCars.length > 0 ? (
              <>
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
              </>
            ) : (
              <EmptyState title="No cars available" subtitle="Try another location" icon="🚗" />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cars;
