import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import api from '../../Radux/axios';
import { toast } from 'react-toastify';
import getBookingUrl from '../../Utility/helpers/getBookingUrl';

export default function BookingModal({ reservation, onClose, onStatusUpdate }) {
  const [modalStep, setModalStep] = useState('pre_redirect');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [autoCloseInterval, setAutoCloseInterval] = useState(null);

  const itemName = useMemo(() => {
    const item = reservation?.reservable || {};
    return (
      item.name_en ||
      item.name ||
      item.title ||
      (item.from_location && item.to_location ? `${item.from_location} -> ${item.to_location}` : null) ||
      'This item'
    );
  }, [reservation]);

  const bookingUrl = useMemo(() => {
    const item = reservation?.reservable || {};
    const reservationType = reservation?.typeName || reservation?.reservable_type?.split('\\').pop()?.toLowerCase();
    return (
      reservation?.bookingLink ||
      item.booking_link ||
      item.booking_url ||
      item.external_url ||
      item.link ||
      getBookingUrl(item, reservationType) ||
      null
    );
  }, [reservation]);

  if (!reservation) return null;

  const patchStatus = async (status) => {
    const res = await api.patch(`/reservations/${reservation.id}/status`, { status });
    return res.data;
  };

  const clearAutoCloseTimer = () => {
    if (autoCloseInterval) {
      clearInterval(autoCloseInterval);
      setAutoCloseInterval(null);
    }
  };

  const updateReservationStatus = async (status) => {
    if (!reservation?.id) return null;
    const response = await patchStatus(status);
    onStatusUpdate?.();
    return response;
  };

  const isIgnorableTransitionError = (error) => {
    const msg = error?.response?.data?.message;
    return msg === 'Invalid status transition.' || msg === 'Status already set';
  };

  const handleModalClose = async () => {
    if (modalStep === 'post_redirect') {
      clearAutoCloseTimer();
      try {
        await updateReservationStatus('left_without_booking');
      } catch (error) {
        if (!isIgnorableTransitionError(error)) {
          toast.error(error.response?.data?.message || 'Failed to update reservation status');
        }
      }
    }
    onClose?.();
  };

  const handleTabClosed = () => {
    setModalStep('post_redirect');

    // Start 30 second countdown
    setCountdown(30);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // User ignored the popup - mark as left_without_booking
          updateReservationStatus('left_without_booking')
            .catch((error) => {
              if (!isIgnorableTransitionError(error)) {
                toast.error(error.response?.data?.message || 'Failed to update reservation status');
              }
            })
            .finally(() => onClose?.());
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Save interval ref to clear it if user clicks Yes or No
    setAutoCloseInterval(countdownInterval);
  };

  const handleOpenBookingPage = async () => {
    if (!bookingUrl) {
      toast.error('Booking link is not available');
      return;
    }

    // Open a tab synchronously from click to avoid popup blockers.
    const externalWindow = window.open('', '_blank');
    if (!externalWindow) {
      toast.error('Popup blocked by browser. Please allow popups for this site.');
      return;
    }

    setIsLoading(true);
    try {
      await updateReservationStatus('redirect_pending');
      externalWindow.location.href = bookingUrl;
      const checkClosed = setInterval(() => {
        if (externalWindow && externalWindow.closed) {
          clearInterval(checkClosed);
          handleTabClosed();
        }
      }, 1000);
    } catch (error) {
      if (externalWindow && !externalWindow.closed) {
        externalWindow.close();
      }
      toast.error(error.response?.data?.message || 'Failed to start booking redirect');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostChoice = async (nextStatus) => {
    setIsLoading(true);
    try {
      clearAutoCloseTimer();
      const response = await updateReservationStatus(nextStatus);
      const message = response?.message || response?.data?.message || 'Reservation updated';
      
      if (message !== 'Status already set') {
        toast.success(message);
      }
      onClose?.();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update booking result');
    } finally {
      setIsLoading(false);
    }
  };

  const handleYes = () => handlePostChoice('booking_claimed');
  const handleNo = () => handlePostChoice('booking_declined');

  useEffect(() => () => {
    if (autoCloseInterval) {
      clearInterval(autoCloseInterval);
    }
  }, [autoCloseInterval]);

  return createPortal(
    <div
      onClick={handleModalClose}
      className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 shadow-2xl p-6"
      >
        {modalStep === 'pre_redirect' ? (
          <>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🌍 You&apos;re leaving TravelVerse</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">You&apos;re about to book:</p>
            <p className="font-semibold text-gray-900 dark:text-white mb-6">{itemName}</p>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleOpenBookingPage}
                className="w-full rounded-lg bg-blue-600 text-white py-2.5 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
              >
                ➡️ Open Booking Page
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={handleModalClose}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 py-2.5 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                ✕ Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="text-center p-6">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Welcome back! ✈️</h2>
            <p className="text-gray-500 mb-1">
              Did you complete your booking for
            </p>
            <p className="font-semibold text-gray-800 dark:text-white mb-6">
              {itemName}
            </p>

            <div className="flex gap-3 justify-center mb-4">
              <button
                onClick={handleYes}
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60"
              >
                ✅ Yes, I booked it!
              </button>
              <button
                onClick={handleNo}
                disabled={isLoading}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60"
              >
                ✕ Not yet
              </button>
            </div>

            <p className="text-xs text-gray-400">
              This popup will close automatically in {countdown}s
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
