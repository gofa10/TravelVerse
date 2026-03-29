import React from 'react';
import { useTranslation } from 'react-i18next';

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || '').replace('/api', '');

const toAbsolute = (url) => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_ORIGIN}${url}`;
};

const getStatusStyle = (status) => {
  const map = {
    saved: 'bg-blue-100 text-blue-700',
    redirect_pending: 'bg-yellow-100 text-yellow-700',
    booking_claimed: 'bg-green-100 text-green-700',
    booking_declined: 'bg-red-100 text-red-700',
    left_without_booking: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-slate-200 text-slate-700',
  };
  return map[status] || 'bg-gray-100 text-gray-600';
};

const stepReached = (status, step) => {
  if (step === 'saved') return true;
  if (step === 'opened') return ['redirect_pending', 'booking_claimed', 'booking_declined', 'left_without_booking', 'cancelled'].includes(status);
  if (step === 'response') return ['booking_claimed', 'booking_declined', 'left_without_booking'].includes(status);
  if (step === 'cancelled') return status === 'cancelled';
  return false;
};

export default function ReservationDetailDrawer({ reservation, onClose }) {
  const { t } = useTranslation();
  const isOpen = !!reservation;
  if (!reservation) return null;

  const item = reservation.reservable || {};
  const itemType = reservation.reservable_type?.split('\\').pop() || t('item');
  const itemName =
    item.name_en ||
    item.name ||
    item.title ||
    (item.from_location && item.to_location ? `${item.from_location} -> ${item.to_location}` : null) ||
    t('unknown_item');
  const location = item.location || (item.from_location && item.to_location ? `${item.from_location} -> ${item.to_location}` : null);
  const bookingLink = item.booking_link || item.booking_url || item.external_url || item.link || null;
  const firstImage = Array.isArray(item.images) && item.images.length > 0
    ? (typeof item.images[0] === 'string' ? item.images[0] : item.images[0]?.url)
    : null;
  const itemImage = toAbsolute(firstImage);
  const userAvatar = toAbsolute(reservation.user?.profile_image || reservation.user?.avatar || reservation.user?.image?.url || null);
  const userName = reservation.user?.name || t('unknown_user');
  const initials = userName.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase() || 'U';

  return (
    <>
      <div className="fixed top-16 inset-0 bg-black/30 z-[1000]" onClick={onClose} />
      <div
        className={`fixed top-16 right-0 h-[calc(100vh-64px)] w-96 bg-white shadow-xl transform transition-transform duration-300 z-[1001] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full overflow-y-auto p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-slate-900">{t('reservation_details')}</h3>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-800 text-xl leading-none">×</button>
          </div>

          <section className="mb-6">
            <p className="text-xs uppercase text-slate-400 font-semibold mb-2">{t('user_info')}</p>
            <div className="flex items-center gap-3">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  {initials}
                </div>
              )}
              <div>
                <p className="font-semibold text-slate-900">{userName}</p>
                <p className="text-sm text-slate-500">{reservation.user?.email || t('no_email')}</p>
                <span className="inline-flex mt-1 px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">
                  {reservation.user?.user_type || 'user'}
                </span>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <p className="text-xs uppercase text-slate-400 font-semibold mb-2">{t('item_info')}</p>
            <div className="space-y-2">
              <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-700">{itemType}</span>
              <p className="font-semibold text-slate-900">{itemName}</p>
              {itemImage ? (
                <img src={itemImage} alt={itemName} className="w-full h-36 object-cover rounded-lg border border-slate-200" />
              ) : (
                <div className="w-full h-24 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 flex items-center justify-center text-sm">{t('no_image')}</div>
              )}
              <p className="text-sm text-slate-500">{location || t('location_not_specified')}</p>
            </div>
          </section>

          <section className="mb-6">
            <p className="text-xs uppercase text-slate-400 font-semibold mb-2">{t('reservation_details')}</p>
            <div className="space-y-1.5 text-sm">
              <p><span className="text-slate-500">{t('reservation_id')}:</span> #{reservation.id}</p>
              <p>
                <span className="text-slate-500">{t('status')}:</span>{' '}
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusStyle(reservation.status)}`}>
                  {reservation.status ? t(reservation.status) : t('legacy')}
                </span>
              </p>
              <p><span className="text-slate-500">{t('date')}:</span> {reservation.date ? new Date(reservation.date).toLocaleDateString('en-GB') : t('not_specified')}</p>
              <p><span className="text-slate-500">{t('guests')}:</span> {reservation.people ?? 1}</p>
              <p><span className="text-slate-500">{t('created_at')}:</span> {reservation.created_at ? new Date(reservation.created_at).toLocaleString('en-GB') : t('not_specified')}</p>
              <p><span className="text-slate-500">{t('cancelled_at')}:</span> {reservation.cancelled_at ? new Date(reservation.cancelled_at).toLocaleString('en-GB') : '—'}</p>
            </div>
          </section>

          <section className="mb-6">
            <p className="text-xs uppercase text-slate-400 font-semibold mb-2">{t('booking_link')}</p>
            {bookingLink ? (
              <a href={bookingLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">
                {t('open_external_booking')}
              </a>
            ) : (
              <p className="text-sm text-slate-500">{t('no_booking_link')}</p>
            )}
          </section>

          <section>
            <p className="text-xs uppercase text-slate-400 font-semibold mb-2">{t('status_timeline')}</p>
            <div className="space-y-3">
              {[
                { key: 'saved', label: t('saved'), time: reservation.created_at },
                { key: 'opened', label: t('link_opened'), time: stepReached(reservation.status, 'opened') ? reservation.updated_at : null },
                {
                  key: 'response',
                  label: reservation.status === 'booking_claimed'
                    ? t('booking_response_booked')
                    : reservation.status === 'booking_declined'
                      ? t('booking_response_not_booked')
                      : reservation.status === 'left_without_booking'
                        ? t('booking_response_no_response')
                        : t('booking_response'),
                  time: stepReached(reservation.status, 'response') ? reservation.updated_at : null,
                },
                { key: 'cancelled', label: t('cancelled'), time: reservation.cancelled_at },
              ].map((step) => {
                const active = stepReached(reservation.status, step.key);
                return (
                  <div key={step.key} className="flex items-start gap-2">
                    <span className={`mt-1 w-2.5 h-2.5 rounded-full ${active ? 'bg-blue-600' : 'bg-slate-300'}`} />
                    <div>
                      <p className={`text-sm ${active ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>{step.label}</p>
                      <p className="text-xs text-slate-400">{step.time ? new Date(step.time).toLocaleString('en-GB') : '—'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
