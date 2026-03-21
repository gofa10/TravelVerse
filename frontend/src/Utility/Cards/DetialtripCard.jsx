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


const DetialtripCard = ({ trip, loading, reservable_type }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const convertedPrice = useTransCurrency(trip?.price || 0);
  const [descExpanded, setDescExpanded] = React.useState(false);
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [selectedReservation, setSelectedReservation] = React.useState(null);


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
      toast.warning(t('bookingNotAvailable') || 'Booking link not available');
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
          <WatchlistButton type={reservable_type} id={trip.id} title={trip.name || (reservable_type === 'flight' ? `${trip.from_location} → ${trip.to_location}` : 'Details')} />
        </div>

        {/* Title + Guide */}
        <div>
          <p className="text-title">{trip.name || (reservable_type === 'flight' ? `${trip.from_location} → ${trip.to_location}` : 'Details')}</p>
          {reservable_type !== 'flight' && <p style={{ margin: '0.25em 0 0' }}>{t('guide')}: {trip.guide ? trip.guide.name : 'No'}</p>}
          {reservable_type === 'flight' && trip.style && <p>{t('class') || 'Class'}: {trip.style}</p>}
        </div>

        <hr />

        {/* Icon badges row — duration | location | difficulty */}
        <div className="info-badges">
          {(trip.duration || reservable_type === 'flight') && (
            <span>⏱️ {trip.duration} {reservable_type !== 'flight' ? t('hours') : ''}</span>
          )}
          {(trip.location || reservable_type === 'flight') && (
            <>
              <span className="sep">|</span>
              <span>📍 {trip.location || `${trip.from_location} – ${trip.to_location}`}</span>
            </>
          )}
          {reservable_type !== 'flight' && trip.difficulty && (
            <>
              <span className="sep">|</span>
              <span>🏔️ {trip.difficulty}</span>
            </>
          )}
          {reservable_type === 'flight' && (
            <>
              <span className="sep">|</span>
              <span>✈️ {t('stops') || 'Stops'}: {trip.stops_count || 0}</span>
            </>
          )}
        </div>

        <hr />

        {/* Price */}
        <div className="budget-exp">
          <div>
            <p className="value">{t('admissionTickets')}</p>
            <p className="label large-price"><span>{t('from')} </span>{convertedPrice}</p>
          </div>
          {reservable_type !== 'restaurant' && (trip.difficulty || trip.style) && (trip.difficulty || trip.style) !== 'N/A' && (
            <div>
              <p className="value">{reservable_type === 'flight' ? (t('flightStyle') || 'Style') : t('experience')}</p>
              <p className="label">{trip.difficulty || trip.style}</p>
            </div>
          )}
        </div>

        <hr />

        {/* About */}
        <h4>{t('about')}</h4>
        <p className="text-body">
          {(() => {
            const desc = trip.description || (reservable_type === 'flight' ? `${t('flightFrom') || 'Flight from'} ${trip.from_location} ${t('to') || 'to'} ${trip.to_location}` : '');
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

        {/* Stars + reviews count — kept as-is */}
        <div className="tags">
          <article>
            <Rating name="half-rating-read" defaultValue={Number(trip.rate) || 3.5} precision={0.5} readOnly />
            {trip.reviews_count > 0 && <h6>{trip.reviews_count} {t('nReviews')}</h6>}
          </article>
        </div>

        <hr />

        <div className="reservation-fields">
          <button type="button" className="btn-premium" onClick={handleReservation}>{t('addToFavorites')}</button>
        </div>

        <div className="reservation-fields">
          {bookingLink ? (
            <button
              onClick={handleBookNow}
              className="btn-premium btn-premium-success"
            >
              {t('bookTickets') || 'Book Tickets'}
            </button>
          ) : (
            <button className="btn-premium disabled" disabled style={{ opacity: 0.65, cursor: 'not-allowed' }}>
              {t('bookingUnavailable') || 'Booking Unavailable'}
            </button>
          )}
        </div>

      </article>

      {selectedReservation && (
        <BookingModal
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
          onStatusUpdate={() => {}}
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
