import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useQuery } from '@tanstack/react-query';
import api from '../../Radux/axios';
import { useNavigate } from 'react-router-dom';
import TypeBadge from '../Cards/TypeBadge';
import WatchlistButton from '../Buttons/WatchlistButton';

const fetchTrips = async () => {
  const res = await api.get('/trips');
  return res.data;
};

const ModernSlider = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: fetchTrips,
    staleTime: 1000 * 60 * 5,
  });
  const tripList = useMemo(() => data?.data || [], [data?.data]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItemsCount, setVisibleItemsCount] = useState(3);
  const navigate = useNavigate();

  const updateVisibleItems = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600) setVisibleItemsCount(1);
    else if (screenWidth <= 1024) setVisibleItemsCount(2);
    else setVisibleItemsCount(3);
  };

  useEffect(() => {
    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % tripList.length);
  }, [tripList.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? tripList.length - 1 : prev - 1
    );
  }, [tripList.length]);

  useEffect(() => {
    if (tripList.length === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [nextSlide, tripList.length]);

  const getFullImageUrl = (img) => {
    if (Array.isArray(img)) img = img[0];
    if (img && typeof img === 'object' && img.url) img = img.url;
    if (!img || typeof img !== "string") return "/fallback.svg";
    if (img.startsWith("http") || img.startsWith("data:")) return img;
    return `${import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8000'}${img}`;
  };


  return (
    <SliderWrapper $visibleItems={visibleItemsCount}>
      <div className="slider">
        <button className="prev" onClick={prevSlide}>
          <ArrowBackIcon />
        </button>
        <div className="items">
          {tripList.map((trip, index) => {
            const position = (index - currentIndex + tripList.length) % tripList.length;
            const isVisible = position < visibleItemsCount;

            return (
              <div
                key={trip.id}
                className={`item ${isVisible ? 'visible' : ''}`}
                style={{
                  transform: `translateX(${position * 100}%)`,
                  zIndex: isVisible ? 1 : 0,
                }}
                onClick={() => navigate(`/itemdetail/${trip.id}?type=trip`)}
              >
                <div className="card">
                  <div style={{ position: 'relative', width: '100%', height: '500px' }}>
                    <LazyLoadImage
                      src={getFullImageUrl(trip.images)}
                      alt={trip.title || trip.name}
                      height="500px"
                      width="100%"
                      effect="blur"
                    />
                    <div
                      style={{ position: 'absolute', top: 15, right: 15, zIndex: 10 }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <WatchlistButton type="trip" id={trip.id} title={trip.title || trip.name} />
                    </div>
                  </div>
                  <TypeBadge type="trip" />
                  <h3>{trip.title || trip.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <button className="next" onClick={nextSlide}>
          <ArrowForwardIcon />
        </button>
      </div>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  --visible-items: ${(props) => props.$visibleItems};
  .slider {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 80%;
    margin: auto;
    overflow: hidden;
    height: 600px;
    margin-top: 30px;
  }

  .items {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .item {
    flex: 0 0 100%;
    position: absolute;
    width: calc(100% / var(--visible-items));
    text-align: center;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.5s ease-in-out;
    cursor: pointer;
  }

  .item.visible {
    opacity: 1;
  }

  .card {
    background: transparent !important;
    border-radius: 8px;
    padding: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .card img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 8px;
  }

  .card h3 {
    position: absolute;
    bottom: 5%;
    left: 10%;
    font-size: 1.2rem;
    color: white !important;
    text-shadow: 1px 1px 3px black;
  }

  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: #333;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;
    z-index: 2;
  }

  .prev {
    left: 10px;
  }

  .next {
    right: 10px;
  }
`;

export default ModernSlider;
