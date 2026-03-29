import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  BedDouble,
  CalendarDays,
  ClipboardList,
  Compass,
  Landmark,
  MapPinned,
  Pencil,
  Plus,
  Route,
  Trash2,
  UtensilsCrossed,
  Wallet,
} from 'lucide-react';
import TripBuilderModal from '../../components/TripBuilder/TripBuilderModal';
import {
  deletePlan,
  fetchPlanDetail,
  fetchPlans,
  removeItemFromPlan,
  selectActivePlan,
  selectAllPlans,
  selectTripBuilderBlocked,
  selectItemLoading,
  selectTripBuilderLoading,
  setActivePlan,
  updatePlanItem,
} from '../../store/tripBuilderSlice';

const statusClasses = {
  planning: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  upcoming: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  completed: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
};

const typeMeta = {
  Trip: {
    icon: Route,
    color: 'text-sky-600 dark:text-sky-300',
    badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  },
  Hotel: {
    icon: BedDouble,
    color: 'text-violet-600 dark:text-violet-300',
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  },
  Restaurant: {
    icon: UtensilsCrossed,
    color: 'text-amber-600 dark:text-amber-300',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  },
};

const normalizeType = (value) => String(value || '').split('\\').pop() || 'Trip';

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Unscheduled';

const formatMoney = (value) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const getItemName = (item) => {
  const plannable = item?.plannable || {};
  return (
    plannable.name ||
    plannable.name_en ||
    plannable.title ||
    plannable.location ||
    'Untitled service'
  );
};

const getItemPrice = (item) => Number(item?.plannable?.price || 0);

const getItemImage = (item) => {
  const plannable = item?.plannable || {};
  if (Array.isArray(plannable.images) && plannable.images.length > 0) {
    const first = plannable.images[0];
    return typeof first === 'string'
      ? first
      : first?.url || first?.image || first?.path || null;
  }

  return plannable.image || plannable.thumbnail || null;
};

const buildGroups = (items = [], t) => {
  const grouped = items.reduce((acc, item) => {
    const hasDate = Boolean(item.planned_date);
    const key = hasDate ? `date:${item.planned_date}` : `day:${item.day_number ?? 'later'}`;
    if (!acc[key]) {
      acc[key] = {
        key,
        label: hasDate
          ? formatDate(item.planned_date)
          : item.day_number
            ? `Day ${item.day_number}`
            : t('no_schedule'),
        sortDate: hasDate ? new Date(item.planned_date).getTime() : Number.MAX_SAFE_INTEGER,
        sortDay: item.day_number ?? Number.MAX_SAFE_INTEGER,
        items: [],
      };
    }
    acc[key].items.push(item);
    return acc;
  }, {});

  return Object.values(grouped).sort((a, b) => {
    if (a.sortDate !== b.sortDate) {
      return a.sortDate - b.sortDate;
    }
    if (a.sortDay !== b.sortDay) {
      return a.sortDay - b.sortDay;
    }
    return a.label.localeCompare(b.label);
  });
};

const EmptyState = ({ onCreate, t }) => (
  <div className="flex min-h-[65vh] flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
    <div className="mb-5 flex h-18 w-18 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-sky-500 to-emerald-400 text-white shadow-lg shadow-sky-500/20">
      <MapPinned size={32} />
    </div>
    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">{t('no_results')}</h2>
    <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-300">
      {t('create_trip')}
    </p>
    <button
      type="button"
      onClick={onCreate}
      className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400"
    >
      <Plus size={16} />
      {t('create_trip')}
    </button>
  </div>
);

export default function TripBuilderPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const plans = useSelector(selectAllPlans);
  const activePlan = useSelector(selectActivePlan);
  const loading = useSelector(selectTripBuilderLoading);
  const itemLoading = useSelector(selectItemLoading);
  const tripBuilderBlocked = useSelector(selectTripBuilderBlocked);
  const error = useSelector((state) => state.tripBuilder.error);
  const activePlanId = useSelector((state) => state.tripBuilder.activePlanId);
  const userType = useSelector((state) => state.auth.user?.user_type);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [itemForm, setItemForm] = useState({ day_number: '', planned_date: '', notes: '' });
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (userType === 'user' && !tripBuilderBlocked) {
      dispatch(fetchPlans());
    }
  }, [dispatch, userType, tripBuilderBlocked]);

  useEffect(() => {
    if (!plans.length || activePlanId) {
      return;
    }

    const firstPlanId = plans[0].id;
    dispatch(setActivePlan(firstPlanId));
    dispatch(fetchPlanDetail(firstPlanId));
  }, [dispatch, plans, activePlanId]);

  const spent = useMemo(
    () => (activePlan?.items || []).reduce((sum, item) => sum + getItemPrice(item), 0),
    [activePlan]
  );

  const budget = Number(activePlan?.budget || 0);
  const budgetPercent = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
  const groupedItems = useMemo(() => buildGroups(activePlan?.items || [], t), [activePlan, t]);

  const handleSelectPlan = (planId) => {
    setLocalError('');
    dispatch(setActivePlan(planId));
    dispatch(fetchPlanDetail(planId));
  };

  const handleCreateSuccess = (plan) => {
    dispatch(setActivePlan(plan.id));
    dispatch(fetchPlanDetail(plan.id));
  };

  const handleUpdateSuccess = (plan) => {
    dispatch(setActivePlan(plan.id));
    dispatch(fetchPlanDetail(plan.id));
  };

  const handleDeletePlan = async () => {
    if (!activePlan || !window.confirm(`Delete "${activePlan.name}"?`)) {
      return;
    }

    setLocalError('');

    try {
      await dispatch(deletePlan(activePlan.id)).unwrap();
    } catch (err) {
      setLocalError(err || t('error_occurred'));
    }
  };

  const startEditingItem = (item) => {
    setEditingItemId(item.id);
    setItemForm({
      day_number: item.day_number ?? '',
      planned_date: item.planned_date || '',
      notes: item.notes || '',
    });
    setLocalError('');
  };

  const cancelEditingItem = () => {
    setEditingItemId(null);
    setItemForm({ day_number: '', planned_date: '', notes: '' });
  };

  const handleSaveItem = async (itemId) => {
    setLocalError('');

    try {
      await dispatch(
        updatePlanItem({
          itemId,
          data: {
            day_number: itemForm.day_number === '' ? null : Number(itemForm.day_number),
            planned_date: itemForm.planned_date || null,
            notes: itemForm.notes || null,
          },
        })
      ).unwrap();
      cancelEditingItem();
    } catch (err) {
      setLocalError(err || t('error_occurred'));
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (!window.confirm(t('confirm_delete'))) {
      return;
    }

    setLocalError('');

    try {
      await dispatch(removeItemFromPlan(itemId)).unwrap();
    } catch (err) {
      setLocalError(err || t('error_occurred'));
    }
  };

  const planStatusClass = statusClasses[activePlan?.status] || statusClasses.planning;

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-sky-600 shadow-sm ring-1 ring-sky-100 dark:bg-slate-800 dark:text-sky-300 dark:ring-slate-700">
            <Compass size={14} />
            {t('trip_builder')}
          </span>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">{t('my_trips')}</h1>
          <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            {t('itinerary')}
          </p>
        </div>

        {(localError || error) && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            {localError || error}
          </div>
        )}

        {!plans.length && !loading ? (
          <EmptyState onCreate={() => setIsCreateOpen(true)} t={t} />
        ) : (
          <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
            <aside className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-700 px-5 py-6 text-white dark:border-slate-700">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black text-white">{t('my_trips')}</h2>
                    <p className="mt-1 text-sm text-white/80">{t('itinerary')}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(true)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white/15 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    <Plus size={16} />
                    {t('new_trip')}
                  </button>
                </div>
              </div>

              <div className="max-h-[70vh] space-y-3 overflow-y-auto p-4">
                {loading && !plans.length ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-28 animate-pulse rounded-[1.5rem] border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
                    />
                  ))
                ) : (
                  plans.map((plan) => {
                    const isActive = plan.id === activePlanId;
                    const statusClass = statusClasses[plan.status] || statusClasses.planning;

                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`w-full rounded-[1.5rem] border px-4 py-4 text-left transition ${
                          isActive
                            ? 'border-sky-400 bg-gradient-to-br from-slate-900 via-sky-900 to-cyan-700 shadow-lg shadow-sky-900/20 dark:border-sky-500 dark:shadow-none'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className={`text-base font-bold ${isActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{plan.name}</h3>
                            <p className={`mt-1 flex items-center gap-1.5 text-sm ${isActive ? 'text-white/85' : 'text-slate-600 dark:text-slate-300'}`}>
                              <MapPinned size={14} />
                              {plan.destination}
                            </p>
                          </div>
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${statusClass}`}>
                            {t(plan.status)}
                          </span>
                        </div>
                        <div className={`mt-4 flex items-center justify-between text-xs ${isActive ? 'text-white/75' : 'text-slate-500 dark:text-slate-400'}`}>
                          <span>{formatDate(plan.start_date)} → {formatDate(plan.end_date)}</span>
                          <span>{plan.items_count ?? plan.items?.length ?? 0} {t('services')}</span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </aside>

            <section className="min-w-0">
              {activePlan ? (
                <div className="space-y-6">
                  <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <div
                      className="relative h-56 overflow-hidden border-b border-slate-200 dark:border-slate-700"
                      style={{
                        backgroundImage: activePlan.cover_image
                          ? `linear-gradient(to top, rgba(15,23,42,.5), rgba(15,23,42,.1)), url(${activePlan.cover_image})`
                          : 'linear-gradient(135deg, #0f172a 0%, #0369a1 45%, #34d399 100%)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      {!activePlan.cover_image && (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.22),transparent_30%)]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/15 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-3xl font-black tracking-tight text-white">{activePlan.name}</h2>
                          <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${planStatusClass}`}>
                            {t(activePlan.status)}
                          </span>
                        </div>
                        <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/85">
                          <MapPinned size={16} />
                          <span>{activePlan.destination}</span>
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_.9fr]">
                      <div className="space-y-5">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-800">
                            <CalendarDays size={16} />
                            {formatDate(activePlan.start_date)} → {formatDate(activePlan.end_date)}
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-800">
                            <Route size={16} />
                            {activePlan.duration_days || 0} {t('days')}
                          </span>
                        </div>

                        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">
                          <div className="mb-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                              <Wallet size={16} />
                              {t('budget_progress')}
                            </div>
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                              {budget > 0 ? `${budgetPercent}%` : t('not_available')}
                            </span>
                          </div>
                          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                            {t('spent')}: <span className="font-bold text-slate-900 dark:text-white">{formatMoney(spent)}</span>
                            {' '} / {t('budget')}:{' '}
                            <span className="font-bold text-slate-900 dark:text-white">
                              {budget > 0 ? formatMoney(budget) : t('not_available')}
                            </span>
                          </p>
                          <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                            <div
                              className={`h-full rounded-full ${
                                budget > 0 && spent > budget ? 'bg-rose-500' : 'bg-gradient-to-r from-sky-500 to-emerald-400'
                              }`}
                              style={{ width: `${budget > 0 ? Math.max(6, budgetPercent) : 12}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{t('trip_actions')}</p>
                          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            {t('trip_actions')}
                          </p>
                        </div>
                        <div className="grid gap-3">
                          <button
                            type="button"
                            onClick={() => setIsEditOpen(true)}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400"
                          >
                            <Pencil size={16} />
                            {t('edit_trip')}
                          </button>
                          <button
                            type="button"
                            onClick={handleDeletePlan}
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-900/40 dark:text-rose-300 dark:hover:bg-rose-950/30"
                          >
                            <Trash2 size={16} />
                            {t('delete_trip')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-5 dark:border-slate-700">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">{t('itinerary')}</h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                          {t('itinerary')}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        <ClipboardList size={14} />
                        {(activePlan.items || []).length} {t('services')}
                      </span>
                    </div>

                    <div className="space-y-6 p-6">
                      {groupedItems.length ? (
                        groupedItems.map((group) => (
                          <div key={group.key} className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                                <CalendarDays size={18} />
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{group.label}</h4>
                                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                                  {group.items.length} {t('services')}
                                </p>
                              </div>
                            </div>

                            <div className="grid gap-4">
                              {group.items.map((item) => {
                                const normalizedType = normalizeType(item.plannable_type);
                                const meta = typeMeta[normalizedType] || typeMeta.Trip;
                                const TypeIcon = meta.icon;
                                const isEditingItem = editingItemId === item.id;
                                const image = getItemImage(item);

                                return (
                                  <div
                                    key={item.id}
                                    className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-slate-600"
                                  >
                                    <div className="grid gap-4 p-4 md:grid-cols-[140px_minmax(0,1fr)]">
                                      <div className="h-36 overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-slate-900 via-sky-700 to-emerald-400 text-white">
                                        {image ? (
                                          <img src={image} alt={getItemName(item)} className="h-full w-full object-cover" />
                                        ) : (
                                          <div className="flex h-full items-center justify-center">
                                            <TypeIcon size={28} />
                                          </div>
                                        )}
                                      </div>

                                      <div className="min-w-0">
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                          <div className="min-w-0">
                                            <div className={`mb-2 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${meta.badge}`}>
                                              <TypeIcon size={13} />
                                              {normalizedType}
                                            </div>
                                            <h5 className="truncate text-lg font-bold text-slate-900 dark:text-white">{getItemName(item)}</h5>
                                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                              {item.plannable?.location || activePlan.destination}
                                            </p>
                                          </div>
                                          <div className="flex flex-wrap gap-2">
                                            <button
                                              type="button"
                                              onClick={() => startEditingItem(item)}
                                              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                                            >
                                              <Pencil size={14} />
                                              {t('edit')}
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => handleRemoveItem(item.id)}
                                              disabled={itemLoading}
                                              className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-900/40 dark:text-rose-300 dark:hover:bg-rose-950/30"
                                            >
                                              <Trash2 size={14} />
                                              {t('remove')}
                                            </button>
                                          </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                                          <span className="rounded-full bg-white px-3 py-1.5 dark:bg-slate-900">
                                            {item.planned_date ? formatDate(item.planned_date) : item.day_number ? `${t('days')} ${item.day_number}` : t('no_schedule')}
                                          </span>
                                          {getItemPrice(item) > 0 && (
                                            <span className="rounded-full bg-white px-3 py-1.5 dark:bg-slate-900">
                                              {formatMoney(getItemPrice(item))}
                                            </span>
                                          )}
                                          <span className={`rounded-full bg-white px-3 py-1.5 ${meta.color} dark:bg-slate-900`}>
                                            {t('ready_to_book')}
                                          </span>
                                        </div>

                                        {!isEditingItem && item.notes ? (
                                          <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm leading-relaxed text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                                            {item.notes}
                                          </p>
                                        ) : null}

                                        {isEditingItem ? (
                                          <div className="mt-4 grid gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                                            <div className="grid gap-3 sm:grid-cols-2">
                                              <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                                                <span>{t('days')}</span>
                                                <input
                                                  type="number"
                                                  min="1"
                                                  value={itemForm.day_number}
                                                  onChange={(e) =>
                                                    setItemForm((prev) => ({ ...prev, day_number: e.target.value }))
                                                  }
                                                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                />
                                              </label>
                                              <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                                                <span>{t('start_date')}</span>
                                                <input
                                                  type="date"
                                                  value={itemForm.planned_date}
                                                  onChange={(e) =>
                                                    setItemForm((prev) => ({ ...prev, planned_date: e.target.value }))
                                                  }
                                                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                />
                                              </label>
                                            </div>
                                            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                                              <span>{t('itinerary')}</span>
                                              <textarea
                                                rows="3"
                                                value={itemForm.notes}
                                                onChange={(e) =>
                                                  setItemForm((prev) => ({ ...prev, notes: e.target.value }))
                                                }
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                placeholder={t('no_schedule')}
                                              />
                                            </label>
                                            <div className="flex flex-wrap justify-end gap-2">
                                              <button
                                                type="button"
                                                onClick={cancelEditingItem}
                                                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                              >
                                                {t('cancel')}
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() => handleSaveItem(item.id)}
                                                disabled={itemLoading}
                                                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-500 dark:hover:bg-sky-400"
                                              >
                                                {itemLoading ? t('loading') : t('save')}
                                              </button>
                                            </div>
                                          </div>
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-800/40">
                          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                            <Landmark size={28} />
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white">No itinerary items yet</h4>
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                            Start saving hotels, restaurants, or trips to see them grouped here by day.
                          </p>
                        </div>
                      )}
                    </div>
                  </article>
                </div>
              ) : (
                <EmptyState onCreate={() => setIsCreateOpen(true)} t={t} />
              )}
            </section>
          </div>
        )}
      </div>

      <TripBuilderModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      <TripBuilderModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={handleUpdateSuccess}
        initialData={activePlan}
        mode="edit"
      />
    </>
  );
}
