import React, { useMemo, useState } from 'react';
import api from '../../Radux/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from '../../Components/ErrorBoundary/ErrorBoundary';
import BookingModal from '../../Components/Booking/BookingModal';

const modelToTypeMap = {
  'App\\Models\\Trip': 'trip',
  'App\\Models\\Hotel': 'hotel',
  'App\\Models\\Restaurant': 'restaurant',
  'App\\Models\\Activity': 'activity',
  'App\\Models\\Cruise': 'cruise',
  'App\\Models\\Car': 'car',
  'App\\Models\\Flight': 'flight',
};

import { getApiOrigin } from '../../Utility/envUtils.js';

const API_ORIGIN = getApiOrigin();

const typeLabelMap = {
  trip: 'trip',
  hotel: 'hotel',
  restaurant: 'restaurant',
  activity: 'activity',
  car: 'cars',
  cruise: 'cruises',
  flight: 'flights',
};

const getStatusMeta = (status, t) => {
  const map = {
    saved: { label: t('saved'), cls: 'bg-blue-100 text-blue-700' },
    redirect_pending: { label: t('link_opened'), cls: 'bg-yellow-100 text-yellow-700' },
    booking_claimed: { label: t('booked'), cls: 'bg-green-100 text-green-700' },
    booking_declined: { label: t('not_booked'), cls: 'bg-red-100 text-red-700' },
    left_without_booking: { label: t('no_response'), cls: 'bg-gray-100 text-gray-600' },
    cancelled: { label: t('cancelled'), cls: 'bg-slate-200 text-slate-700' },
  };
  return map[status] || { label: t('status'), cls: 'bg-gray-100 text-gray-600' };
};

const toAbsoluteImage = (url) => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_ORIGIN}${url}`;
};

const fetchReservations = async () => {
  const res = await api.get('/reservations');
  const reservationData = res.data?.data || res.data || [];
  const reservationList = Array.isArray(reservationData) ? reservationData : (reservationData.items || []);

  return reservationList.map((r) => {
    const source = r.reservable || {};
    const rawImages = source.images;
    const imageCandidate =
      Array.isArray(rawImages) && rawImages.length > 0
        ? (typeof rawImages[0] === 'string' ? rawImages[0] : rawImages[0]?.url || rawImages[0]?.image || rawImages[0]?.path)
        : source.image || source.thumbnail || null;

    const bookingLink =
      source.booking_link ||
      source.booking_url ||
      source.external_url ||
      source.link ||
      null;

    const rawPrice =
      r.price ??
      r.total_price ??
      source.price ??
      source.price_per_day ??
      source.price_per_night ??
      null;

    return {
      ...r,
      typeName: modelToTypeMap[r.reservable_type] || 'item',
      itemId: r.reservable?.id ?? r.reservable_id,
      title:
        source.name_en ||
        source.name ||
        source.title ||
        (source.from_location && source.to_location ? `${source.from_location} -> ${source.to_location}` : null) ||
        'Item',
      image: toAbsoluteImage(imageCandidate),
      bookingLink,
      price: rawPrice,
    };
  });
};

const MyReserv = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const queryClient = useQueryClient();

  const { data: reservations = [], isLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: fetchReservations,
  });

  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/reservations/${id}`);
    },
    onSuccess: () => {
      toast.success(t('cancel'));
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error) => toast.error(error.response?.data?.message || t('failed_load_reservations')),
  });

  const filtered = useMemo(() => (
    filter === 'All'
      ? reservations
      : reservations.filter((r) => r.typeName === filter)
  ), [filter, reservations]);

  const uniqueTypes = useMemo(
    () => ['All', ...new Set(reservations.map((r) => r.typeName))],
    [reservations]
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 w-full border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">{t('my_reservations')}</h2>

        <div className="flex items-center gap-2">
          <label htmlFor="filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('filter_by_type')}</label>
          <div className="relative">
            <select
              id="filter"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="appearance-none border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 pr-8 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'All' ? t('all') : t(typeLabelMap[type] || type)}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <ErrorBoundary>
        {isLoading ? (
          <div className="text-center py-4 text-gray-500">{t('loading_reservations')}</div>
        ) : filtered.length === 0 ? (
          <p className="text-center py-4 text-gray-500">{t('no_results_found')}</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm border-b border-gray-200 dark:border-gray-700 font-semibold">
                  <th className="py-3 px-4 font-semibold">{t('name')}</th>
                  <th className="py-3 px-4 font-semibold">{t('date')}</th>
                  <th className="py-3 px-4 font-semibold">{t('people')}</th>
                  <th className="py-3 px-4 font-semibold">{t('price')}</th>
                  <th className="py-3 px-4 font-semibold">{t('status')}</th>
                  <th className="py-3 px-4 font-semibold">{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {(filtered || []).map((res) => {
                  const statusMeta = getStatusMeta(res.status, t);
                  return (
                    <tr key={res.id} className="border-b last:border-0 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="py-3 px-4 text-gray-800 dark:text-white text-sm whitespace-normal max-w-[300px]">{res.title}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300 text-sm">
                        {res.date ? new Date(res.date).toLocaleDateString() : t('not_available')}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300 text-sm">
                        {res.people ? `${res.people} ${t('guests')}` : t('not_available')}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300 text-sm">
                        {res.price ?? t('not_available')}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium tracking-wide ${statusMeta.cls}`}>
                          {statusMeta.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        {res.bookingLink && ['saved', 'redirect_pending', 'booking_declined', 'left_without_booking'].includes(res.status) && (
                          <button
                            onClick={() => setSelectedReservation(res)}
                            className="bg-emerald-500 text-white px-4 py-1.5 rounded disabled:opacity-50 hover:bg-emerald-600 transition text-sm font-medium"
                          >
                            {t('book_now')}
                          </button>
                        )}
                        <button
                          onClick={() => cancelMutation.mutate(res.id)}
                          disabled={res.status === 'cancelled' || cancelMutation.isPending}
                          className="bg-white dark:bg-transparent text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-1.5 rounded transition text-sm font-medium border border-red-200 dark:border-red-800 disabled:opacity-50"
                        >
                          {t('cancel')}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </ErrorBoundary>

      {selectedReservation && (
        <BookingModal
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
          onStatusUpdate={() => queryClient.invalidateQueries({ queryKey: ['reservations'] })}
        />
      )}
    </div>
  );
};

export default MyReserv;
