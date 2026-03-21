import React, { useState } from 'react';
import RestaurantTable from './RestaurantTable';
import RestaurantModal from './RestaurantModal';
import styles from '../UserMang/UserManagement.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import { toast } from 'react-toastify';

const API_BASE = '/restaurants';

function RestaurantManagement() {
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
      queryClient.invalidateQueries(['restaurants']);
      toast.success('Restaurant added successfully');
      closeModal();
    },
    onError: () => {
      toast.error('Failed to add restaurant');
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
      toast.success('Restaurant updated successfully');
      closeModal();
    },
    onError: () => toast.error('Failed to update restaurant')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`${API_BASE}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['restaurants']);
      toast.success('Restaurant deleted');
    },
    onError: () => toast.error('Failed to delete restaurant')
  });

  const handleAddRestaurant = (restaurantData) => {
    addMutation.mutate(restaurantData);
  };

  const handleEditRestaurant = (restaurantData) => {
    updateMutation.mutate(restaurantData);
  };

  const handleDeleteRestaurant = (id) => {
    if (window.confirm("Are you sure to delete this restaurant?")) {
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

  const filteredRestaurants = (data?.data || []).filter(restaurant => {
    return (
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        {/* <h2>Restaurants</h2> */}
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search by name or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${styles.searchInput} dark:bg-gray-800! bg-gray-300! dark:text-white! rounded`}
          />
          <button className={`${styles.btn} bg-blue-600! hover:bg-blue-800!`} onClick={openAddModal}>
            Add Restaurant
          </button>
        </div>
        {isLoading ? <p>Loading...</p> : (
          <>
            <RestaurantTable
              restaurants={filteredRestaurants}
              onEdit={openEditModal}
              onDelete={handleDeleteRestaurant}
            />
            <div className={styles.pagination}>
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
              <span>Page {data?.current_page} of {data?.last_page}</span>
              <button disabled={page === data?.last_page} onClick={() => setPage(page + 1)}>Next</button>
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
