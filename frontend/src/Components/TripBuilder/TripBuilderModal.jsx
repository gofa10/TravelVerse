import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Sparkles, X } from 'lucide-react';
import {
  createPlan,
  selectItemLoading,
  selectTripBuilderLoading,
  updatePlan,
} from '../../store/tripBuilderSlice';

const emptyForm = {
  name: '',
  destination: '',
  start_date: '',
  end_date: '',
  budget: '',
};

export default function TripBuilderModal({
  isOpen,
  onClose,
  onSuccess,
  initialData = null,
  mode = 'create',
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(selectTripBuilderLoading);
  const itemLoading = useSelector(selectItemLoading);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const isEditing = mode === 'edit' && initialData?.id;
  const isSubmitting = loading || itemLoading;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm({
      name: initialData?.name || '',
      destination: initialData?.destination || '',
      start_date: initialData?.start_date || '',
      end_date: initialData?.end_date || '',
      budget: initialData?.budget ?? '',
    });
    setError('');
  }, [initialData, isOpen]);

  const title = useMemo(
    () => (isEditing ? t('edit_trip') : t('new_trip')),
    [isEditing, t]
  );

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.end_date && form.start_date && form.end_date < form.start_date) {
      setError('End date must be on or after the start date.');
      return;
    }

    const payload = {
      name: form.name.trim(),
      destination: form.destination.trim(),
      start_date: form.start_date,
      end_date: form.end_date,
      budget: form.budget === '' ? null : Number(form.budget),
    };

    try {
      const action = isEditing
        ? updatePlan({ id: initialData.id, data: payload })
        : createPlan(payload);
      const result = await dispatch(action).unwrap();
      onSuccess?.(result);
      onClose?.();
    } catch (err) {
      setError(err || 'Failed to save trip plan.');
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-2xl shadow-slate-900/20 dark:border-slate-700 dark:bg-slate-900">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 opacity-90" />
        <div className="relative p-6 sm:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/85 text-sky-700 shadow-sm">
                <Sparkles size={20} />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Build an itinerary, track your budget, and keep every booking idea in one place.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('trip_name')}*</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="Summer in Barcelona"
                />
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('destination')}*</span>
                <input
                  type="text"
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="Barcelona, Spain"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('start_date')}*</span>
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('end_date')}*</span>
                <input
                  type="date"
                  name="end_date"
                  value={form.end_date}
                  onChange={handleChange}
                  min={form.start_date || undefined}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('budget')}</span>
                <input
                  type="number"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="Optional"
                />
              </label>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                {error}
              </div>
            ) : null}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end dark:border-slate-700">
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-500 dark:hover:bg-sky-400"
              >
                {isSubmitting ? t('loading') : isEditing ? t('save') : t('create_trip')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
