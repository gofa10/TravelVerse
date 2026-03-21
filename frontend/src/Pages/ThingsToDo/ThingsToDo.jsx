import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import api from '../../Radux/axios';

import HeroCar from '../../Component/Home/Hero/HeroCar';
import CityContent from '../../Component/City/CityContent';
import ContainerCatCard from '../../Component/Home/ContainerCatCard/ContainerCatCard';
import Slider from '../../Utility/Slider/Slider';
import LoadMore from '../../Utility/Buttons/LoadMore/LoadMore';

import citiesData from '../../Component/City/citiesData';
import car from '../../Assets/images/pexels-sanmane-1365425.jpg';

const fetchAllActivities = async () => {
  let currentPage = 1;
  let allActivities = [];
  let lastPage = 1;

  do {
    const res = await api.get('/activities', {
      params: { page: currentPage }
    });
    const data = res.data;
    allActivities = [...allActivities, ...data.data];
    lastPage = data.last_page;
    currentPage++;
  } while (currentPage <= lastPage);

  return allActivities;
};

export const ThingsToDo = () => {
  const { cityName } = useParams();
  const { t } = useTranslation();
  const cityInfo = citiesData.find((city) => city.name === cityName);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: allActivities, isLoading } = useQuery({
    queryKey: ['activities', 'all'],
    queryFn: fetchAllActivities
  });

  if (!cityInfo) return <p>{t('noCityFound')}</p>;

  const cityActivities = (allActivities || []).filter((a) =>
    a.location?.toLowerCase().includes(cityName.toLowerCase())
  );

  const totalPages = Math.ceil(cityActivities.length / itemsPerPage);
  const paginatedActivities = cityActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activityTypes = Array.from(new Set(cityActivities.map((a) => a.type)));

  return (
    <div>
      <HeroCar image={car} />
      <CityContent countryName={cityInfo.name} />

      <Container>
        <h2 className='mt-4'>{t('topAttractionsIn')} {cityInfo.name}</h2>

        <Row>
          <Col md={12} className="mb-4">
            <ContainerCatCard
              type="activitie"
              data={paginatedActivities}
              isLoading={isLoading}
            />
          </Col>
        </Row>

        <div className='d-flex justify-content-center my-4'>
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>

        <h2 className='mt-5'>{t('exploreByActivityType')}</h2>
        {!isLoading && activityTypes.length === 0 && <p>{t('noActivityTypesAvailable')}</p>}

        {activityTypes.map((type, index) => {
          const filtered = cityActivities.filter((a) => a.type === type);
          return (
            <div key={index} className="mt-4">
              <h4 className="text-capitalize">{t(type, type.replace(/_/g, ' '))}</h4>
              <Slider data={filtered} />
            </div>
          );
        })}

        <div className='m-auto my-5' style={{ width: 'fit-content' }}>
          <Link to={`/allactivites/${cityInfo.name}`} style={{ textDecoration: 'none' }}>
            <LoadMore title={t('seeAllActivities')} />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default ThingsToDo;
