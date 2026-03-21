import React from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useTransCurrency from "../../Hooks/useTransCurrency";
import WatchlistButton from '../Buttons/WatchlistButton';
import TypeBadge from "./TypeBadge";

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
    if (!img) return "/fallback.jpg";

    // لو img مصفوفة ناخد أول عنصر
    if (Array.isArray(img)) {
      img = img[0];
    }

    // Extraction logic for objects
    if (img && typeof img === 'object' && img.url) {
      img = img.url;
    }

    if (typeof img !== "string") return "/fallback.jpg";

    if (img.startsWith("http") || img.startsWith("data:")) return img;

    const BASE_URL =
      process.env.REACT_APP_API_BASE_URL ||
      import.meta.env.VITE_API_BASE_URL.replace('/api', '') + '';

    return `${BASE_URL}${img}`;
  };


  const cardTitle = title || name;
  const img = image || cover;
  const shortDesc =
    description && description.length > 100
      ? description.slice(0, 100) + "..."
      : description;

  return (
    <Link to={loading ? "#" : getPath()} className="no-underline text-inherit block">
      {/* Card with Tailwind v4 dark mode classes */}
      <div
        className="relative h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                   bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
      >
        {/* Image Wrapper */}
        <div className="relative w-full h-48 overflow-hidden">
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={192} />
          ) : (
            <>
              <LazyLoadImage
                src={getFullImageUrl(img)}
                alt={cardTitle}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                effect="blur"
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
        <div className="p-4">
          <h4 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white line-clamp-2">
            {loading ? <Skeleton width={120} /> : cardTitle}
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
            {loading ? <Skeleton width={80} /> : location}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 min-h-[2.5em] line-clamp-3">
            {loading ? <Skeleton height={40} /> : shortDesc}
          </p>

          {/* Bottom Row - Price and Rating */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <span className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
              {loading ? <Skeleton width={60} /> : useTransCurrency(price)}
            </span>
            <span className="text-sm text-amber-500 flex items-center gap-1">
              ⭐ {rate ? rate : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContainerCatCard;

