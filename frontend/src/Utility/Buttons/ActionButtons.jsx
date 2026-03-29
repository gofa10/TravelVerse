import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../Radux/axios';
import { toast } from 'react-toastify';
import LoginPromptModal from '../LoginPromptModal';
import getBookingUrl from '../helpers/getBookingUrl';
import { useToggleWatchlist } from '../../Hooks/useWatchlist';
import BookingModal from '../../Components/Booking/BookingModal';
import TripPlanMenuButton from '../../Components/TripBuilder/TripPlanMenuButton';

const ActionButtons = ({ data, type = "trip" }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [promptOpen, setPromptOpen] = useState(false);
  const [promptType, setPromptType] = useState(type);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const { isFavorited, toggle } = useToggleWatchlist(type, data?.id);
  const itemName = data?.title || data?.name || '';
  const planTypeMap = {
    trip: 'Trip',
    hotel: 'Hotel',
    restaurant: 'Restaurant',
  };
  const tripPlanType = planTypeMap[type];

  const normalizedType = (type === 'activitie' ? 'activity' : type);
  const modelClass = `App\\Models\\${normalizedType.charAt(0).toUpperCase()}${normalizedType.slice(1)}`;

  const requireAuth = (actionType) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = token && token !== 'undefined' && token !== 'null';

    if (!isAuthenticated) {
      setPromptType(actionType || type);
      setPromptOpen(true);
      return false;
    }
    return true;
  };

  const handleReservationClick = () => {
    if (!requireAuth(type)) return;

    const bookingUrl =
      getBookingUrl(data, type) ||
      data?.booking_url ||
      data?.booking_link ||
      data?.external_url ||
      data?.link ||
      data?.url;

    if (!bookingUrl) {
      toast.warning(t('bookingNotAvailable') || 'Booking link not available');
      return;
    }

    api.post('/reservations', {
      reservable_type: modelClass,
      reservable_id: data?.id,
    }).then((res) => {
      setSelectedReservation({
        ...res.data,
        reservable: res.data?.reservable || data,
      });
    }).catch(async (error) => {
      if (error.response?.status === 400) {
        const existingRes = await api.get('/reservations');
        const existing = (existingRes.data || []).find(
          (r) => r.reservable_type === modelClass && Number(r.reservable_id) === Number(data?.id)
        );
        if (existing) {
          setSelectedReservation({
            ...existing,
            reservable: existing?.reservable || data,
          });
          return;
        }
      }
      toast.error(error.response?.data?.message || t('error_occurred'));
    });
  };

  const handleBookingStatusUpdate = () => {
    // Intentionally empty here; reservations page reads fresh data when opened.
  };

  const handleAddToFavorites = async () => {
    if (!requireAuth('wishlist')) return;
    await toggle(itemName);
  };

  return (
    <>
      <LoginPromptModal
        open={promptOpen}
        onClose={() => setPromptOpen(false)}
        onGoLogin={() => { setPromptOpen(false); navigate('/login'); }}
        type={promptType}
      />

      {selectedReservation && (
        <BookingModal
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
          onStatusUpdate={handleBookingStatusUpdate}
        />
      )}

      <div className="d-flex flex-column gap-2 mt-4">
        <Link
          to={`/itemdetail/${data.id}?type=${type}`}
          className="btn btn-primary btn-sm"
        >
          {t('details')}
        </Link>

        <button
          onClick={handleReservationClick}
          className="btn-premium btn-premium-success btn-sm"
        >
          {t('common.bookNow') || 'Book Now'}
        </button>

        {tripPlanType ? (
          <TripPlanMenuButton
            serviceId={data?.id}
            serviceType={tripPlanType}
            className="w-full"
          />
        ) : null}
      </div>
    </>
  );
};

export default ActionButtons;
