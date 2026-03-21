    import React, { useState } from 'react';
    import CruiseTable from './CruiseTable.';
    import CruiseModal from './CruiseModal ';
    import styles from '../UserMang/UserManagement.module.css';
    import api from '../../../Radux/axios';
    import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
    import toast from 'react-hot-toast';

    function CruiseManagement() {
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

    const cruises = data?.data || [];
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
        toast.success('Saved successfully');
        queryClient.invalidateQueries(['cruises']);
        closeModal();
        },
        onError: () => toast.error('Something went wrong'),
    });

    // 🗑 Delete
    const deleteMutation = useMutation({
        mutationFn: (id) => api.delete(`/cruises/${id}`),
        onSuccess: () => {
        toast.success('Deleted successfully');
        queryClient.invalidateQueries(['cruises']);
        },
        onError: () => toast.error('Failed to delete'),
    });

    const handleDeleteCruise = (id) => {
        if (window.confirm('Are you sure you want to delete this cruise?')) {
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
            <h2>Cruises</h2>

            <div className={styles.filters}>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />
            <button className={styles.btn} onClick={openAddModal}>Add Cruise</button>
            </div>

            {isLoading ? (
            <p>Loading...</p>
            ) : isError ? (
            <p>Error loading cruises</p>
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
                    Previous
                </button>
                <span style={{ padding: '0 1rem' }}>
                    Page {data.current_page} of {data.last_page}
                </span>
                <button
                    className={styles.btn}
                    onClick={() =>
                    setPage((prev) => Math.min(prev + 1, data.last_page))
                    }
                    disabled={page === data.last_page}
                >
                    Next
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
