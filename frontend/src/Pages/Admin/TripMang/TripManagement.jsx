// TripManagement.jsx
import React, { useState } from 'react';
import TripModal from './TripModal ';
import styles from '../UserMang/UserManagement.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios'; // ✅ استخدم النسخة التي فيها التوكن

const fetchTrips = async () => {
  const res = await api.get('/trips');
  const trips = res.data.data || [];

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
    if (window.confirm("Are you sure you want to delete this trip?")) {
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
  console.log(filteredTrips);
  return (
    <div className={styles.content}>
      <div className={styles.card}>
        {/* <h2>Trips</h2> */}
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${styles.searchInput} dark:bg-gray-800! bg-gray-300! dark:text-white! rounded`}
          />
          <button className={styles.btn} onClick={openAddModal}>Add Trip</button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className='dark:text-white!' onClick={() => handleSort("id")}>ID{renderSortIcon("id")}</th>
              {/* <th>Name (AR)</th> */}
              <th className='dark:text-white!'>Name</th>
              <th className='dark:text-white!' onClick={() => handleSort("rate")}>Rate{renderSortIcon("rate")}</th>
              <th className='dark:text-white!' onClick={() => handleSort("price")}>Price{renderSortIcon("price")}</th>
              {/* <th>Start</th> */}
              {/* <th>End</th> */}
              <th className='dark:text-white!' onClick={() => handleSort("duration")}>Duration{renderSortIcon("duration")}</th>
              <th className='dark:text-white!'>Continent</th>
              <th className='dark:text-white!'>Location</th>
              <th className='dark:text-white!'>Difficulty</th>
              <th className='dark:text-white!'>Guide</th>
              <th className='dark:text-white!'>Actions</th>
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
                <td className='dark:text-white!'>{trip.has_guide ? trip.guide_name : 'No'}</td>
                <td className='flex flex-row'>
                  <button className={`${styles.actionButton} bg-blue-600!`} onClick={() => openEditModal(trip)}>Edit</button>
                  <button className={`${styles.actionButton} bg-red-600!`} onClick={() => handleDeleteTrip(trip.id)}>Delete</button>
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
