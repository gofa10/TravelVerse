import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeroCity from '../../Component/City/HeroCity';
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

const fetchAll = async (endpoint) => {
  const { data } = await api.get(`/${endpoint}`);
  return data?.data || [];
};


const City = () => {
  const [selectedData, setSelectedData] = useState([]);
  const { cityName } = useParams();

  const cityInfo = citiesData.find(city => city.name === cityName);

  const { data: trips = [] } = useQuery({ queryKey: ['trips'], queryFn: () => fetchAll('trips') });
const { data: hotels = [] } = useQuery({ queryKey: ['hotels'], queryFn: () => fetchAll('hotels') });
const { data: restaurants = [] } = useQuery({ queryKey: ['restaurants'], queryFn: () => fetchAll('restaurants') });
const { data: activities = [] } = useQuery({ queryKey: ['activities'], queryFn: () => fetchAll('activities') });


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

  return (
    <>
      <CityContent countryName={cityInfo.name} />

      {/* عرض الفنادق */}
      <ContainerCatCard type="hotel" data={filterByCity(hotels)} />

      {/* عرض المطاعم */}
      <ContainerCatCard type="restaurant" data={filterByCity(restaurants)} />

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
      <ContainerCatCard type="trip" data={filterByCity(trips)} />

      {/* عرض الأنشطة داخل المدينة */}
      <ContainerCatCard type="activitie" data={filterByCity(activities)} />
    </>
  );
};

export default City;
