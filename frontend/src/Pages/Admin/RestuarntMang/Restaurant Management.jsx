import React, { useState } from 'react';
import RestaurantTable from './RestaurantTable';
import RestaurantModal from './RestaurantModal';
import styles from '../UserMang/UserManagement.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const API_BASE = '/restaurants';

function RestaurantManagement() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['restaurants', page],
    queryFn: async () => {
      const res = await api.get(`${API_BASE}?page=${page}`);
      return res.data;
    }
  });

  const addMutation = useMutation({
    mutationFn: async (formData) => {
      const data = new FormData();

      for (const key in formData) {
        if (key === 'images') {
          formData.images.forEach((img) => data.append('images[]', img)); // ملفات
        } else if (key === 'image_urls') {
          formData.image_urls.forEach((url) => data.append('image_urls[]', url)); // روابط
        } else if (Array.isArray(formData[key])) {
          formData[key].forEach((val) => data.append(`${key}[]`, val));
        } else {
          data.append(key, formData[key]);
        }
      }

      const res = await api.post(API_BASE, data);
      return res.data;
    },

    onSuccess: () => {
      toast.success(t('restaurant_added_success'));
      closeModal();
    },
    onError: () => {
      toast.error(t('restaurant_add_failed'));
    }

  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...formData }) => {
      const data = new FormData();
      for (const key in formData) {
        if (key === 'images') {
          formData.images.forEach((img) => data.append('images[]', img));
        } else if (key === 'image_urls') {
          formData.image_urls.forEach((url) => data.append('image_urls[]', url));
        } else if (Array.isArray(formData[key])) {
          formData[key].forEach((val) => data.append(`${key}[]`, val));
        } else {
          data.append(key, formData[key]);
        }
      }
      const res = await api.post(`${API_BASE}/${id}?_method=PUT`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['restaurants']);
      toast.success(t('restaurant_updated_success'));
      closeModal();
    },
    onError: () => toast.error(t('restaurant_update_failed'))
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`${API_BASE}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['restaurants']);
      toast.success(t('restaurant_deleted_success'));
    },
    onError: () => toast.error(t('restaurant_delete_failed'))
  });

  const handleAddRestaurant = (restaurantData) => {
    addMutation.mutate(restaurantData);
  };

  const handleEditRestaurant = (restaurantData) => {
    updateMutation.mutate(restaurantData);
  };

  const handleDeleteRestaurant = (id) => {
    if (window.confirm(t('confirm_delete_restaurant'))) {
      deleteMutation.mutate(id);
    }
  };

  const openAddModal = () => {
    setCurrentRestaurant(null);
    setIsModalOpen(true);
  };

  const openEditModal = (restaurant) => {
    setCurrentRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRestaurant(null);
  };

  const restaurantList = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.items)
      ? data.data.items
      : [];

  const filteredRestaurants = restaurantList.filter(restaurant => {
    return (
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 px-8">
          <div>
            <h1 className="text-2xl font-bold dark:text-white">{t('restaurants_management')}</h1>
            <p className="text-sm text-gray-500">{t('manage_restaurants_catalog')}</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder={t('search_by_name_location')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-gray-800! border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white!"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button className={`${styles.btn} bg-blue-600! hover:bg-blue-800! whitespace-nowrap !rounded-lg`} onClick={openAddModal}>
              {t('add_restaurant')}
            </button>
          </div>
        </div>
        {isLoading ? <p>{t('loading')}</p> : (
          <>
            <RestaurantTable
              restaurants={filteredRestaurants}
              onEdit={openEditModal}
              onDelete={handleDeleteRestaurant}
            />
              <div className={styles.pagination}>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>{t('previous')}</button>
                <span>{t('page')} {data?.data?.current_page || data?.current_page} {t('of')} {data?.data?.last_page || data?.last_page}</span>
                <button disabled={page === (data?.data?.last_page || data?.last_page)} onClick={() => setPage(page + 1)}>{t('next')}</button>
              </div>
          </>
        )}
      </div>

      <RestaurantModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={currentRestaurant ? handleEditRestaurant : handleAddRestaurant}
        initialData={currentRestaurant}
      />
    </div>
  );
}

export default RestaurantManagement;
