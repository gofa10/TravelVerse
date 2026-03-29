import React, { useState } from 'react';
import ActivityTable from './ActivityTable';
import ActivityModal from './ActivityModal';
import styles from '../UserMang/UserManagement.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const API_BASE = '/activities';

function ActivityManagement() {
  const { t } = useTranslation();
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
      toast.success(t('activity_added_success'));
      closeModal();
    },
    onError: () => toast.error(t('activity_add_failed'))
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
      toast.success(t('activity_updated_success'));
      closeModal();
    },
    onError: () => toast.error(t('activity_update_failed'))
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`${API_BASE}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['activities']);
      toast.success(t('activity_deleted_success'));
    },
    onError: () => toast.error(t('activity_delete_failed'))
  });

  const handleAddActivity = (activityData) => {
    addMutation.mutate(activityData);
  };

  const handleEditActivity = (activityData) => {
    updateMutation.mutate(activityData);
  };

  const handleDeleteActivity = (id) => {
    if (window.confirm(t('confirm_delete_activity'))) {
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

  const activityList = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.items)
      ? data.data.items
      : [];

  const filteredActivities = activityList.filter(act => {
    return (
      act.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 px-8">
          <div>
            <h1 className="text-2xl font-bold dark:text-white">{t('activities_management')}</h1>
            <p className="text-sm text-gray-500">{t('manage_your')} {t('activities')}</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder={t('search_activity_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-gray-800! border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white!"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button className={`${styles.btn} bg-blue-600! hover:bg-blue-800! whitespace-nowrap !rounded-lg`} onClick={openAddModal}>{t('add_activity')}</button>
          </div>
        </div>

        {isLoading ? <p>{t('loading')}</p> : (
          <>
            <ActivityTable
              activities={filteredActivities}
              onEdit={openEditModal}
              onDelete={handleDeleteActivity}
            />
            <div className={styles.pagination}>
              <button onClick={() => setCurrentPage(old => Math.max(old - 1, 1))} disabled={currentPage === 1}>
                {t('previous')}
              </button>
              <span style={{ margin: '0 10px' }}>{t('page')} {currentPage} {t('of')} {data?.data?.last_page || data?.last_page}</span>
              <button onClick={() => setCurrentPage(old => old + 1)} disabled={currentPage === (data?.data?.last_page || data?.last_page)}>
                {t('next')}
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
