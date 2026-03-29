import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import UserTable from './UserTable';
import UserModal from './UserModal';
import GuideCreateModal from './GuideCreateModal';
import UserDetailsModal from './UserDetailsModal';
import styles from './UserManagement.module.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function UserManagement() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailsUserId, setDetailsUserId] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: () => api.get(`/users?page=${page}`).then(res => res.data)
  });

  useEffect(() => {
    api.get('/users/all')
      .then(res => setAllUsers(res.data?.data || []))
      .catch(() => toast.error('Failed to load all users'));
  }, [queryClient]);

  const addUser = useMutation({
    mutationFn: userData => api.post('/users', userData).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User added');
      closeModal();
    },
    onError: () => toast.error('Error adding user')
  });

  const addGuide = useMutation({
    mutationFn: async ({ name, email, password, avatar }) => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('user_type', 'tour_guide');
      if (avatar) formData.append('avatar', avatar);
      return api.post('/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('Tour Guide account created successfully');
      setIsGuideModalOpen(false);
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Error creating guide account'),
  });

  const updateUser = useMutation({
    mutationFn: userData => api.put(`/users/${userData.id}`, userData).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User updated');
      closeModal();
    },
    onError: () => toast.error('Error updating user')
  });

  const deleteUser = useMutation({
    mutationFn: id => api.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted');
    },
    onError: () => toast.error('Error deleting user')
  });

  const extractedUsers = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.items)
      ? data.data.items
      : Array.isArray(data?.data?.data)
        ? data.data.data
        : [];

  const filteredUsers = (search.trim() ? allUsers : extractedUsers).filter(user =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
    setDetailsUserId(null);
  };

  const { data: userDetails, isLoading: isLoadingDetails, isError: isErrorDetails } = useQuery({
    queryKey: ['user-details', detailsUserId],
    queryFn: () => api.get(`/users/${detailsUserId}/details`).then(res => res.data),
    enabled: !!detailsUserId,
  });

  const openDetailsModal = (user) => {
    setDetailsUserId(user.id);
    setIsDetailsOpen(true);
  };

  const renderPagination = () => {
    const totalPages = data?.data?.last_page || data?.last_page || 1;
    if (totalPages <= 1) return null;

    return (
      <div className="d-flex justify-content-center mt-4 gap-2">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>{t('previous')}</button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? 'btn btn-primary' : 'btn btn-outline-primary'}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>{t('next')}</button>
      </div>
    );
  };
  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 px-8">
          <div>
            <h1 className="text-2xl font-bold dark:text-white">{t('user_management')}</h1>
            <p className="text-sm text-gray-500">Manage your users and guides</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white dark:bg-gray-800! border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white!"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <div className="flex gap-2">
              <button className={`${styles.btn} whitespace-nowrap !rounded-lg`} onClick={openAddModal}>Add User</button>
              <button className={`${styles.btn} whitespace-nowrap !rounded-lg`} onClick={() => setIsGuideModalOpen(true)}>Create Guide</button>
            </div>
          </div>
        </div>

        {isLoading ? <p>{t('loading')}</p> : (
          <>
            <UserTable users={filteredUsers} onEdit={openEditModal} onViewDetails={openDetailsModal} onDelete={(id) => {
              if (window.confirm(`Delete user ${id}?`)) deleteUser.mutate(id);
            }} />
            {renderPagination()}
          </>
        )}
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={currentUser ? updateUser.mutate : addUser.mutate}
        initialData={currentUser}
      />

      <UserDetailsModal
        isOpen={isDetailsOpen}
        onClose={closeDetails}
        details={userDetails}
        isLoading={isLoadingDetails}
        error={isErrorDetails}
      />

      <GuideCreateModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onSubmit={(data) => addGuide.mutate(data)}
        isSaving={addGuide.isPending}
      />
    </div>
  );
}

export default UserManagement;
