import React, { useMemo, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
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

const getStatusStyle = (status, t) => {
  const map = {
    saved: { cls: 'bg-blue-100 text-blue-700', label: t('saved_status') },
    redirect_pending: { cls: 'bg-yellow-100 text-yellow-700', label: t('redirect_pending_status') },
    booking_claimed: { cls: 'bg-green-100 text-green-700', label: t('booking_claimed_status') },
    booking_declined: { cls: 'bg-red-100 text-red-700', label: t('booking_declined_status') },
    left_without_booking: { cls: 'bg-gray-100 text-gray-600', label: t('left_without_booking_status') },
    cancelled: { cls: 'bg-gray-200 text-gray-700', label: t('cancelled_status') },
  };
  return map[status] || { cls: 'bg-gray-100 text-gray-600', label: t('legacy_status') };
};

const getTypeFromReservation = (r) => {
  const model = r.reservable_type || r.favoritable_type;
  return modelToTypeMap[model] || 'item';
};

const getTitleFromReservation = (source, t) => {
  if (!source) return t('unknown_item');
  return (
    source.name_en ||
    source.name ||
    source.title ||
    source.destination ||
    (source.from_location && source.to_location
      ? `${source.from_location} -> ${source.to_location}`
      : null) ||
    t('item')
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

const fetchAdminReservations = async (page = 1, t) => {
  const res = await api.get(`/admin/reservations?page=${page}`);
  const payload = res.data?.data;
  const reservationItems = Array.isArray(payload?.items)
    ? payload.items
    : Array.isArray(payload)
      ? payload
      : [];

  const reservations = reservationItems.map((r) => {
    const source = r.reservable || r.favoritable || {};
    return {
      ...r,
      typeName: getTypeFromReservation(r),
      title: getTitleFromReservation(source, t),
    };
  });

  return {
    data: reservations,
    meta: {
      current_page: payload?.current_page ?? res.data?.current_page,
      last_page: payload?.last_page ?? res.data?.last_page,
      total: payload?.total ?? res.data?.total,
    },
    counts: payload?.counts || res.data?.counts || {},
  };
};

const AdminReservations = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['adminReservations', page],
    queryFn: () => fetchAdminReservations(page, t),
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

  if (isError) return <div className="p-6 text-red-500">{t('failed_load_reservations')}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mt-4 mx-auto w-[98%] max-w-[1450px]">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">{t('manage_reservations')}</h2>
        <div className="h-1 w-20 bg-blue-500 rounded-full mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-4 mb-6">
        <StatCard
          label={t('saved')}
          value={counts.saved || 0}
          tooltip={t('saved_tooltip')}
        />
        <StatCard
          label={t('link_opened')}
          value={totalRedirected}
          tooltip={t('redirect_tooltip')}
        />
        <StatCard
          label={t('booked_check')}
          value={counts.booking_claimed || 0}
          color="green"
          tooltip={t('booked_tooltip')}
        />
        <StatCard
          label={t('not_booked')}
          value={counts.booking_declined || 0}
          color="red"
          tooltip={t('declined_tooltip')}
        />
        <StatCard
          label={t('no_response')}
          value={counts.left_without_booking || 0}
          color="gray"
          tooltip={t('no_response_tooltip')}
        />
        <StatCard
          label={t('conversion')}
          value={`${conversionRate}%`}
          color="blue"
          tooltip={t('conversion_tooltip')}
        />
        <StatCard
          label={t('interest_rate')}
          value={`${interestRate}%`}
          color="purple"
          tooltip={t('interest_rate_tooltip')}
        />
      </div>

      <ErrorBoundary>
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-gray-500 dark:text-gray-300">
            <span className="text-lg font-medium">{t('loading_reservations')}</span>
          </div>
        ) : data?.data?.length === 0 ? (
          <p className="text-center py-10 text-gray-500 dark:text-gray-400 text-lg">{t('no_reservations_found')}</p>
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mt-4">
              <table className="text-left border-collapse w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-750 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                    <th className="py-5 px-[18px] w-12 text-center">{t('id')}</th>
                    <th className="py-5 px-[18px] w-44">{t('user_name')}</th>
                    <th className="py-5 px-[18px] w-32 text-center">{t('item_type')}</th>
                    <th className="py-5 px-[18px] w-64">{t('item_name')}</th>
                    <th className="py-5 px-[18px] w-40 text-center">{t('status')}</th>
                    <th className="py-5 px-[18px] w-40 text-center">{t('trip_date')}</th>
                    <th className="py-5 px-[18px] w-20 text-center">{t('guests')}</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.data || []).map((res) => {
                    const { cls, label } = getStatusStyle(res.status, t);
                    return (
                      <tr
                        key={res.id}
                        onClick={() => setSelectedReservation(res)}
                        className="border-b last:border-0 border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer"
                      >
                        <td className="py-4 px-[18px] text-gray-800 dark:text-gray-300 text-center text-xs">#{res.id}</td>
                        <td className="py-4 px-[18px] text-gray-800 dark:text-gray-300">
                          <div className="flex flex-col gap-0.5">
                            <p className="font-semibold text-sm truncate max-w-[140px]">{res.user?.name || t('unknown')}</p>
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
                          {res.date ? new Date(res.date).toLocaleDateString('en-GB') : t('not_specified')}
                        </td>
                        <td className="py-4 px-[18px] text-gray-600 dark:text-gray-400 text-xs text-center font-bold">
                          {res.people ?? t('na')}
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
                  {t('previous')}
                </button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('page')} {page} {t('of')} {data.meta.last_page}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(data.meta.last_page, p + 1))}
                  disabled={page === data.meta.last_page}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  {t('next')}
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
