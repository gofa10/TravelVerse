import React, { useMemo, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import ErrorBoundary from '../../../Components/ErrorBoundary/ErrorBoundary';
import ReservationDetailDrawer from './ReservationDetailDrawer';

const modelToTypeMap = {
  'App\\Models\\Trip': 'trip',
  'App\\Models\\Hotel': 'hotel',
  'App\\Models\\Restaurant': 'restaurant',
  'App\\Models\\Activity': 'activity',
  'App\\Models\\Cruise': 'cruise',
  'App\\Models\\Car': 'car',
  'App\\Models\\Flight': 'flight',
};

const getStatusStyle = (status) => {
  const map = {
    saved: { cls: 'bg-blue-100 text-blue-700', label: 'saved' },
    redirect_pending: { cls: 'bg-yellow-100 text-yellow-700', label: 'redirect_pending' },
    booking_claimed: { cls: 'bg-green-100 text-green-700', label: 'booking_claimed' },
    booking_declined: { cls: 'bg-red-100 text-red-700', label: 'booking_declined' },
    left_without_booking: { cls: 'bg-gray-100 text-gray-600', label: 'left_without_booking' },
    cancelled: { cls: 'bg-gray-200 text-gray-700', label: 'cancelled' },
  };
  return map[status] || { cls: 'bg-gray-100 text-gray-600', label: 'legacy' };
};

const getTypeFromReservation = (r) => {
  const model = r.reservable_type || r.favoritable_type;
  return modelToTypeMap[model] || 'item';
};

const getTitleFromReservation = (source) => {
  if (!source) return 'Unknown Item';
  return (
    source.name_en ||
    source.name ||
    source.title ||
    source.destination ||
    (source.from_location && source.to_location
      ? `${source.from_location} -> ${source.to_location}`
      : null) ||
    'Item'
  );
};

const StatCard = ({ label, value, color = 'slate', tooltip }) => {
  const colorClasses = {
    slate: 'bg-slate-50 text-slate-700 border-slate-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  return (
    <div className={`rounded-xl border px-4 py-3 ${colorClasses[color] || colorClasses.slate}`}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-wide font-semibold opacity-80">{label}</p>
        {tooltip && (
          <div className="relative group">
            <span className="text-gray-400 text-xs cursor-help">ℹ️</span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-800 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center normal-case">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <p className="text-2xl font-black mt-1">{value}</p>
    </div>
  );
};

const fetchAdminReservations = async (page = 1) => {
  const res = await api.get(`/admin/reservations?page=${page}`);

  const reservations = (res.data.data || []).map((r) => {
    const source = r.reservable || r.favoritable || {};
    return {
      ...r,
      typeName: getTypeFromReservation(r),
      title: getTitleFromReservation(source),
    };
  });

  return {
    data: reservations,
    meta: {
      current_page: res.data.current_page,
      last_page: res.data.last_page,
      total: res.data.total,
    },
    counts: res.data.counts || {},
  };
};

const AdminReservations = () => {
  const [page, setPage] = useState(1);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['adminReservations', page],
    queryFn: () => fetchAdminReservations(page),
    placeholderData: keepPreviousData,
  });

  const counts = data?.counts || {};
  const totalRedirected = useMemo(() => (
    Number(counts.redirect_pending || 0) +
    Number(counts.booking_claimed || 0) +
    Number(counts.booking_declined || 0) +
    Number(counts.left_without_booking || 0)
  ), [counts.redirect_pending, counts.booking_claimed, counts.booking_declined, counts.left_without_booking]);

  const conversionRate = useMemo(() => (
    totalRedirected > 0
      ? Math.round((Number(counts.booking_claimed || 0) / totalRedirected) * 100)
      : 0
  ), [counts.booking_claimed, totalRedirected]);

  const interestRate = useMemo(() => (
    Number(counts.saved || 0) > 0
      ? Math.round((totalRedirected / Number(counts.saved || 0)) * 100)
      : 0
  ), [counts.saved, totalRedirected]);

  if (isError) return <div className="p-6 text-red-500">Failed to load reservations.</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mt-4 mx-auto w-[98%] max-w-[1450px]">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">Manage Reservations</h2>
        <div className="h-1 w-20 bg-blue-500 rounded-full mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-4 mb-6">
        <StatCard
          label="Saved"
          value={counts.saved || 0}
          tooltip="Total users who added this to their saved list. This is the top of your conversion funnel."
        />
        <StatCard
          label="Link Opened"
          value={totalRedirected}
          tooltip="Users who clicked 'Book Now' and were redirected to an external booking page."
        />
        <StatCard
          label="Booked ✓"
          value={counts.booking_claimed || 0}
          color="green"
          tooltip="Users who confirmed they completed their booking on the external site. Self-reported."
        />
        <StatCard
          label="Not Booked"
          value={counts.booking_declined || 0}
          color="red"
          tooltip="Users who opened the external page but said they did not complete the booking."
        />
        <StatCard
          label="No Response"
          value={counts.left_without_booking || 0}
          color="gray"
          tooltip="Users who opened the external booking page but closed the popup without responding."
        />
        <StatCard
          label="Conversion"
          value={`${conversionRate}%`}
          color="blue"
          tooltip="Percentage of redirected users who confirmed booking. Formula: Booked ÷ (Booked + Not Booked + No Response)"
        />
        <StatCard
          label="Interest Rate"
          value={`${interestRate}%`}
          color="purple"
          tooltip="Percentage of saved users who clicked 'Book Now'. Formula: Link Opened ÷ Saved"
        />
      </div>

      <ErrorBoundary>
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-gray-500 dark:text-gray-300">
            <span className="text-lg font-medium">Loading reservations...</span>
          </div>
        ) : data?.data?.length === 0 ? (
          <p className="text-center py-10 text-gray-500 dark:text-gray-400 text-lg">No reservations found.</p>
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mt-4">
              <table className="text-left border-collapse w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-750 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                    <th className="py-5 px-[18px] w-12 text-center">ID</th>
                    <th className="py-5 px-[18px] w-44">User Name</th>
                    <th className="py-5 px-[18px] w-32 text-center">Item Type</th>
                    <th className="py-5 px-[18px] w-64">Item Name</th>
                    <th className="py-5 px-[18px] w-40 text-center">Status</th>
                    <th className="py-5 px-[18px] w-40 text-center">Trip Date</th>
                    <th className="py-5 px-[18px] w-20 text-center">Guests</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.data || []).map((res) => {
                    const { cls, label } = getStatusStyle(res.status);
                    return (
                      <tr
                        key={res.id}
                        onClick={() => setSelectedReservation(res)}
                        className="border-b last:border-0 border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer"
                      >
                        <td className="py-4 px-[18px] text-gray-800 dark:text-gray-300 text-center text-xs">#{res.id}</td>
                        <td className="py-4 px-[18px] text-gray-800 dark:text-gray-300">
                          <div className="flex flex-col gap-0.5">
                            <p className="font-semibold text-sm truncate max-w-[140px]">{res.user?.name || 'Unknown'}</p>
                            <p className="text-[10px] text-gray-500 truncate max-w-[140px]">{res.user?.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-[18px] capitalize text-gray-600 dark:text-gray-400 text-center">
                          <span className="text-xs font-medium">{res.typeName}</span>
                        </td>
                        <td className="py-4 px-[18px] text-gray-800 dark:text-white">
                          <div className="max-w-[200px] whitespace-normal break-words line-clamp-2 text-xs font-medium leading-tight" title={res.title}>
                            {res.title}
                          </div>
                        </td>
                        <td className="py-4 px-[18px] text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${cls}`}>
                            {label}
                          </span>
                        </td>
                        <td className="py-4 px-[18px] text-gray-600 dark:text-gray-400 text-[11px] text-center font-bold">
                          {res.date ? new Date(res.date).toLocaleDateString('en-GB') : 'Not specified'}
                        </td>
                        <td className="py-4 px-[18px] text-gray-600 dark:text-gray-400 text-xs text-center font-bold">
                          {res.people ?? 'N/A'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {data?.meta?.last_page > 1 && (
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page {page} of {data.meta.last_page}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(data.meta.last_page, p + 1))}
                  disabled={page === data.meta.last_page}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </ErrorBoundary>

      {selectedReservation && (
        <ReservationDetailDrawer
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}
    </div>
  );
};

export default AdminReservations;
