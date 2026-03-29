import { Rating } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useTransCurrency from '../../Hooks/useTransCurrency';
import styled from 'styled-components';
import api from '../../Radux/axios';
import { toast } from 'react-toastify';
import getBookingUrl from '../helpers/getBookingUrl';
import LoginPromptModal from '../LoginPromptModal';
import WatchlistButton from '../Buttons/WatchlistButton';
import { getToken, isValidToken } from '../authToken';
import BookingModal from '../../Components/Booking/BookingModal';
import { getItemRating } from '../dataUtils.js';

const translateListValue = (t, value) => {
  if (!value || typeof value !== 'string') return value;

  return value
    .split(',')
    .map((part) => {
      const trimmed = part.trim();
      if (!trimmed) return trimmed;

      const key = trimmed.toLowerCase().replace(/\s+/g, '_');
      const translated = t(key);
      return translated && translated !== key ? translated : trimmed;
    })
    .join(', ');
};

const getLocalizedContent = (item, language, field) => {
  if (!item) return '';

  const normalizedLanguage = language?.toLowerCase() || 'en';
  const arabicValue = item[`${field}_ar`] || item[`arabic_${field}`];
  const englishValue = item[`${field}_en`] || item[`english_${field}`];
  const directValue = item[field];

  if (normalizedLanguage.startsWith('ar')) {
    return arabicValue || directValue || englishValue || '';
  }

  return englishValue || directValue || arabicValue || '';
};

const hasValue = (value) => {
  if (value == null) return false;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed !== '' &&
      trimmed.toLowerCase() !== 'null' &&
      trimmed.length > 1; // Filter out single characters like 'n'
  }
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

const DetialtripCard = ({ trip, loading, reservable_type }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const convertedPrice = useTransCurrency(trip?.price || 0);
  const [descExpanded, setDescExpanded] = React.useState(false);
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [selectedReservation, setSelectedReservation] = React.useState(null);

  const localizedName = (() => {
    const translatedName = getLocalizedContent(trip, i18n.language, 'name');
    if (hasValue(translatedName)) return translatedName;
    if (reservable_type === 'car') {
      const carName = [trip?.brand, trip?.model].filter(hasValue).join(' ');
      if (hasValue(carName)) return carName;
    }
    if (reservable_type === 'flight') {
      const flightName = [trip?.from_location, trip?.to_location].filter(hasValue).join(' → ');
      if (hasValue(flightName)) return flightName;
    }
    return 'Details';
  })();

  const description = (() => {
    const localizedDescription = getLocalizedContent(trip, i18n.language, 'description');
    if (hasValue(localizedDescription)) return localizedDescription;

    if (reservable_type === 'car' && trip) {
      const specs = typeof trip?.car_specification === 'string'
        ? trip.car_specification.toLowerCase()
        : '';
      return [
        `${trip?.seats || 4} ${t('seats')}`,
        `${trip?.large_bag || 1} ${t('large_bag')}`,
        `${trip?.small_bag || 1} ${t('small_bag')}`,
        `4 ${t('doors')}`,
        `${t('air_conditioning')}: ${specs.includes("air") ? t('yes') : t('no')}`,
        `${t('transmission')}: ${specs.includes("automatic") ? t('automatic') : t('manual')}`
      ].join(' | ');
    }

    if (reservable_type === 'flight') {
      const fromLocation = trip?.from_location;
      const toLocation = trip?.to_location;
      return hasValue(fromLocation) && hasValue(toLocation)
        ? `${t('flightFrom') || 'Flight from'} ${fromLocation} ${t('to') || 'to'} ${toLocation}`
        : '';
    }
    return '';
  })();

  const primaryPriceLabel =
    reservable_type === 'car'
      ? 'Rental Price'
      : reservable_type === 'cruise'
        ? t('price')
        : reservable_type === 'restaurant'
          ? t('price')
          : t('admissionTickets');
  const secondaryPriceLabel =
    reservable_type === 'car'
      ? 'Per Day'
      : reservable_type === 'cruise'
        ? 'Per Cruise'
        : t('from');
  const locationLabel =
    hasValue(trip?.location)
      ? translateListValue(t, trip?.location)
      : reservable_type === 'flight'
        ? [trip?.from_location, trip?.to_location].filter(hasValue).join(' – ')
        : null;
  const displayRating = getItemRating(trip);
  const showGuide = !['flight', 'car', 'cruise'].includes(reservable_type) && hasValue(trip?.guide?.name);
  const showDuration = reservable_type !== 'car' && reservable_type !== 'cruise' && hasValue(trip?.duration);
  const showDifficulty = reservable_type !== 'flight' && reservable_type !== 'car' && reservable_type !== 'cruise' && hasValue(trip?.difficulty);
  const showExperience = !['restaurant', 'car', 'cruise'].includes(reservable_type) && hasValue(trip?.difficulty || trip?.style) && (trip.difficulty || trip.style) !== 'N/A';

  const bookingLink = getBookingUrl(trip, reservable_type);

  const getModelType = () => {
    const normalized = (reservable_type === 'activitie' ? 'activity' : reservable_type) || 'trip';
    return `App\\Models\\${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}`;
  };

  const findExistingReservation = async (modelClass, itemId) => {
    const res = await api.get('/reservations');
    return (res.data || []).find(
      (r) => r.reservable_type === modelClass && Number(r.reservable_id) === Number(itemId)
    );
  };

  const handleBookNow = async () => {
    const token = getToken();
    const isAuthenticated = isValidToken(token);

    if (!isAuthenticated) {
      setShowPrompt(true);
      return;
    }

    if (!bookingLink) {
      toast.info(t('common.comingSoon') || 'Coming Soon');
      return;
    }

    const modelClass = getModelType();
    const payload = {
      reservable_type: modelClass,
      reservable_id: trip?.id,
    };

    try {
      const created = await api.post('/reservations', payload);
      setSelectedReservation({
        ...created.data,
        reservable: created.data?.reservable || trip,
      });
    } catch (error) {
      if (error.response?.status === 400) {
        const existing = await findExistingReservation(modelClass, trip?.id);
        if (existing) {
          setSelectedReservation({
            ...existing,
            reservable: existing?.reservable || trip,
          });
          return;
        }
      }
      toast.error(error.response?.data?.message || 'Failed to start booking flow');
    }
  };

  const handleReservation = async () => {
    const token = getToken();
    const isAuthenticated = isValidToken(token);

    if (!isAuthenticated) {
      setShowPrompt(true);
      return;
    }


    let modelType = reservable_type;
    if (modelType === 'activitie') {
      modelType = 'activity';
    }

    try {
      await api.post('/favorites', {
        favoritable_type: `App\\Models\\${modelType.charAt(0).toUpperCase() + modelType.slice(1)}`,
        favoritable_id: trip?.id,
      });

      toast.success(t('addedToFavorites') || 'Added to favorites');
    } catch (error) {
      if (error.response?.status === 409) {
        toast.info(t('alreadyInFavorites') || 'Already in favorites');
      } else {
        toast.error(error.response?.data?.message || t('favoritesFailed') || 'Failed to add to favorites');
      }
    }
  };

  // 🛡️ حماية ضد undefined
  if (loading || !trip) {
    return <p>{t('loadingTripDetails')}</p>;
  }

  return (
    <StyledWrapper>
      <LoginPromptModal
        open={showPrompt}
        onClose={() => setShowPrompt(false)}
        onGoLogin={() => navigate('/login')}
        type={reservable_type}
      />
      <article className="job-card" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
          <WatchlistButton type={reservable_type} id={trip?.id} title={localizedName} />
        </div>

        <div>
          <p className="text-title">{localizedName}</p>
          {showGuide && <p style={{ margin: '0.25em 0 0' }}>{t('guide')}: {trip?.guide?.name}</p>}
          {reservable_type === 'flight' && hasValue(trip?.style) && <p>{t('class') || 'Class'}: {trip?.style}</p>}
        </div>

        <hr />

        <div className="info-badges">
          {showDuration && (
            <span>⏱️ {trip?.duration} {t('hours')}</span>
          )}
          {locationLabel && (
            <>
              <span>📍 {locationLabel}</span>
            </>
          )}
          {showDifficulty && (
            <>
              <span className="sep">|</span>
              <span>🏔️ {trip?.difficulty}</span>
            </>
          )}
          {reservable_type === 'flight' && (
            <>
              <span className="sep">|</span>
              <span>✈️ {t('stops') || 'Stops'}: {trip?.stops_count || 0}</span>
            </>
          )}
        </div>

        <hr />

        {/* Price */}
        <div className="budget-exp">
          <div>
            <p className="value">{primaryPriceLabel}</p>
            <p className="label large-price"><span>{secondaryPriceLabel} </span>{convertedPrice}</p>
          </div>
          {showExperience && (
            <div>
              <p className="value">{reservable_type === 'flight' ? (t('flightStyle') || 'Style') : t('experience')}</p>
              <p className="label">{trip?.difficulty || trip?.style}</p>
            </div>
          )}
        </div>

        <hr />

        {hasValue(description) && (
          <>
            <h4>{t('description')}</h4>
            <p className="text-body">
              {(() => {
                const desc = description;
                if (desc.length <= 200 || descExpanded) return desc;
                return (
                  <>
                    {desc.slice(0, 200)}&hellip;{' '}
                    <span
                      onClick={() => setDescExpanded(true)}
                      style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'underline' }}
                    >
                      Show more
                    </span>
                  </>
                );
              })()}
            </p>
            {descExpanded && (
              <span
                onClick={() => setDescExpanded(false)}
                style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'underline', fontSize: '0.9em' }}
              >
                Show less
              </span>
            )}
          </>
        )}

        {(displayRating != null || hasValue(trip?.reviews_count)) && (
          <>
            <div className="tags">
              <article>
                {displayRating != null ? (
                  <Rating name="half-rating-read" value={displayRating} precision={0.5} readOnly />
                ) : null}
                {hasValue(trip?.reviews_count) && trip.reviews_count > 0 ? <h6>{trip.reviews_count} {t('nReviews')}</h6> : null}
              </article>
            </div>

            <hr />
          </>
        )}

        <div className="reservation-fields">
          <button type="button" className="btn-premium" onClick={handleReservation}>{t('addToFavorites')}</button>
        </div>

        <div className="reservation-fields">
          <button
            onClick={handleBookNow}
            className="btn btn-primary btn-lg w-100 font-weight-bold"
            style={{ borderRadius: '12px', padding: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            {t('common.bookNow') || 'Book Now'}
          </button>
        </div>

      </article>

      {selectedReservation && (
        <BookingModal
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
          onStatusUpdate={() => { }}
        />
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .job-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: #091e4240 0px 1px 1px, #091e4221 0px 0px 1px 1px;
    border-radius: 0.6em;
    padding: 1em;
    max-width: 30em;
  }

  .text-title {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 1.25em;
    font-weight: 600;
    font-family: "Noto Sans", sans-serif;
    margin-bottom: 0;
  }

  .text-body {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-family: "Poppins", sans-serif;
    letter-spacing: 0.4px;
  }

  .post-date {
    color: #2768b3;
  }

  .budget-exp {
    display: flex;
    gap: 5em;
  }

  .budget-exp .value {
    font-size: 1em;
    font-weight: 600;
    margin-bottom: 0;
  }

  .budget-exp .label {
    font-size: 1em;
    color: #2768b3;
  }

  .budget-exp .label span {
    color: black;
    font-size: 0.8em;
  }

  .tags article {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6em;
    align-items: center;
  }

  .info-badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4em;
    font-size: 0.82em;
    color: #555;
    margin: 0.2em 0;
  }

  .info-badges .sep {
    color: #bbb;
    margin: 0 0.1em;
  }

  .large-price {
    font-size: 1.2em !important;
    font-weight: 700 !important;
  }

  .reservation-fields {
    margin-top: 1em;
  }

  .card-btn {
    display: block;
    text-align: center;
    text-decoration: none;
    border: none;
    font-size: 1rem;
    background-color: #2768b3;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 2em;
    padding: 0.6em 1em;
    width: 100%;
  }

  .card-btn:hover {
    background-color: rgb(27, 71, 121);
  }
`;

export default DetialtripCard;
