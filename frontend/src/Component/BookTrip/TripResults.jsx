import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../Radux/axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import TripCard from '../../Utility/Cards/TripCard';
import { useTranslation } from 'react-i18next';

const fetchFilteredTrips = async (filters) => {
  const response = await api.get('/trips', {
    params: {
      type: filters.type,
      location: filters.country ? filters.country.label : null, // هنا
      partner: filters.partner,
      rate: filters.rating,
    },
    paramsSerializer: (params) => {
      const search = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val) search.append(key, val);
      });
      return search.toString();
    },
  });


  return response.data;
};


const TripResults = ({ filters }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['filteredTrips', filters],
    queryFn: () => fetchFilteredTrips(filters),
    enabled: !!filters, // فقط عند توفر الفلاتر
  });

  const trips = data?.data || [];
  console.log(filters);
  console.log(trips);

  const { t } = useTranslation();

  return (
    <Container className="my-5" style={{}}>
      <h3 className="text-center mb-4">{t("resultsTitle")}</h3>

      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : isError ? (
        <p className="text-danger text-center">{t("errorMessage")}</p>
      ) : trips.length === 0 ? (
        <p className="text-center">{t("noResults")}</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4}>
          {trips.map((trip) => (
            <Col key={trip.id} className="mb-4">
              <TripCard
                id={trip.id}
                image={trip.images}
                title={trip.name}
                duration={trip.duration}
                price={trip.price}
                description={trip.description}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default TripResults;
