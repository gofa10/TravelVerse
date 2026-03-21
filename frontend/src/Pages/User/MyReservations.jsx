import React, { useMemo, useState } from 'react';
import api from '../../Radux/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
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

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || '').replace('/api', '');

const getStatusMeta = (status) => {
  const map = {
    saved: { label: 'Saved', cls: 'bg-blue-100 text-blue-700' },
    redirect_pending: { label: 'Link Opened', cls: 'bg-yellow-100 text-yellow-700' },
    booking_claimed: { label: 'Booked ✓', cls: 'bg-green-100 text-green-700' },
    booking_declined: { label: 'Not Booked', cls: 'bg-red-100 text-red-700' },
    left_without_booking: { label: 'No Response', cls: 'bg-gray-100 text-gray-600' },
    cancelled: { label: 'Cancelled', cls: 'bg-slate-200 text-slate-700' },
  };
  return map[status] || { label: 'Legacy', cls: 'bg-gray-100 text-gray-600' };
};

const toAbsoluteImage = (url) => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_ORIGIN}${url}`;
};

const fetchReservations = async () => {
  const res = await api.get('/reservations');

  return (res.data || []).map((r) => {
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
    };
  });
};

const MyReserv = () => {
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
      toast.success('Reservation cancelled');
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to cancel reservation'),
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">📋 My Reservations</h2>

      <div className="mb-4">
        <label htmlFor="filter">Filter by Type:</label>
        <select
          id="filter"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="ml-2 p-1 border rounded"
        >
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <ErrorBoundary>
        {isLoading ? (
          <div className="text-center py-4">Loading reservations...</div>
        ) : filtered.length === 0 ? (
          <p className="text-center py-4">No reservations found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-700">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-750 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-gray-700">
                  <th className="py-3 px-4 font-medium">Image</th>
                  <th className="py-3 px-4 font-medium">Type</th>
                  <th className="py-3 px-4 font-medium">Name</th>
                  <th className="py-3 px-4 font-medium">Date</th>
                  <th className="py-3 px-4 font-medium">People</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(filtered || []).map((res) => {
                  const statusMeta = getStatusMeta(res.status);
                  return (
                    <tr key={res.id} className="border-b last:border-0 border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <td className="py-3 px-4">
                        {res.image
                          ? <img src={res.image} alt={res.title} className="w-12 h-12 rounded object-cover shadow-sm" />
                          : <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs">📷</div>
                        }
                      </td>
                      <td className="py-3 px-4 capitalize text-gray-600 dark:text-gray-300 font-medium">{res.typeName}</td>
                      <td className="py-3 px-4 text-gray-800 dark:text-white">{res.title}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        {res.date ? new Date(res.date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        {res.people ? `${res.people} guests` : 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${statusMeta.cls}`}>
                          {statusMeta.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        {res.bookingLink && ['saved', 'redirect_pending', 'booking_declined', 'left_without_booking'].includes(res.status) && (
                          <button
                            onClick={() => setSelectedReservation(res)}
                            className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition text-sm font-medium"
                          >
                            Book Now
                          </button>
                        )}
                        <button
                          onClick={() => cancelMutation.mutate(res.id)}
                          disabled={res.status === 'cancelled' || cancelMutation.isPending}
                          className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md transition text-sm font-medium border border-red-200 disabled:opacity-60"
                        >
                          Cancel
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
