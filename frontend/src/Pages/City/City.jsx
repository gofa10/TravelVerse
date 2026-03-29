import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContainerCatCard from '../../Component/Home/ContainerCatCard/ContainerCatCard';
import citiesData from '../../Component/City/citiesData';
import CityContent from '../../Component/City/CityContent';
import CityPoster from '../../Component/City/CityPoster';
import CommentCard from '../../Utility/Cards/CommentCard';
import {Container}  from 'react-bootstrap';
import style from '../../Style/City/City.module.css';
import comments from '../../Utility/Cards/Comments.json';
import { useQuery } from '@tanstack/react-query';
import api from '../../Radux/axios';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import ErrorMessage from '../../Component/Shared/ErrorMessage';
import EmptyState from '../../Component/Shared/EmptyState';


const fetchAll = async (endpoint) => {
  const { data } = await api.get(`/${endpoint}`);
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.items)) return data.data.items;
  return [];
};


const City = () => {
  const [selectedData, setSelectedData] = useState([]);
  const { cityName } = useParams();

  const cityInfo = citiesData.find(city => city.name === cityName);

  const { data: trips = [], isLoading: tLoading, error: tErr } = useQuery({ queryKey: ['trips'], queryFn: () => fetchAll('trips') });
  const { data: hotels = [], isLoading: hLoading, error: hErr } = useQuery({ queryKey: ['hotels'], queryFn: () => fetchAll('hotels') });
  const { data: restaurants = [], isLoading: rLoading, error: rErr } = useQuery({ queryKey: ['restaurants'], queryFn: () => fetchAll('restaurants') });
  const { data: activities = [], isLoading: aLoading, error: aErr } = useQuery({ queryKey: ['activities'], queryFn: () => fetchAll('activities') });

  const isLoading = tLoading || hLoading || rLoading || aLoading;
  const error = tErr || hErr || rErr || aErr;


  const filterByCity = (items = []) => {
  return Array.isArray(items)
    ? items.filter(item =>
        item.location?.toLowerCase().includes(cityName.toLowerCase())
      )
    : [];
};

    


// console.log(trips);

  useEffect(() => {
    setSelectedData(comments.slice(0, 3));
  }, []);

  if (!cityInfo) return <h2>City Not Found</h2>;

  if (isLoading) return <LoadingSpinner size="lg" fullPage />;
  if (error) return <ErrorMessage message={error?.message ?? error.toString()} />;

  const filteredTrips = filterByCity(trips);
  const filteredHotels = filterByCity(hotels);
  const filteredRestaurants = filterByCity(restaurants);
  const filteredActivities = filterByCity(activities);

  const allEmpty = filteredTrips.length === 0 && filteredHotels.length === 0 && filteredRestaurants.length === 0 && filteredActivities.length === 0;

  if (allEmpty) {
    return (
      <>
        <CityContent countryName={cityInfo.name} />
        <EmptyState title="Nothing here yet" subtitle="Explore other cities" icon="🌍" />
      </>
    );
  }

  return (
    <>
      <CityContent countryName={cityInfo.name} />

      {/* عرض الفنادق */}
      <ContainerCatCard type="hotel" data={filteredHotels} />

      {/* عرض المطاعم */}
      <ContainerCatCard type="restaurant" data={filteredRestaurants} />

      <CityPoster
        text={cityInfo.posterText}
        cityName={cityInfo.name}
      />

      {/* التعليقات */}
      <Container className={style.comment}>
        {selectedData.map(item => (
          <CommentCard
            key={item.id}
            name={item.name}
            image={item.image}
            description={item.description}
          />
        ))}
      </Container>

      {/* عرض الرحلات داخل المدينة */}
      <ContainerCatCard type="trip" data={filteredTrips} />

      {/* عرض الأنشطة داخل المدينة */}
      <ContainerCatCard type="activitie" data={filteredActivities} />
    </>
  );
};

export default City;
