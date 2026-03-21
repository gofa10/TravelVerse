import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import image6 from "../../../Assets/images/4K-Road-Forest-Turn-Wallpaper-3840x2160.jpg";
import image1 from "../../../Assets/images/BackgroundsWallpapersHD132668010814554363.jpg";
import image2 from "../../../Assets/images/backiee-223893.jpg";
import image3 from "../../../Assets/images/bharat-patil-WR5_Ev_bh-I-unsplash.jpg";
import image4 from "../../../Assets/images/pexels-hebaysal-773471.jpg";
import image5 from "../../../Assets/images/Marina-Bay-Sands-4K-Wallpaper-3840x2160.jpg";
import image9 from "../../../Assets/images/backiee-91181.jpg";
import image7 from "../../../Assets/images/backiee-63050.jpg";
import image8 from "../../../Assets/images/BackgroundsWallpapersHD132668886098506609.jpg";
import image10 from "../../../Assets/images/watercolor-sky-with-clouds-wind-flow-background.jpg";
import RotatingComponent from '../Test';

const HomeGalary = () => {
  const cards = [
    { index: 0, color: '142, 249, 252', image: image1 },
    { index: 1, color: '142, 252, 204', image: image2 },
    { index: 2, color: '142, 252, 157', image: image3 },
    { index: 3, color: '215, 252, 142', image: image4 },
    { index: 4, color: '252, 252, 142', image: image5 },
    { index: 5, color: '252, 208, 142', image: image6 },
    { index: 6, color: '252, 142, 142', image: image7 },
    { index: 7, color: '252, 142, 239', image: image8 },
    { index: 8, color: '204, 142, 252', image: image9 },
    { index: 9, color: '142, 202, 252', image: image4 },
  ];

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="inner">
          {/* وضع RotatingComponent في المنتصف */}
          {/* <div className="rotating-component-wrapper">
            <RotatingComponent />
          </div> */}
          {cards.map((card) => (
            <div
              key={card.index}
              className="card"
              style={{
                '--index': card.index,
                '--color-card': card.color,
              }}
            >
              <LazyLoadImage
                src={card.image}
                alt={`Card ${card.index}`}
                effect="blur"
                height="100%"
                width="100%"
                className="img"
              />
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .wrapper {
    margin-top: 10px;
    width: 100%;
    height: 700px;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .inner {
    --w: 250px;
    --h: 150px;
    --translateZ: calc((var(--w) + var(--h)) + 0px);
    --rotateX: -15deg;
    --perspective: 1000px;
    position: absolute;
    width: var(--w);
    height: var(--h);
    // top: 25%;
    left: calc(50% - (var(--w) / 2) - 2.5px);
    z-index: 2;
    transform-style: preserve-3d;
    transform: perspective(var(--perspective));
    animation: rotating 20s linear infinite;
  }

  @keyframes rotating {
    from {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(0);
    }
    to {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(1turn);
    }
  }

  .rotating-component-wrapper {
    position: absolute;
    z-index: 3; /* اجعل الـ RotatingComponent في الطبقة العليا */
    top: 50%; /* ضبط المكان */
    left: 50%;
    transform: translate(-50%, -50%); /* ضبط التوسيط بشكل دقيق */
  }

  .card {
    position: absolute;
    border-radius: 12px;
    overflow: hidden;
    inset: 0;
    transform: rotateY(calc((360deg / 10) * var(--index))) translateZ(var(--translateZ));
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease-in-out;
  }

  .card:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default HomeGalary;
