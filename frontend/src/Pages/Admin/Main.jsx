import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import api from '../../Radux/axios';

const statusBadgeMap = {
  saved: 'bg-blue-100 text-blue-700',
  redirect_pending: 'bg-yellow-100 text-yellow-700',
  booking_claimed: 'bg-green-100 text-green-700',
  booking_declined: 'bg-red-100 text-red-700',
  left_without_booking: 'bg-gray-100 text-gray-700',
  cancelled: 'bg-slate-100 text-slate-700',
};

const formatStatus = (status) => {
  if (!status) return 'Legacy';
  return status.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const getInitials = (name = '') => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return 'U';
  if (words.length === 1) return words[0].slice(0, 1).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
};

const typeColorMap = {
  Trip: 'bg-sky-100 text-sky-700',
  Hotel: 'bg-indigo-100 text-indigo-700',
  Restaurant: 'bg-orange-100 text-orange-700',
  Activity: 'bg-emerald-100 text-emerald-700',
};

const StatCard = ({ icon, value, label, subtitle, iconBg = 'bg-blue-100 text-blue-700' }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-2xl font-black text-gray-900 dark:text-white">{value ?? 0}</p>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1">{label}</p>
        {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className={`h-11 w-11 rounded-xl flex items-center justify-center text-lg ${iconBg}`}>
        {icon}
      </div>
    </div>
  </div>
);

const FunnelBanner = ({ funnel }) => {
  const { t } = useTranslation();
  const saved = Number(funnel?.saved || 0);
  const opened = Number(funnel?.redirect_pending || 0);
  const booked = Number(funnel?.booking_claimed || 0);
  const declined = Number(funnel?.booking_declined || 0);
  const noResponse = Number(funnel?.left_without_booking || 0);
  const interacted = opened + booked + declined + noResponse;
  const conversionRate = interacted > 0 ? Math.round((booked / interacted) * 100) : 0;
  const interestRate = saved > 0 ? Math.round((interacted / saved) * 100) : 0;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-5 border border-blue-100 dark:border-gray-600">
      <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
        <span className="inline-flex items-center gap-2"><span>🔵</span>{t('saved_label')}: {saved}</span>
        <span className="text-gray-400">→</span>
        <span className="inline-flex items-center gap-2"><span>🟡</span>{t('opened_label')}: {interacted}</span>
        <span className="text-gray-400">→</span>
        <span className="inline-flex items-center gap-2"><span>🟢</span>{t('booked_label')}: {booked}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-6 text-sm">
        <p className="text-blue-700 dark:text-blue-300 font-semibold">{t('conversion_rate')}: {conversionRate}%</p>
        <p className="text-purple-700 dark:text-purple-300 font-semibold">{t('interest_rate')}: {interestRate}%</p>
      </div>
    </div>
  );
};

const Avatar = ({ name, image }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-3 min-w-0">
      {image ? (
        <img src={image} alt={name} className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
      ) : (
        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 flex items-center justify-center font-bold text-xs">
          {getInitials(name)}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{name || t('unknown_user')}</p>
      </div>
    </div>
  );
};

const RecentReservationRow = ({ reservation }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b last:border-b-0 border-gray-100 dark:border-gray-700">
      <div className="min-w-0 flex-1">
        <Avatar name={reservation.user?.name} image={reservation.user?.profile_image} />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{reservation.reservable_name}</p>
      </div>
      <div className="text-right shrink-0">
        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${typeColorMap[reservation.reservable_type] || 'bg-slate-100 text-slate-700'}`}>
          {reservation.reservable_type ? t(reservation.reservable_type) : t('item')}
        </span>
        <div className="mt-1">
          <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${statusBadgeMap[reservation.status] || 'bg-gray-100 text-gray-600'}`}>
            {reservation.status ? t(reservation.status) : t('legacy')}
          </span>
        </div>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
          {reservation.created_at ? new Date(reservation.created_at).toLocaleString() : ''}
        </p>
      </div>
    </div>
  );
};

const RecentReviewRow = ({ review }) => {
  const { t } = useTranslation();
  const stars = Array.from({ length: 5 }, (_, i) => (i < Number(review.rating || 0) ? '★' : '☆')).join('');
  return (
    <div className="py-3 border-b last:border-b-0 border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between gap-3">
        <Avatar name={review.user?.name} image={review.user?.profile_image} />
        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${typeColorMap[review.reviewable_type] || 'bg-slate-100 text-slate-700'}`}>
          {review.reviewable_type || 'Item'}
        </span>
      </div>
      <p className="text-sm text-gray-800 dark:text-gray-100 mt-2 truncate">{review.reviewable_name || t('unknown_item')}</p>
      <p className="text-xs text-amber-500 font-bold mt-1">{stars} {Number(review.rating || 0).toFixed(1)}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{review.body || t('no_reviews_yet')}</p>
    </div>
  );
};

const TopTripCard = ({ trip }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      {trip.image ? (
        <img src={trip.image} alt={trip.name} className="w-full h-36 object-cover" />
      ) : (
        <div className="w-full h-36 bg-gradient-to-r from-blue-100 to-slate-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-200 font-semibold">
          {t('no_image')}
        </div>
      )}
      <div className="p-4">
        <h4 className="font-bold text-gray-800 dark:text-white line-clamp-1">{trip.name}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{trip.location || t('location_unavailable')}</p>
        <p className="text-sm text-amber-500 font-bold mt-2">★★★★★ {Number(trip.average_rating || 0).toFixed(1)}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{trip.reviews_count || 0} {t('reviews')}</p>
        <Link
          to={`/itemdetail/${trip.id}?type=trip`}
          className="mt-3 inline-flex px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
        >
          {t('view_trip')}
        </Link>
      </div>
    </div>
  );
};

const DashboardSkeleton = () => (
  <div className="space-y-5 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx} className="h-28 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700" />
      ))}
    </div>
    <div className="h-24 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700" />
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
      <div className="xl:col-span-3 h-80 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700" />
      <div className="xl:col-span-2 h-80 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700" />
    </div>
    <div className="h-72 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700" />
  </div>
);

const getCollectionCount = (payload) => {
  if (Array.isArray(payload)) return payload.length;
  const data = payload?.data;
  if (Array.isArray(data)) return data.length;
  return data?.total ?? data?.items?.length ?? payload?.total ?? 0;
};

const Main = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: () => api.get('/admin/dashboard').then((response) => response.data),
    refetchInterval: 60000,
  });
  const { data: carsCount = 0 } = useQuery({
    queryKey: ['admin-dashboard-cars-count'],
    queryFn: () => api.get('/cars').then((response) => getCollectionCount(response.data)),
    refetchInterval: 60000,
  });
  const { data: cruisesCount = 0 } = useQuery({
    queryKey: ['admin-dashboard-cruises-count'],
    queryFn: () => api.get('/cruises').then((response) => getCollectionCount(response.data)),
    refetchInterval: 60000,
  });

  if (isLoading) {
    return (
      <main className="bg-gray-100 dark:bg-gray-900 min-h-screen p-5">
        <DashboardSkeleton />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="bg-gray-100 dark:bg-gray-900 min-h-screen p-5">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-red-100 dark:border-red-800">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400">Failed to load dashboard data</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            The dashboard API is unavailable right now. Try again.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  const stats = data?.data?.stats || {};
  const funnel = data?.data?.reservation_funnel || {};
  const recentReservations = data?.data?.recent_reservations || [];
  const recentReviews = data?.data?.recent_reviews || [];
  const topRatedTrips = data?.data?.top_rated_trips || [];

  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen p-5">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('live_analytics_dashboard')}</h1>
        <span className="text-xs text-gray-500 dark:text-gray-400">{isFetching ? t('refreshing') : t('auto_refresh_60s')}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        <StatCard icon="👥" value={stats.total_users || 0} label={t('users_capital')} subtitle={t('registered')} iconBg="bg-blue-100 text-blue-700" />
        <StatCard icon="🗺️" value={stats.total_trips || 0} label={t('trips')} subtitle={t('available')} iconBg="bg-green-100 text-green-700" />
        <StatCard icon="⭐" value={stats.total_reviews || 0} label={t('reviews')} subtitle={t('total')} iconBg="bg-yellow-100 text-yellow-700" />
        <StatCard icon="📋" value={stats.total_reservations || 0} label={t('bookings')} subtitle={t('total')} iconBg="bg-purple-100 text-purple-700" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <StatCard icon="🏨" value={stats.total_hotels || 0} label={t('hotels')} subtitle={t('listed')} iconBg="bg-indigo-100 text-indigo-700" />
        <StatCard icon="🍽️" value={stats.total_restaurants || 0} label={t('restaurants')} subtitle={t('listed')} iconBg="bg-orange-100 text-orange-700" />
        <StatCard icon="🎯" value={stats.total_activities || 0} label={t('activitie')} subtitle={t('listed')} iconBg="bg-emerald-100 text-emerald-700" />
        <StatCard icon="⭐" value={`${Number(stats.average_rating || 0).toFixed(1)}/5`} label={t('avg_rating')} subtitle={t('across_reviews')} iconBg="bg-amber-100 text-amber-700" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <StatCard icon="🚗" value={carsCount} label={t('total_cars')} subtitle={t('listed')} iconBg="bg-cyan-100 text-cyan-700" />
        <StatCard icon="🛳️" value={cruisesCount} label={t('total_cruises')} subtitle={t('listed')} iconBg="bg-sky-100 text-sky-700" />
      </div>

      <div className="mb-5">
        <FunnelBanner funnel={funnel} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 mb-5">
        <section className="xl:col-span-3 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{t('recent_activities')}</h2>
            <Link to="/admin/reservations" className="text-xs font-semibold text-blue-600 hover:text-blue-700">{t('view_all')}</Link>
          </div>
          {recentReservations.length > 0 ? (
            recentReservations.map((reservation) => <RecentReservationRow key={reservation.id} reservation={reservation} />)
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('no_reservations_yet')}.</p>
          )}
        </section>

        <section className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{t('recent_reviews')}</h2>
            <span className="text-xs font-semibold text-gray-400">{t('reviews_not_configured')}</span>
          </div>
          {recentReviews.length > 0 ? (
            recentReviews.map((review) => <RecentReviewRow key={review.id} review={review} />)
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('no_reviews_yet')}.</p>
          )}
        </section>
      </div>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">⭐ {t('top_rated_trips')}</h2>
        {topRatedTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {topRatedTrips.map((trip) => <TopTripCard key={trip.id} trip={trip} />)}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('not_enough_ratings')}
          </p>
        )}
      </section>
    </main>
  );
};

export default Main;
