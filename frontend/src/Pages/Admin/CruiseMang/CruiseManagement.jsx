import React, { useState } from 'react';
import CruiseTable from './CruiseTable';
import CruiseModal from './CruiseModal';
import styles from '../UserMang/UserManagement.module.css';
import api from '../../../Radux/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function CruiseManagement() {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCruise, setCurrentCruise] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

    const queryClient = useQueryClient();

    // 📥 Fetch cruises with pagination
    const { data, isLoading, isError } = useQuery({
        queryKey: ['cruises', page],
        queryFn: () => api.get(`/cruises?page=${page}`).then(res => res.data),
        keepPreviousData: true,
    });

    const cruises = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.items)
            ? data.data.items
            : [];
    //   const meta = data?.meta || {};

    const filteredCruises = cruises.filter(c =>
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 📤 Add or Update
    const mutation = useMutation({
        mutationFn: async (formData) => {
            const isUpdate = formData.get('id');
            const url = isUpdate
                ? `/cruises/${formData.get('id')}?_method=PUT`
                : '/cruises';
            return api.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        },
        onSuccess: () => {
            toast.success(t('cruise_saved_success'));
            queryClient.invalidateQueries(['cruises']);
            closeModal();
        },
        onError: () => toast.error(t('cruise_save_failed')),
    });

    // 🗑 Delete
    const deleteMutation = useMutation({
        mutationFn: (id) => api.delete(`/cruises/${id}`),
        onSuccess: () => {
            toast.success(t('cruise_deleted_success'));
            queryClient.invalidateQueries(['cruises']);
        },
        onError: () => toast.error(t('cruise_delete_failed')),
    });

    const handleDeleteCruise = (id) => {
        if (window.confirm(t('confirm_delete_cruise'))) {
            deleteMutation.mutate(id);
        }
    };

    const openAddModal = () => {
        setCurrentCruise(null);
        setIsModalOpen(true);
    };

    const openEditModal = (cruise) => {
        setCurrentCruise(cruise);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCurrentCruise(null);
        setIsModalOpen(false);
    };

    const handleSubmit = (cruiseData) => {
        const formData = new FormData();
        if (cruiseData.id) formData.append('id', cruiseData.id);

        for (const key in cruiseData) {
            if (key === 'images') {
                cruiseData.images.forEach((img) => {
                    if (img instanceof File) formData.append('images[]', img);
                });
            } else {
                formData.append(key, cruiseData[key]);
            }
        }

        mutation.mutate(formData);
    };

    return (
        <div className={styles.content}>
            <div className={styles.card}>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 px-8">
                    <div>
                        <h1 className="text-2xl font-bold dark:text-white">{t('cruises_management')}</h1>
                        <p className="text-sm text-gray-500">{t('manage_cruises_catalog')}</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder={t('search_by_name')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white dark:bg-gray-800! border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white!"
                            />
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <button className={`${styles.btn} whitespace-nowrap !rounded-lg`} onClick={openAddModal}>{t('add_cruise')}</button>
                    </div>
                </div>

                {isLoading ? (
                    <p>{t('loading')}</p>
                ) : isError ? (
                    <p>{t('error_occurred')}</p>
                ) : (
                    <>
                        <CruiseTable
                            cruises={filteredCruises}
                            onEdit={openEditModal}
                            onDelete={handleDeleteCruise}
                        />

                        <div className={styles.pagination}>
                            <button
                                className={styles.btn}
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                            >
                                {t('previous')}
                            </button>
                            <span style={{ padding: '0 1rem' }}>
                                {t('page')} {data.current_page} {t('of')} {data.last_page}
                            </span>
                            <button
                                className={styles.btn}
                                onClick={() =>
                                    setPage((prev) => Math.min(prev + 1, data.last_page))
                                }
                                disabled={page === data.last_page}
                            >
                                {t('next')}
                            </button>
                        </div>
                    </>
                )}
            </div>

            <CruiseModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
                initialData={currentCruise}
            />
        </div>
    );
}

export default CruiseManagement;
