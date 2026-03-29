import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import api from '../../Radux/axios';

export default function GuideMyReservations() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [updatingId, setUpdatingId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['guide-reservations'],
    queryFn: async () => {
      const res = await api.get('/guide/reservations');
      return res.data?.data || res.data || [];
    },
  });

  const reservations = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.items)
      ? data.data.items
      : [];

  const updateAttendance = async (reservationId, attendanceStatus) => {
    setUpdatingId(reservationId);
    try {
      await api.patch(`/guide/reservations/${reservationId}/attendance`, {
        attendance_status: attendanceStatus,
      });
      queryClient.setQueryData(['guide-reservations'], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: (Array.isArray(old.data) ? old.data : Array.isArray(old.data?.items) ? old.data.items : []).map((r) =>
            r.id === reservationId
              ? { ...r, attendance_status: attendanceStatus, attendance_marked_at: new Date().toISOString() }
              : r
          ),
        };
      });
    } catch (error) {
      console.error('Failed to update attendance:', error);
      alert(error.response?.data?.message || t('error_occurred'));
    } finally {
      setUpdatingId(null);
    }
  };

  const renderAttendanceBadge = (status) => {
    if (!status) return <span className="text-gray-400">-</span>;
    if (status === 'confirmed_attended') {
      return (
        <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-1 text-xs font-medium text-green-700 dark:text-green-400">
          {t('attended')}
        </span>
      );
    }
    if (status === 'no_show') {
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/30 px-2.5 py-1 text-xs font-medium text-red-700 dark:text-red-400">
          {t('no_show')}
        </span>
      );
    }
    return <span className="text-gray-400">-</span>;
  };

  const canMarkAttendance = (reservation) =>
    reservation.status === 'booking_claimed' && reservation.attendance_status === null;

  return (
    <div style={{ marginTop: '16px' }} className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('my_reservations')}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Bookings made on your trips</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="px-6 py-8 text-gray-600 dark:text-gray-300">{t('loading_reservations')}</div>
        ) : isError ? (
          <div className="px-6 py-8 text-red-600 dark:text-red-400">{t('failed_load_reservations')}</div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <p className="text-lg font-medium">No reservations yet</p>
            <p className="text-sm mt-1">New bookings on your trips will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3">Traveler</th>
                  <th className="px-6 py-3">Trip</th>
                  <th className="px-6 py-3">{t('date')}</th>
                  <th className="px-6 py-3">{t('people')}</th>
                  <th className="px-6 py-3">{t('status')}</th>
                  <th className="px-6 py-3">Attendance</th>
                  <th className="px-6 py-3">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4">{reservation.user?.name || 'N/A'}</td>
                    <td className="px-6 py-4">{reservation.reservable?.name_en || reservation.reservable?.name_ar || 'N/A'}</td>
                    <td className="px-6 py-4">{reservation.date || (reservation.created_at ? new Date(reservation.created_at).toLocaleDateString() : '-')}</td>
                    <td className="px-6 py-4">{reservation.people ?? '-'}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-xs font-medium capitalize">
                        {reservation.status?.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">{renderAttendanceBadge(reservation.attendance_status)}</td>
                    <td className="px-6 py-4">
                      {canMarkAttendance(reservation) ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateAttendance(reservation.id, 'confirmed_attended')}
                            disabled={updatingId === reservation.id}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {updatingId === reservation.id ? t('loading') : t('confirmed')}
                          </button>
                          <button
                            onClick={() => updateAttendance(reservation.id, 'no_show')}
                            disabled={updatingId === reservation.id}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {updatingId === reservation.id ? t('loading') : t('no_show')}
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
