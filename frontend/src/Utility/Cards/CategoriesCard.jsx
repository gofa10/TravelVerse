// src/Utility/Cards/CategoriesCard.jsx
import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CategoriesCard = ({ image, title, description, isLoading, onClick }) => {
  const getImageSrc = () => {
    if (!image) return '/fallback.jpg';

    let img = image;

    // Handle arrays
    if (Array.isArray(img)) {
      if (img.length === 0) return '/fallback.jpg';
      img = img[0];
    }

    // Handle File objects
    if (typeof img === 'object' && img instanceof File) {
      return URL.createObjectURL(img);
    }

    // Handle image objects with url property (from API)
    if (typeof img === 'object' && img?.url) {
      img = img.url;
    }

    // Handle strings
    if (typeof img === 'string') {
      if (img.startsWith('http') || img.startsWith('data:')) {
        return img;
      } else {
        const BASE_URL = process.env.REACT_APP_API_BASE_URL || import.meta.env.VITE_API_BASE_URL.replace('/api', '') + '';
        return `${BASE_URL}${img}`;
      }
    }

    return '/fallback.jpg';
  };

  return (
    <StyledWrapper onClick={onClick}>
      <div className="card">
        {isLoading ? (
          <>
            <div className="image-placeholder" />
            <div className="content-placeholder">
              <div className="line title" />
              <div className="line" />
              <div className="line short" />
              <div className="line half" />
              <div className="button-placeholder" />
            </div>
          </>
        ) : (
          <>
            <LazyLoadImage
              src={getImageSrc()}
              alt={title}
              effect="blur"
              height="100%"
              width="100%"
              className="card-img h-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/fallback.jpg';
              }}
            />
            <div className="card__content p-3">
              <p className="card__title">{title}</p>
              {/* Description removed - only show title on hover */}
            </div>
          </>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  cursor: pointer;

  .card {
    position: relative;
    width: 100%;
    height: 220px;
    border-radius: var(--radius-lg, 12px);
    overflow: hidden;
    background: var(--bg-secondary, #f8fafc);
    box-shadow: var(--shadow-md);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
  }

  .card-img {
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .card:hover .card-img {
    transform: scale(1.08);
  }

  .card__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(
      180deg, 
      rgba(0, 0, 0, 0.1) 0%, 
      rgba(0, 0, 0, 0.7) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card:hover .card__content {
    opacity: 1;
  }

  .card__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    margin-bottom: 8px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .card__description {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.9);
    max-width: 90%;
    line-height: 1.4;
  }

  /* Skeleton Loading Styles */
  .image-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .content-placeholder {
    padding: 16px;
  }

  .line {
    height: 12px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  .line.title {
    width: 60%;
    height: 16px;
  }

  .line.short {
    width: 40%;
  }

  .line.half {
    width: 50%;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

export default CategoriesCard;
