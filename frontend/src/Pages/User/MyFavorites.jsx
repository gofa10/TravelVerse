import React, { useState } from 'react';
import styles from '../Admin/UserMang/UserManagement.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../Radux/axios';
import { Spinner, Alert, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const typeLabels = {
  all: 'All',
  Trip: 'Trips',
  Hotel: 'Hotels',
  Restaurant: 'Restaurants',
  Activity: 'Activities',
};

const MyFavorites = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('all');

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
      toast.success('Removed from favorites');
      queryClient.invalidateQueries(['favorites']);
    },
    onError: () => toast.error('Failed to remove'),
  });

  const filteredData =
    filter === 'all'
      ? data
      : data?.filter((fav) => fav.favoritable_type === `App\\Models\\${filter}`);

  if (isLoading) {
    return (
      <div className={styles.card}>
        <Spinner animation="border" /> Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.card}>
        <Alert variant="danger">Failed to load favorites.</Alert>
      </div>
    );
  }

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center text-gray-500 rounded-t-xl">
        <svg className="w-12 h-12 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        <p>No favorites found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">❤️ My Favorites</h2>
      <FilterBar filter={filter} setFilter={setFilter} />

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
            'Unnamed';

          if (!item) return null;

          // Extract image from images array or fallback to single image property
          const rawImages = item.images;
          const image =
            Array.isArray(rawImages) && rawImages.length > 0
              ? (typeof rawImages[0] === 'string'
                ? rawImages[0]
                : rawImages[0]?.url || rawImages[0]?.image || rawImages[0]?.path)
              : item.image || item.thumbnail || null;

          return (
            <div key={fav.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {image ? (
                <img src={image} alt={title} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                  <span className="text-sm">No Image</span>
                </div>
              )}

              <div className="p-4 flex flex-col flex-1">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                  {type}
                </div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 line-clamp-1">{title}</h3>
                {item.location && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 truncate text-right">
                    📍 {item.location}
                  </p>
                )}

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <Link
                    to={`/itemdetail/${item.id}?type=${type}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => deleteMutation.mutate(fav.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 p-2 rounded-full"
                    title="Remove from favorites"
                  >
                    ❌
                  </button>
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
const FilterBar = ({ filter, setFilter }) => (
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
        {label}
      </button>
    ))}
  </div>
);

export default MyFavorites;
