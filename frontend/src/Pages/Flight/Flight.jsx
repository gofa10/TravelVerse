import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../Radux/axios';
import CityContent from '../../Component/City/CityContent';
import citiesData from '../../Component/City/citiesData';
import FlightCard from '../../Utility/Cards/FlightCard';
import FlightFilter from '../../Component/Flight/FlightFilter';
import FlightCardPlaceholder from '../../Utility/Cards/FlightCardPlaceholder';
import HeroSection from '../../Component/Shared/HeroSection';
import car from '../../Assets/images/pexels-marina-hinic-199169-730778.jpg';
import {
  setSearchQuery as setFlightSearchQuery,
  selectFlightSearchQuery,
  selectFilteredFlights,
} from '../../Radux/Slices/flightSlice';

const BACKEND = '';

export const Flight = () => {
  const { cityName } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Flights | TravelVerse";
  }, []);

  const searchQuery = useSelector(selectFlightSearchQuery);
  const normalizedCityName = cityName?.trim().toLowerCase() || 'all';
  const isAllCities = normalizedCityName === 'all';
  const cityInfo = isAllCities ? { name: 'All' } : citiesData.find(city => city.name === cityName);
  const displayLocationName = cityInfo?.name || cityName || 'All';
  const destinationCode = cityInfo?.airportCode || '';

  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchMeta, setSearchMeta] = useState(null);

  const handleSearch = async (params) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setFlights([]);

    try {
      const res = await api.get(`${BACKEND}/google-flights`, { params });
      const responseData = res.data.data;
      setFlights(responseData?.flights || []);
      setSearchMeta({
        from: responseData?.from,
        to: responseData?.to,
        date: responseData?.date,
        currency: responseData?.currency,
        source: responseData?.source,
        total: responseData?.total,
      });
    } catch (err) {
      console.error('Flight search error:', err);
      setError(
        err.response?.data?.message ||
        'Could not fetch flights. Please check your backend is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const sortFlights = (arr, sortKey) => {
    if (!arr || arr.length === 0) return arr;
    const copy = [...arr];
    if (sortKey === 'price_asc') return copy.sort((a, b) => a.price - b.price);
    if (sortKey === 'price_desc') return copy.sort((a, b) => b.price - a.price);
    if (sortKey === 'duration') return copy.sort((a, b) => a.duration_raw - b.duration_raw);
    return copy; // best (default)
  };

  const [sortKey, setSortKey] = useState('best');
  const sortedFlights = sortFlights(flights, sortKey);
  const searchedFlights = selectFilteredFlights({ flight: { searchQuery } }, sortedFlights);

  useEffect(() => {
    return () => {
      dispatch(setFlightSearchQuery(''));
    };
  }, [dispatch]);

  const FlightSearchForm = () => (
    <FlightFilter
      destinationCode={destinationCode}
      onSearch={handleSearch}
      isSearching={isLoading}
      heroMode
    />
  );

  return (
    <div>
      <div
        style={{
          '--hero-height': '80vh',
          '--hero-min-height': '680px',
          '--hero-content-justify': 'flex-start',
          '--hero-content-top': '72px',
        }}
      >
        <HeroSection
          image={car}
          title="Find the Best Flights"
          subtitle="Compare and book flights worldwide"
          heroContent={<FlightSearchForm />}
          onSearch={(query) => dispatch(setFlightSearchQuery(query))}
          overlayIntensity="medium"
        />
      </div>
      <CityContent countryName={displayLocationName} />

      <Container className="mt-2">
        {/* Results header */}
        {hasSearched && !isLoading && !error && (
          <Row className="align-items-center mb-3">
            <Col>
              <h5 className="mb-0 fw-bold">
                {searchedFlights.length > 0
                  ? `✈️ ${searchedFlights.length} ${t('flightsFound') || 'flights found'}`
                  : `${t('noFlightsFound') || 'No flights found'} — try different dates`
                }
                {searchMeta?.source === 'mock' && (
                  <span
                    style={{
                      fontSize: "11px", marginLeft: "8px", padding: "2px 8px",
                      background: "#f0c040", borderRadius: "6px", color: "#333", fontWeight: 400,
                    }}
                  >
                    Demo Data
                  </span>
                )}
              </h5>
              {searchMeta && (
                <small className="text-muted">
                  {searchMeta.from} → {searchMeta.to} · {searchMeta.date}
                </small>
              )}
            </Col>
            {searchedFlights.length > 0 && (
              <Col xs="auto">
                <select
                  className="form-select form-select-sm"
                  value={sortKey}
                  onChange={e => setSortKey(e.target.value)}
                  style={{ borderRadius: "8px", minWidth: "160px" }}
                >
                  <option value="best">Best Match</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                  <option value="duration">Shortest Duration</option>
                </select>
              </Col>
            )}
          </Row>
        )}

        {/* Welcome message when not searched yet */}
        {!hasSearched && (
          <div className="text-center py-5">
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>✈️</div>
            <h4 className="fw-bold mb-2">Find the best flights to {displayLocationName}</h4>
            <p className="text-muted">
              {destinationCode
                ? `Use the search above to find available flights. The destination is pre-filled with ${displayLocationName} (${destinationCode}).`
                : `Use the search above to find available flights to ${displayLocationName}.`
              }
            </p>
          </div>
        )}

        {/* Loading skeletons */}
        {isLoading && (
          <Row>
            <Col xs={12}>
              <FlightCardPlaceholder />
              <FlightCardPlaceholder />
              <FlightCardPlaceholder />
            </Col>
          </Row>
        )}

        {/* Error state */}
        {error && (
          <div
            style={{
              background: "#fff3cd", border: "1px solid #ffc107",
              borderRadius: "12px", padding: "20px 24px", marginBottom: "16px",
              display: "flex", alignItems: "center", gap: "12px",
            }}
          >
            <span style={{ fontSize: "24px" }}>⚠️</span>
            <div>
              <strong>Search failed</strong>
              <p className="mb-0 mt-1 text-muted" style={{ fontSize: "14px" }}>{error}</p>
            </div>
          </div>
        )}

        {/* Flight cards */}
        {!isLoading && searchedFlights.length > 0 && (
          <Row>
            <Col xs={12}>
              {searchedFlights.map((flight) => (
                <FlightCard key={flight.id} data={flight} currency={searchMeta?.currency || 'USD'} />
              ))}
            </Col>
          </Row>
        )}

        {/* No results */}
        {hasSearched && !isLoading && !error && searchedFlights.length === 0 && (
          <div className="text-center py-5">
            <div style={{ fontSize: "64px" }}>🔍</div>
            <h5 className="mt-3">No flights found</h5>
            <p className="text-muted">Try different dates or airports.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Flight;
