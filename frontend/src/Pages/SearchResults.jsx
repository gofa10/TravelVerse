import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Tag, DollarSign } from 'lucide-react';
import api from '../Radux/axios';

const TYPE_META = {
  hotel: { icon: '🏨', labelKey: 'hotels', badge: 'bg-violet-100 text-violet-700' },
  trip: { icon: '✈️', labelKey: 'trips', badge: 'bg-sky-100 text-sky-700' },
  restaurant: { icon: '🍽️', labelKey: 'restaurants', badge: 'bg-amber-100 text-amber-700' },
  activity: { icon: '🎭', labelKey: 'activities', badge: 'bg-emerald-100 text-emerald-700' },
  car: { icon: '🚗', labelKey: 'cars', badge: 'bg-indigo-100 text-indigo-700' },
  cruise: { icon: '🛳️', labelKey: 'cruises', badge: 'bg-cyan-100 text-cyan-700' },
};

const buildParams = (filters) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    const normalized = String(value ?? '').trim();
    if (normalized !== '') {
      params.set(key, normalized);
    }
  });
  return params;
};

const normalizeCategoryResults = (items, category) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => ({
    ...item,
    type: item.type || category,
    title: item.title || item.name || [item.brand, item.model].filter(Boolean).join(' ').trim(),
  }));
};


const SearchSkeletonCard = () => (
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div className="h-48 animate-pulse bg-slate-200" />
    <div className="space-y-3 p-5">
      <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
      <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
    </div>
  </div>
);

const SearchResults = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    location: searchParams.get('location') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setFilters({
      q: searchParams.get('q') || '',
      category: searchParams.get('category') || '',
      location: searchParams.get('location') || '',
      min_price: searchParams.get('min_price') || '',
      max_price: searchParams.get('max_price') || '',
    });
  }, [searchParams]);

  useEffect(() => {
    const currentParams = buildParams(filters).toString();
    const existingParams = searchParams.toString();

    const timeoutId = setTimeout(() => {
      if (currentParams !== existingParams) {
        setSearchParams(currentParams ? buildParams(filters) : new URLSearchParams(), { replace: true });
      }
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [filters, searchParams, setSearchParams]);

  useEffect(() => {
    const activeFilters = {
      q: searchParams.get('q') || '',
      category: searchParams.get('category') || '',
      location: searchParams.get('location') || '',
      min_price: searchParams.get('min_price') || '',
      max_price: searchParams.get('max_price') || '',
    };

    if (!Object.values(activeFilters).some((value) => String(value).trim() !== '')) {
      setResults([]);
      setLoading(false);
      setError(false);
      return;
    }

    const requestParams = buildParams({
      ...activeFilters,
      full: 'true',
    });

    let cancelled = false;

    const fetchResults = async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await api.get(`/search?${requestParams.toString()}`);
        if (!cancelled) {
          setResults(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setResults([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchResults();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const groupedResults = useMemo(() => {
    return results.reduce((accumulator, item) => {
      if (!accumulator[item.type]) {
        accumulator[item.type] = [];
      }
      accumulator[item.type].push(item);
      return accumulator;
    }, {});
  }, [results]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = () => {
    setFilters({
      q: '',
      category: '',
      location: '',
      min_price: '',
      max_price: '',
    });
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const handleSelect = (item) => {
    navigate(`/itemdetail/${item.id}?type=${item.type}`);
  };

  const resultHeadline = filters.q
    ? `${results.length} ${t('results_found')} "${filters.q}"`
    : `${results.length} ${t('results_found')}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[linear-gradient(135deg,#082f49_0%,#0369a1_55%,#38bdf8_100%)] px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-100">{t('search')}</p>
          <h1 className="mt-3 text-3xl font-black sm:text-5xl">{resultHeadline}</h1>
          <p className="mt-4 max-w-2xl text-sm text-sky-50/90">{t('filter_results')}</p>
        </div>
      </div>

      <div className="mx-auto -mt-8 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-900">{t('filter_results')}</h2>
            <button
              type="button"
              onClick={handleClear}
              className="text-sm font-semibold text-sky-700 transition hover:text-sky-900"
            >
              {t('clear_filters')}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[2fr_1.2fr_1.5fr_1fr_1fr]">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Search className="h-5 w-5 text-sky-600" />
              <input
                type="text"
                value={filters.q}
                onChange={(event) => handleFilterChange('q', event.target.value)}
                placeholder={t('search_placeholder')}
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Tag className="h-5 w-5 text-sky-600" />
              <select
                value={filters.category}
                onChange={(event) => handleFilterChange('category', event.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 outline-none"
              >
                <option value="">{t('all_categories')}</option>
                <option value="trip">{t('trips')}</option>
                <option value="hotel">{t('hotels')}</option>
                <option value="restaurant">{t('restaurants')}</option>
                <option value="activity">{t('activities')}</option>
                <option value="car">{t('cars')}</option>
                <option value="cruise">{t('cruises')}</option>
              </select>
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <MapPin className="h-5 w-5 text-sky-600" />
              <input
                type="text"
                value={filters.location}
                onChange={(event) => handleFilterChange('location', event.target.value)}
                placeholder={t('location')}
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <DollarSign className="h-5 w-5 text-sky-600" />
              <input
                type="number"
                min="0"
                value={filters.min_price}
                onChange={(event) => handleFilterChange('min_price', event.target.value)}
                placeholder={t('min_price')}
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <DollarSign className="h-5 w-5 text-sky-600" />
              <input
                type="number"
                min="0"
                value={filters.max_price}
                onChange={(event) => handleFilterChange('max_price', event.target.value)}
                placeholder={t('max_price')}
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </label>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-600">{resultHeadline}</p>
        </div>

        {loading && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SearchSkeletonCard key={index} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-12 rounded-[28px] border border-rose-200 bg-white p-12 text-center shadow-sm">
            <div className="text-lg font-bold text-slate-900">{t('error_occurred')}</div>
          </div>
        )}

        {!loading && !error && results.length === 0 && (
          <div className="mt-12 rounded-[28px] border border-slate-200 bg-white p-12 text-center shadow-sm">
            <Search className="mx-auto h-12 w-12 text-slate-300" />
            <div className="mt-4 text-xl font-bold text-slate-900">{t('no_results')}</div>
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="mt-8 space-y-10">
            {Object.entries(groupedResults).map(([type, items]) => {
              const meta = TYPE_META[type] || { icon: '📌', labelKey: type, badge: 'bg-slate-100 text-slate-700' };

              return (
                <section key={type} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${meta.badge}`}>
                      <span>{meta.icon}</span>
                      {t(meta.labelKey)}
                    </span>
                    <span className="text-sm text-slate-500">{items.length}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                      <button
                        type="button"
                        key={`${type}-${item.id}`}
                        onClick={() => handleSelect(item)}
                        className="overflow-hidden rounded-[28px] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="relative h-52 bg-slate-100">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-5xl">{meta.icon}</div>
                          )}
                          <span className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${meta.badge}`}>
                            <span>{meta.icon}</span>
                            {t(meta.labelKey)}
                          </span>
                        </div>

                        <div className="space-y-3 p-5">
                          <h3 className="line-clamp-2 text-lg font-bold text-slate-900">{item.title}</h3>

                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MapPin className="h-4 w-4 text-sky-600" />
                            <span className="truncate">{item.location || t('not_available')}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <DollarSign className="h-4 w-4 text-sky-600" />
                            <span>{item.price ?? t('not_available')}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
