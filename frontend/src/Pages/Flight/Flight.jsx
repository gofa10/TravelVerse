import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../Radux/axios';
import CityContent from '../../Component/City/CityContent';
import citiesData from '../../Component/City/citiesData';
import FlightCard from '../../Utility/Cards/FlightCard';
import FlightFilter from '../../Component/Flight/FlightFilter';
import FlightCardPlaceholder from '../../Utility/Cards/FlightCardPlaceholder';
import HeroCar from '../../Component/Home/Hero/HeroCar';
import car from '../../Assets/images/pexels-marina-hinic-199169-730778.jpg';

const BACKEND = '';

export const Flight = () => {
  const { cityName } = useParams();
  const { t } = useTranslation();
  const cityInfo = citiesData.find(city => city.name === cityName);

  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchMeta, setSearchMeta] = useState(null);

  if (!cityInfo) return <p className="text-center mt-5">{t('noCityFound')}</p>;

  const handleSearch = async (params) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setFlights([]);

    try {
      const res = await api.get(`${BACKEND}/google-flights`, { params });
      const data = res.data;
      setFlights(data.flights || []);
      setSearchMeta({
        from: data.from,
        to: data.to,
        date: data.date,
        currency: data.currency,
        source: data.source,
        total: data.total,
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

  return (
    <div>
      <HeroCar image={car} />

      {/* Flight Search Filter */}
      <FlightFilter
        destinationCode={cityInfo.airportCode}
        onSearch={handleSearch}
        isSearching={isLoading}
      />

      <CityContent countryName={cityInfo.name} />

      <Container className="mt-2">
        {/* Results header */}
        {hasSearched && !isLoading && !error && (
          <Row className="align-items-center mb-3">
            <Col>
              <h5 className="mb-0 fw-bold">
                {sortedFlights.length > 0
                  ? `✈️ ${sortedFlights.length} ${t('flightsFound') || 'flights found'}`
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
            {sortedFlights.length > 0 && (
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
            <h4 className="fw-bold mb-2">Find the best flights to {cityInfo.name}</h4>
            <p className="text-muted">
              Use the search above to find available flights. The destination is pre-filled with {cityInfo.name} ({cityInfo.airportCode}).
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
        {!isLoading && sortedFlights.length > 0 && (
          <Row>
            <Col xs={12}>
              {sortedFlights.map((flight) => (
                <FlightCard key={flight.id} data={flight} currency={searchMeta?.currency || 'USD'} />
              ))}
            </Col>
          </Row>
        )}

        {/* No results */}
        {hasSearched && !isLoading && !error && sortedFlights.length === 0 && (
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
