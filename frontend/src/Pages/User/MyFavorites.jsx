import React, { useState } from 'react';
import styles from '../Admin/UserMang/UserManagement.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../Radux/axios';
import { Spinner, Alert, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { getStorageBaseUrl, getStorageUrl } from '../../Utility/envUtils.js';

const MyFavorites = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('all');

  const getFullImageUrl = (img) => {
    if (!img) return "/fallback.svg";

    // لو img مصفوفة ناخد أول عنصر
    if (Array.isArray(img)) {
      // Check if array is empty
      if (img.length === 0) return "/fallback.svg";
      img = img[0];
    }

    // Extraction logic for objects
    if (img && typeof img === 'object' && img.url) {
      img = img.url;
    }

    if (typeof img !== "string") return "/fallback.svg";

    if (img.startsWith("http") || img.startsWith("data:")) return img;

    // Use getStorageUrl which adds the /storage prefix
    return getStorageUrl(img);
  };

  const typeLabels = {
    all: 'all',
    Trip: 'trip',
    Hotel: 'hotel',
    Restaurant: 'restaurant',
    Activity: 'activitie',
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await api.get('/favorites');
      return res.data?.data ?? res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/favorites/${id}`);
    },
    onSuccess: () => {
      toast.success(t('remove'));
      queryClient.invalidateQueries(['favorites']);
    },
    onError: () => toast.error(t('error_occurred')),
  });

  const filteredData =
    filter === 'all'
      ? data
      : data?.filter((fav) => fav.favoritable_type === `App\\Models\\${filter}`);

  if (isLoading) {
    return (
      <div className={styles.card}>
        <Spinner animation="border" /> {t('loading')}
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.card}>
        <Alert variant="danger">{t('error_occurred')}</Alert>
      </div>
    );
  }

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center text-gray-500 rounded-t-xl">
        <svg className="w-12 h-12 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        <p>{t('no_results')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{t('my_favorites')}</h2>
      <FilterBar filter={filter} setFilter={setFilter} typeLabels={typeLabels} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredData.map((fav) => {
          const item = fav.favoritable;
          const type = fav.favoritable_type?.replace('App\\Models\\', '');
          const title =
            item?.name ||
            item?.title ||
            item?.name_en ||
            item?.name_ar ||
            item?.title_en ||
            item?.title_ar ||
            t('not_available');

          const typeLabelMap = {
            Trip: t('trip'),
            Hotel: t('hotel'),
            Restaurant: t('restaurant'),
            Activity: t('activity'),
          };

          if (!item) return null;

          // Extract image using the same logic as TripCard
          const image = getFullImageUrl(item.images || item.image || item.thumbnail || item.cover);

          return (
            <div key={fav.id} className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col group">
              {/* Image Section */}
              <div className="w-full h-48 relative">
                {image && image !== "/fallback.svg" ? (
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/fallback.svg";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                    <span className="text-sm">{t('no_image')}</span>
                  </div>
                )}

                {/* Delete Button overlaid on image top-right */}
                <button
                  onClick={() => deleteMutation.mutate(fav.id)}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-lg flex items-center justify-center shadow-md transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100"
                  title={t('remove')}
                  aria-label={t('remove')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                  {typeLabelMap[type] || type}
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-snug mb-3 line-clamp-2">{title}</h3>

                <div className="mt-auto flex items-end justify-between pt-1">
                  <div className="text-sm text-gray-600 dark:text-gray-400 truncate pr-2 flex items-center gap-1">
                    {item.location && (
                      <>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span className="truncate">{item.location}</span>
                      </>
                    )}
                  </div>

                  <Link
                    to={`/itemdetail/${item.id}?type=${type}`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap"
                  >
                    {t('view_details')}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ✅ مكون الفلترة العلوي
const FilterBar = ({ filter, setFilter, typeLabels }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {Object.entries(typeLabels).map(([key, label]) => (
        <button
          key={key}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === key
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          onClick={() => setFilter(key)}
        >
          {t(label)}
        </button>
      ))}
    </div>
  );
};

export default MyFavorites;
