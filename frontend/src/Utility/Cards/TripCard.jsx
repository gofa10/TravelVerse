import React from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
import useTransCurrency from "../../Hooks/useTransCurrency";
import WatchlistButton from '../Buttons/WatchlistButton';
import TypeBadge from "./TypeBadge";
import TripPlanMenuButton from '../../Components/TripBuilder/TripPlanMenuButton';
import { getStorageBaseUrl } from '../envUtils.js';
import { getItemRating, getItemPrice, getItemTitle, getItemImage } from '../dataUtils.js';
import useImageFallback from '../../Components/Common/useImageFallback';

const ContainerCatCard = ({
  id,
  title,
  name,
  image,
  cover,
  location,
  price,
  rate,
  description,
  type = "trip",
  loading = false,
}) => {
  const { t } = useTranslation();
  const getPath = () => {
    switch (type) {
      case "trip":
        return `/itemdetail/${id}?type=trip`;
      case "hotel":
        return `/itemdetail/${id}?type=hotel`;
      case "restaurant":
        return `/itemdetail/${id}?type=restaurant`;
      case "activity":
        return `/itemdetail/${id}?type=activity`;
      case "cruise":
        return `/itemdetail/${id}?type=cruise`;
      case "car":
        return `/itemdetail/${id}?type=car`;
      default:
        return "#";
    }
  };

const getFullImageUrl = (img) => {
    if (!img) return "";

    // لو img مصفوفة ناخد أول عنصر
    if (Array.isArray(img)) {
      img = img[0];
    }

    // Extraction logic for objects
    if (img && typeof img === 'object' && img.url) {
      img = img.url;
    }

    if (typeof img !== "string") return "";

    if (img.startsWith("http") || img.startsWith("data:")) return img;

    const BASE_URL = getStorageBaseUrl();
    const path = img.startsWith("/") ? img : `/${img}`;

    return `${BASE_URL}${path}`;
  };

  const cardTitle = getItemTitle({ title, name });
  const cardPrice = getItemPrice({ price });
  const cardRating = getItemRating({ rate });
  const img = getItemImage({ images: image || cover });
  const { src: safeImageSrc, onError: handleImageError } = useImageFallback(getFullImageUrl(img));
  const shortDesc =
    description && description.length > 100
      ? description.slice(0, 100) + "..."
      : description;

  return (
    <Link to={loading ? "#" : getPath()} className="no-underline text-inherit block">
      {/* Card with Tailwind v4 dark mode classes */}
      <div
        className="relative h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                   border"
        style={{
          background: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Image Wrapper */}
        <div className="relative w-full h-48 overflow-hidden">
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={192} />
          ) : (
            <>
              <LazyLoadImage
                src={safeImageSrc}
                alt={cardTitle}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                effect="blur"
                style={{ filter: 'saturate(0.9) contrast(0.96)' }}
                onError={handleImageError}
              />
              <div className="absolute top-3 left-3 z-10">
                <TypeBadge type={type} />
              </div>
              <div
                className="absolute top-2 right-2 z-10"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <WatchlistButton type={type} id={id} title={cardTitle} />
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-4" style={{ padding: 'var(--space-5, 20px)' }}>
          <h4
            className="line-clamp-2"
            style={{
              fontSize: 'var(--font-size-xl, 1.25rem)',
              fontWeight: 700,
              marginBottom: 'var(--space-2, 8px)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            {loading ? <Skeleton width={120} /> : cardTitle}
          </h4>
          <p className="mb-1" style={{ fontSize: 'var(--font-size-sm, 0.875rem)', color: 'var(--text-secondary)' }}>
            {loading ? <Skeleton width={80} /> : location}
          </p>
          <p
            className="min-h-[2.5em] line-clamp-3"
            style={{ fontSize: 'var(--font-size-sm, 0.875rem)', color: 'var(--text-secondary)' }}
          >
            {loading ? <Skeleton height={40} /> : shortDesc}
          </p>

          {/* Bottom Row - Price and Rating */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <span
              className="text-base font-semibold"
              style={{ color: 'var(--accent-primary)', fontSize: 'var(--font-size-xl, 1.25rem)', fontWeight: 700 }}
            >
              {loading ? <Skeleton width={60} /> : useTransCurrency(cardPrice)}
            </span>
            <span
              className="text-sm flex items-center gap-1"
              style={{ color: 'var(--color-warning)', fontWeight: 600 }}
            >
              ⭐ {cardRating ? cardRating : t('not_available')}
            </span>
          </div>

          {!loading && type === 'trip' ? (
            <div
              className="mt-3"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <TripPlanMenuButton serviceId={id} serviceType="Trip" className="w-full" />
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default ContainerCatCard;
