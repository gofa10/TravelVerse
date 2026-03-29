// TripManagement.jsx
import React, { useState } from 'react';
import TripModal from './TripModal';
import styles from '../UserMang/UserManagement.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios'; // ✅ استخدم النسخة التي فيها التوكن
import { useTranslation } from 'react-i18next';

const fetchTrips = async () => {
  const res = await api.get('/trips');
  const payload = res.data?.data;
  const trips = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.items)
      ? payload.items
      : [];

  return trips.map(trip => ({
    ...trip,
    name_ar: trip.name,
    name_en: trip.name,
    guide_name: trip.guide?.name || '',
    has_guide: !!trip.guide,
    images: trip.images || [],
  }));
};


function TripManagement() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: trips = [], isLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: fetchTrips,
  });

  const addTripMutation = useMutation({
    mutationFn: async (tripData) => {
      const { images, guide_name, has_guide, ...rest } = tripData;
      const payload = {
        ...rest,
        guide_id: has_guide ? tripData.guide_id || null : null,
      };
      const res = await api.post('/trips', payload);

      if (images.length) {
        const formData = new FormData();
        images.forEach(img => formData.append('images[]', img));
        await api.post(`/trips/${res.data.id}/images`, formData);
      }
      if (tripData.image_urls?.length) {
        await Promise.all(
          tripData.image_urls.map(url =>
            api.post(`/trips/${res.data.id}/images`, {
              imageable_id: res.data.id,
              imageable_type: 'App\\Models\\Trip',
              url,
            })
          )
        );
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    }
  });

  const editTripMutation = useMutation({
    mutationFn: async (tripData) => {
      const { id, images, guide_name, has_guide, ...rest } = tripData;
      const payload = {
        ...rest,
        guide_id: has_guide ? tripData.guide_id || null : null,
      };
      await api.put(`/trips/${id}`, payload);

      if (images.length && typeof images[0] !== 'string') {
        const formData = new FormData();
        images.forEach(img => formData.append('images[]', img));
        await api.post(`/trips/${id}/images`, formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    }
  });

  const deleteTripMutation = useMutation({
    mutationFn: (id) => api.delete(`/trips/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    }
  });

  const handleAddTrip = (tripData) => {
    addTripMutation.mutate(tripData);
    closeModal();
  };

  const handleEditTrip = (tripData) => {
    editTripMutation.mutate(tripData);
    closeModal();
  };

  const handleDeleteTrip = (id) => {
    if (window.confirm(t('confirm_delete_trip'))) {
      deleteTripMutation.mutate(id);
    }
  };

  const openAddModal = () => {
    setCurrentTrip(null);
    setIsModalOpen(true);
  };

  const openEditModal = (trip) => {
    const fixedTrip = {
      ...trip,
      guide_id: trip.guide?.id || '',
      has_guide: !!trip.guide,
    };
    setCurrentTrip(fixedTrip);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTrip(null);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const filteredTrips = Array.isArray(trips) ? trips.filter(trip =>
    trip.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.name_ar?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (!sortBy) return 0;
    const valueA = a[sortBy];
    const valueB = b[sortBy];
    if (typeof valueA === 'string') {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }
  });
  // console.log(sortedTrips);

  const renderSortIcon = (field) => {
    if (sortBy === field) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };
  // console.log(filteredTrips);
  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 px-8">
          <div>
            <h1 className="text-2xl font-bold dark:text-white">{t('trips_management')}</h1>
            <p className="text-sm text-gray-500">{t('manage_trips_catalog')}</p>
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
            <button className={`${styles.btn} whitespace-nowrap !rounded-lg`} onClick={openAddModal}>{t('add_trip')}</button>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className='dark:text-white!' onClick={() => handleSort("id")}>{t('id')}{renderSortIcon("id")}</th>
              {/* <th>Name (AR)</th> */}
              <th className='dark:text-white!'>{t('name')}</th>
              <th className='dark:text-white!' onClick={() => handleSort("rate")}>{t('rate')}{renderSortIcon("rate")}</th>
              <th className='dark:text-white!' onClick={() => handleSort("price")}>{t('price')}{renderSortIcon("price")}</th>
              {/* <th>Start</th> */}
              {/* <th>End</th> */}
              <th className='dark:text-white!' onClick={() => handleSort("duration")}>{t('duration')}{renderSortIcon("duration")}</th>
              <th className='dark:text-white!'>{t('continent')}</th>
              <th className='dark:text-white!'>{t('location')}</th>
              <th className='dark:text-white!'>{t('difficulty')}</th>
              <th className='dark:text-white!'>{t('guide')}</th>
              <th className='dark:text-white!'>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedTrips.map(trip => (
              <tr key={trip.id}>
                <td className='dark:text-white!'>{trip.id}</td>
                {/* <td>{trip.name_ar}</td> */}
                <td className='dark:text-white!'>{trip.name_en}</td>
                <td className='dark:text-white!'>{trip.rate}</td>
                <td className='dark:text-white!'>{trip.price}</td>
                {/* <td>{trip.start_date}</td> */}
                {/* <td>{trip.end_date}</td> */}
                <td className='dark:text-white!'>{trip.duration}</td>
                <td className='dark:text-white!'>{trip.continent}</td>
                <td className='dark:text-white!'>{trip.location}</td>
                <td className='dark:text-white!'>{trip.difficulty}</td>
                <td className='dark:text-white!'>{trip.has_guide ? trip.guide_name : t('no')}</td>
                <td className='flex flex-row'>
                  <button className={`${styles.actionButton} bg-blue-600!`} onClick={() => openEditModal(trip)}>{t('edit')}</button>
                  <button className={`${styles.actionButton} bg-red-600!`} onClick={() => handleDeleteTrip(trip.id)}>{t('delete')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TripModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={currentTrip ? handleEditTrip : handleAddTrip}
        initialData={currentTrip}
      />
    </div>
  );
}

export default TripManagement;
