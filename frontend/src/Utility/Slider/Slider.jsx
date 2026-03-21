import React, { useState } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Rating } from "@mui/material";
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WatchlistButton from '../Buttons/WatchlistButton';

const Slider = ({ data = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItemsCount = 4;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visibleItemsCount) % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - visibleItemsCount + data.length) % data.length);
  };
  console.log(data);

  return (
    <SliderWrapper visibleItems={visibleItemsCount}>
      <div className="slider">
        <button className="prev" onClick={prevSlide}>
          <ArrowBackIcon />
        </button>
        <div className="items">
          {data.map((item, index) => {
            const position = (index - currentIndex + data.length) % data.length;
            const isVisible = position < visibleItemsCount;

            return (
              <div key={index} className={`item ${isVisible ? 'visible' : ''}`} style={{
                transform: `translateX(${position * 100}%)`,
                zIndex: isVisible ? 1 : 0,
              }}>
                <Link to={`/itemdetail/${item.id}?type=${'activitie'}`}>

                  <div className="card">
                    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                      <LazyLoadImage
                        src={item?.images?.[0]}
                        alt={item.title || item.name_en || item.name}
                        effect="blur"
                        height="300px"
                        width="100%"
                      />
                      <div
                        style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <WatchlistButton type="activitie" id={item.id} title={item.title || item.name_en || item.name} />
                      </div>
                    </div>
                    <h5>{item.title || item.name_en || item.name}</h5>
                    <Rating value={Number(item.rating ?? item.rate) || 0} readOnly precision={0.5} />
                    <p className="details">
                      <span>Duration: {item.duration || 'N/A'}</span>
                      <span>Location: {item.location || 'Unknown'}</span>
                    </p>
                    <p className="details">
                      <span>Price: ${item.price}</span>
                      <span>Guide: {item.live_guide ? 'Yes' : 'No'}</span>
                    </p>
                  </div>
                </Link>
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
  --visible-items: ${(props) => props.visibleItems};

  .slider {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: auto;
    overflow: hidden;
    height: 500px;
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
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.5s ease-in-out;
  }

  .item.visible {
    opacity: 1;
  }

  .card {
    background: inherit;
    border-radius: 12px;
    padding: 15px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    color: inherit;
    text-align: center;
    transition: transform 0.3s;
  }

  .card:hover {
    transform: translateY(-5px);
  }

  h5 {
    margin: 10px 0;
    font-size: 1.1rem;
    text-align: center;
  }

  .details {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 0.9rem;
    margin: 5px 0;
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

  a {
    text-decoration: none;
    color: inherit;
    width: 100%;
  }
`;

export default Slider;
