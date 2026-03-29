import React from "react";
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRipple,
} from "mdb-react-ui-kit";
import { Rating } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ActionButtons from "../Buttons/ActionButtons";
import WatchlistButton from "../Buttons/WatchlistButton";
import TypeBadge from "./TypeBadge";
import { getStorageUrl } from '../envUtils.js';
import { getItemRating } from '../dataUtils.js';
import useImageFallback from '../../Components/Common/useImageFallback';

const detectTypeFromPath = (pathname) => {
    if (pathname.includes("/hotels")) return "hotel";
    if (pathname.includes("/trips")) return "trip";
    if (pathname.includes("/cars")) return "car";
    if (pathname.includes("/activities")) return "activity";
    if (pathname.includes("/restaurants")) return "restaurant";
    if (pathname.includes("/cruise")) return "cruise";
    return "unknown";
};

const getNumericValue = (value) => {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
};

const clampStars = (value) => {
    const rounded = Math.round(getNumericValue(value));
    return Math.max(0, Math.min(5, rounded));
};

const getPriceSuffix = (detectedType) => {
    if (detectedType === 'car') return '/day';
    if (detectedType === 'flight') return '/person';
    if (detectedType === 'cruise') return '/person';
    if (detectedType === 'activity') return '/person';
    if (detectedType === 'restaurant') return '/person';
    return '/night';
};

const formatPriceLabel = (value, detectedType) => {
    const amount = getNumericValue(value);
    if (amount <= 0) return 'Price on request';
    return `$${Math.round(amount)}${getPriceSuffix(detectedType)}`;
};

const formatReviewLabel = (count) => {
    const reviewsCount = Math.max(0, Math.floor(getNumericValue(count)));
    if (reviewsCount === 0) return 'No reviews yet';
    if (reviewsCount === 1) return '1 Review';
    return `${reviewsCount} Reviews`;
};

const HotelCard = ({ data, type }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const displayRating = getItemRating(data) || 0;

    if (!data) return null;

    const detectedType = type || detectTypeFromPath(location.pathname);
    const priceLabel = formatPriceLabel(data?.price, detectedType);
    const oldPriceLabel = formatPriceLabel(data?.oldPrice, detectedType);
    const starsValue = clampStars(data?.stars || data?.class || displayRating);
    const showStars = starsValue > 0;
    const reviewLabel = formatReviewLabel(data?.reviews_count);
    const planTypeMap = {
        hotel: 'Hotel',
        restaurant: 'Restaurant',
        trip: 'Trip',
        car: 'Car',
        cruise: 'Cruise',
    };
    const planType = planTypeMap[detectedType];


    const getFullImageUrl = (img) => {
        if (!img) return "/fallback.svg";
        if (Array.isArray(img)) {
            if (img.length === 0) return "/fallback.svg";
            img = img[0];
        }
        if (typeof img === "object" && img.url) {
            img = img.url;
        }
        if (typeof img !== "string") return "/fallback.svg";
        if (img.startsWith("http") || img.startsWith("data:")) return img;
        const path = img.startsWith("/") ? img : `/${img}`;
        return getStorageUrl(path);
    };
    const { src: safeImageSrc, onError: handleImageError } = useImageFallback(getFullImageUrl(data.images));

    return (
        <MDBRow className="mb-3">
            <MDBCol md="12">
                <MDBCard
                    className="shadow-0 rounded-xl! h-full transition-shadow duration-300 overflow-hidden"
                    style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        boxShadow: 'var(--shadow-md)',
                    }}
                >
                    <MDBCardBody style={{ padding: "0" }}>
                        <MDBRow>
                            <MDBCol md="12" lg="5" className="mb-4 mb-lg-0" style={{ position: 'relative' }}>
                                <MDBRipple
                                    rippleColor="light"
                                    rippleTag="div"
                                    className="bg-image rounded hover-zoom hover-overlay"
                                >
                                    <MDBCardImage
                                        src={safeImageSrc}
                                        alt={data.title || data.name || 'Travel item image'}
                                        fluid
                                        className="w-100 rounded-xl!"
                                        style={{ filter: 'saturate(0.92) contrast(0.96)' }}
                                        onError={handleImageError}
                                        loading="lazy"
                                    />
                                </MDBRipple>
                                <TypeBadge type={detectedType} />
                                <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
                                    <WatchlistButton type={detectedType} id={data.id} title={data.title || data.name} />
                                </div>
                            </MDBCol>

                            <MDBCol md="4" className="p-3" style={{ padding: 'var(--space-5, 20px)' }}>
                                <h5 className="dark:text-white!" style={{ color: 'var(--text-primary)', fontWeight: 700, letterSpacing: '-0.01em' }}>
                                    {data.title || data.name}
                                </h5>
                                <div className="d-flex align-items-center mb-2">
                                    <span className="me-2 text-sm dark:text-white/70!" style={{ color: 'var(--text-secondary)' }}>{t('rating')}:</span>
                                    {showStars ? (
                                        <Rating
                                            name={`rating-${data.id}`}
                                            value={starsValue}
                                            max={5}
                                            precision={1}
                                            readOnly
                                        />
                                    ) : null}
                                    <span className="ms-2 dark:text-white/50!" style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm, 0.875rem)' }}>
                                        {reviewLabel}
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-1 mb-2 text-sm dark:text-white/60!" style={{ color: 'var(--text-secondary)' }}>
                                    <span>{t('location')}: {data.location || t('not_available')}</span>
                                    {detectedType === 'car' ? (
                                        <>
                                            <span>{t('seats')}: {data.seats || t('not_available')}</span>
                                            <span>{t('transmission')}: {data.car_specification || t('not_available')}</span>
                                        </>
                                    ) : detectedType === 'cruise' ? (
                                        <>
                                            <span>{t('duration')}: {data.duration || t('not_available')}</span>
                                            <span>{t('from')}: {data.from || t('not_available')}</span>
                                            <span>{t('to')}: {data.to || t('not_available')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{t('price')}: {priceLabel}</span>
                                            {showStars ? <span>{t('stars')}: {starsValue}</span> : null}
                                        </>
                                    )}
                                </div>
                                <p className="dark:text-white/50!" style={{ color: 'var(--text-secondary)' }}>
                                    {data.description?.slice(0, 100)}...
                                </p>
                            </MDBCol>

                            <MDBCol
                                md="6"
                                lg="3"
                                className="border-sm-start-none border-start d-flex flex-column justify-content-center"
                            >
                                <div className="d-flex align-items-center mb-1">
                                    <h4 className="mb-1 me-1 dark:text-white/80!" style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>
                                        {priceLabel}
                                    </h4>
                                    {data.oldPrice && oldPriceLabel !== 'Price on request' ? (
                                        <span className="text-danger" style={{ color: 'var(--text-muted)' }}>
                                            <s>{oldPriceLabel}</s>
                                        </span>
                                    ) : null}
                                </div>
                                <div className="d-flex flex-column mt-4">
                                    <ActionButtons
                                        data={data}
                                        type={detectedType}
                                    />
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    );
};

export default React.memo(HotelCard);
