// src/Utility/Cards/ItemCard.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import TypeBadge from './TypeBadge';
import WatchlistButton from '../Buttons/WatchlistButton';

// ─── Constants ────────────────────────────────────────────────────────────────

const FALLBACK_IMAGE = '/fallback.svg';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Resolves the image source from various input formats.
 * Handles: null, undefined, arrays, objects with url property, strings (relative/absolute)
 * @param {*} image - The image value from API
 * @returns {string} - A valid image URL or fallback
 */
const getImageSrc = (image) => {
     // Handle null, undefined, or empty values
     if (!image) return FALLBACK_IMAGE;

     let img = image;

     // Handle arrays - get first valid element
     if (Array.isArray(img)) {
          if (img.length === 0) return FALLBACK_IMAGE;
          img = img[0];
          // Recursively process the first element
          if (!img) return FALLBACK_IMAGE;
     }

     // Handle File objects (from uploads)
     if (typeof img === 'object' && img instanceof File) {
          return URL.createObjectURL(img);
     }

     // Handle objects with url property
     if (typeof img === 'object' && img?.url) {
          img = img.url;
     }

     // Handle string URLs
     if (typeof img === 'string') {
          // Empty string
          if (!img.trim()) return FALLBACK_IMAGE;

          // Already absolute URL or data URI
          if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
               return img;
          }

          // Relative path - prepend base URL
          const path = img.startsWith('/') ? img : `/${img}`;
          return `${BASE_URL}${path}`;
     }

     return FALLBACK_IMAGE;
};

// ─── Star Rating ─────────────────────────────────────────────────────────────

const StarRating = ({ rating = 0 }) => {
     const total = 5;
     const filled = Math.floor(rating);
     const hasHalf = rating - filled >= 0.4;
     return (
          <div className="star-row" aria-label={`Rating: ${rating} out of 5 stars`}>
               {Array.from({ length: total }, (_, i) => {
                    if (i < filled) return <span key={i} className="star filled">★</span>;
                    if (i === filled && hasHalf) return <span key={i} className="star half">★</span>;
                    return <span key={i} className="star empty">★</span>;
               })}
          </div>
     );
};

// ─── Skeleton ────────────────────────────────────────────────────────────────

const SkeletonCard = () => (
     <StyledWrapper>
          <div className="item-card skeleton-card" aria-hidden="true">
               <div className="sk sk-img" />
               <div className="card-body">
                    <div className="sk sk-title" />
                    <div className="sk sk-stars" />
                    <div className="meta-grid">
                         <div className="sk sk-meta" />
                         <div className="sk sk-meta" />
                         <div className="sk sk-meta" />
                         <div className="sk sk-meta" />
                    </div>
               </div>
          </div>
     </StyledWrapper>
);

// ─── ItemCard ─────────────────────────────────────────────────────────────────

/**
 * ItemCard – Large premium card for Activities, Trips, Hotels, Restaurants, etc.
 *
 * Props:
 *  image   – raw image value from API (string | object | array | null)
 *  title   – string (displays 'Untitled' if null/undefined)
 *  rating  – number 0–5
 *  meta    – array of { label: string, value: string|number }
 *  price   – optional formatted price string, e.g. "$15.00"
 *  onClick – click handler
 *  isLoading – boolean (renders skeleton when true)
 *  to      – optional Link destination (if provided, card wraps in Link)
 */
const ItemCard = ({ id, image, title, rating = 0, meta = [], price, onClick, isLoading, to, type }) => {
     const [imgError, setImgError] = useState(false);

     if (isLoading) return <SkeletonCard />;

     // Derive the display title with fallback
     const displayTitle = title || 'Untitled';

     // Derive image source - use fallback if error occurred or no valid image
     const imageSrc = imgError ? FALLBACK_IMAGE : getImageSrc(image);

     // Handle image load error
     const handleImageError = (e) => {
          // Prevent infinite loop
          if (!imgError) {
               setImgError(true);
               e.target.src = FALLBACK_IMAGE;
          }
     };

     // Determine ID - prioritize explicit id prop
     const itemId = id || meta.find(m => m.label === 'ID')?.value || 0;

     const cardContent = (
          <div className="item-card">
               {/* Image */}
               <div className="card-img-wrap">
                    <LazyLoadImage
                         src={imageSrc}
                         alt={displayTitle}
                         effect="blur"
                         width="100%"
                         height="100%"
                         className="card-img"
                         onError={handleImageError}
                         placeholderSrc={FALLBACK_IMAGE}
                    />
                    {type && <TypeBadge type={type} />}
                    <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
                         <WatchlistButton type={type} id={itemId} title={displayTitle} />
                    </div>
               </div>

               {/* Body */}
               <div className="card-body">
                    <h5 className="card-title" title={displayTitle}>{displayTitle}</h5>

                    <StarRating rating={rating} />

                    {/* Meta rows - displayed horizontally like the large card design */}
                    {meta.length > 0 && (
                         <div className="meta-rows">
                              {meta.map(({ label, value }, i) => (
                                   <div key={i} className="meta-row">
                                        <span className="meta-label">{label}:</span>
                                        <span className="meta-value">{value ?? '—'}</span>
                                   </div>
                              ))}
                         </div>
                    )}

                    {/* Standalone price badge if not already in meta */}
                    {price && !meta.some(m => m.label === 'Price') && (
                         <div className="price-badge">{price}</div>
                    )}
               </div>
          </div>
     );

     const wrapperProps = {
          className: 'item-card-wrapper',
          role: to ? undefined : 'button',
          tabIndex: to ? undefined : 0,
          onClick: to ? undefined : onClick,
          onKeyDown: to ? undefined : (e) => e.key === 'Enter' && onClick?.()
     };

     if (to) {
          return (
               <StyledWrapper as={Link} to={to} {...wrapperProps}>
                    {cardContent}
               </StyledWrapper>
          );
     }

     return (
          <StyledWrapper {...wrapperProps}>
               {cardContent}
          </StyledWrapper>
     );
};



// ─── Styles ──────────────────────────────────────────────────────────────────

const StyledWrapper = styled.div`
  /* Snap alignment – used when inside CardCarousel */
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 320px;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  color: inherit;

  @media (max-width: 1200px) {
    width: 300px;
  }

  @media (max-width: 768px) {
    width: 280px;
  }

  @media (max-width: 480px) {
    width: 260px;
  }

  .item-card {
    background: var(--bg-secondary, #fff);
    border-radius: var(--radius-xl, 16px);
    box-shadow: var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    overflow: hidden;
    transition: transform 0.28s ease, box-shadow 0.28s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .item-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
  }

  /* Image - Large card style (300px height like Slider) */
  .card-img-wrap {
    width: 100%;
    height: 280px;
    overflow: hidden;
    position: relative;
    background: var(--bg-tertiary, #f1f5f9);
  }

  @media (max-width: 768px) {
    .card-img-wrap {
      height: 240px;
    }
  }

  @media (max-width: 480px) {
    .card-img-wrap {
      height: 200px;
    }
  }

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  .item-card:hover .card-img {
    transform: scale(1.07);
  }

  /* Body - Centered layout like large cards */
  .card-body {
    padding: 20px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    text-align: center;
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary, #1e293b);
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 2.8em;
    text-align: center;
  }

  /* Stars - Centered */
  .star-row {
    display: flex;
    gap: 3px;
    margin: 4px 0;
    justify-content: center;
  }

  .star {
    font-size: 1.1rem;
    line-height: 1;
  }

  .star.filled  { color: #f59e0b; }
  .star.half    { color: #f59e0b; opacity: 0.55; }
  .star.empty   { color: var(--color-slate-300, #cbd5e1); }

  /* Meta rows - Horizontal layout like large cards */
  .meta-rows {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 8px;
  }

  .meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    font-size: 0.9rem;
  }

  .meta-label {
    font-size: 0.85rem;
    color: var(--text-muted, #64748b);
    font-weight: 500;
  }

  .meta-value {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-secondary, #475569);
  }

  /* Price badge */
  .price-badge {
    margin-top: 8px;
    display: inline-block;
    background: var(--color-primary-50, #eff6ff);
    color: var(--color-primary-700, #1d4ed8);
    font-size: 0.95rem;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: var(--radius-full, 9999px);
    align-self: center;
  }

  /* ── Skeleton ── */
  .skeleton-card {
    pointer-events: none;
  }

  .sk {
    border-radius: 6px;
    background: linear-gradient(90deg,
      var(--bg-tertiary, #f1f5f9) 25%,
      var(--bg-secondary, #f8fafc) 50%,
      var(--bg-tertiary, #f1f5f9) 75%);
    background-size: 800px 100%;
    animation: sk-shimmer 1.5s infinite linear;
  }

  .sk-img  { width: 100%; height: 280px; border-radius: 0; }
  @media (max-width: 768px) { .sk-img { height: 240px; } }
  @media (max-width: 480px) { .sk-img { height: 200px; } }
  
  .sk-title{ height: 18px; width: 80%; margin: 20px auto 10px; }
  .sk-stars{ height: 16px; width: 40%; margin: 0 auto 12px; }
  .sk-meta { height: 14px; width: 85%; margin: 0 auto; }

  @keyframes sk-shimmer {
    from { background-position: -400px 0; }
    to   { background-position:  400px 0; }
  }
`;

export { SkeletonCard };
export default ItemCard;
