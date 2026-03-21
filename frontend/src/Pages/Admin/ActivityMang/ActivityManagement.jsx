import React, { useState } from 'react';
import ActivityTable from './ActivityTable';
import ActivityModal from './ActivityModal';
import styles from '../UserMang/UserManagement.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import { toast } from 'react-toastify';

const API_BASE = '/activities';

function ActivityManagement() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['activities', currentPage],
    queryFn: async () => {
      const res = await api.get(`${API_BASE}?page=${currentPage}`);
      return res.data;
    },
    keepPreviousData: true
  });

  const addMutation = useMutation({
    mutationFn: async (formData) => {
      const data = new FormData();
      for (const key in formData) {
        if (key === 'images') {
          formData.images.forEach((img) => data.append('images[]', img));
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
      queryClient.invalidateQueries(['activities']);
      toast.success('Activity added successfully');
      closeModal();
    },
    onError: () => toast.error('Failed to add activity')
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...formData }) => {
      const data = new FormData();
      for (const key in formData) {
        if (key === 'images') {
          formData.images.forEach((img) => data.append('images[]', img));
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
      queryClient.invalidateQueries(['activities']);
      toast.success('Activity updated successfully');
      closeModal();
    },
    onError: () => toast.error('Failed to update activity')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`${API_BASE}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['activities']);
      toast.success('Activity deleted');
    },
    onError: () => toast.error('Failed to delete activity')
  });

  const handleAddActivity = (activityData) => {
    addMutation.mutate(activityData);
  };

  const handleEditActivity = (activityData) => {
    updateMutation.mutate(activityData);
  };

  const handleDeleteActivity = (id) => {
    if (window.confirm("Are you sure to delete this activity?")) {
      deleteMutation.mutate(id);
    }
  };

  const openAddModal = () => {
    setCurrentActivity(null);
    setIsModalOpen(true);
  };

  const openEditModal = (activity) => {
    setCurrentActivity(activity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentActivity(null);
  };

  const filteredActivities = (data?.data || []).filter(act => {
    return (
      act.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
console.log(filteredActivities);

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        {/* <h2>Activities</h2> */}
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search by name or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${styles.searchInput} dark:bg-gray-800! bg-gray-300! dark:text-white! rounded`}
          />
          <button className={`${styles.btn} bg-blue-600! hover:bg-blue-800!`} onClick={openAddModal}>Add Activity</button>
        </div>

        {isLoading ? <p>Loading...</p> : (
          <>
            <ActivityTable
              activities={filteredActivities}
              onEdit={openEditModal}
              onDelete={handleDeleteActivity}
            />
            <div className={styles.pagination}>
              <button onClick={() => setCurrentPage(old => Math.max(old - 1, 1))} disabled={currentPage === 1}>
                Previous
              </button>
              <span style={{ margin: '0 10px' }}>Page {currentPage} of {data?.last_page}</span>
              <button onClick={() => setCurrentPage(old => old + 1)} disabled={currentPage === data?.last_page}>
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <ActivityModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={currentActivity ? handleEditActivity : handleAddActivity}
        initialData={currentActivity}
      />
    </div>
  );
}

export default ActivityManagement;
