import React, { useState } from 'react';
import { useHotels, useAddHotel, useUpdateHotel, useDeleteHotel } from './Hotel Query Setup';
import { toast } from 'react-toastify';
import HotelTable from './HotelTable';
import HotelModal from './HotelModal';
import styles from '../UserMang/UserManagement.module.css';
import api from '../../../Radux/axios';
// import axios from 'axios';

function HotelManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  const { data, isLoading } = useHotels(filters, page);
  const addHotelMutation = useAddHotel();
  const updateHotelMutation = useUpdateHotel();
  const deleteHotelMutation = useDeleteHotel();

  const openAddModal = () => {
    setCurrentHotel(null);
    setIsModalOpen(true);
  };

  const openEditModal = (hotel) => {
    setCurrentHotel(hotel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentHotel(null);
  };

  const handleAddHotel = async (formData) => {
  try {
    // أرسل بيانات الفندق أولاً
    const res = await addHotelMutation.mutateAsync(formData);
    const id = res?.id;

    // أرسل روابط الصور إن وجدت
    const urls = formData.getAll('image_urls[]');
    if (urls.length && id) {
      await Promise.all(
        urls.map(url =>
          api.post('/images', {
            imageable_id: id,
            imageable_type: 'App\\Models\\Hotel',
            url,
          })
        )
      );
    }

    toast.success('Hotel added successfully');
    closeModal();
  } catch (error) {
    toast.error('Failed to add hotel');
  }
};


  const handleEditHotel = async (id, formData) => {
  try {
    formData.append('_method', 'PUT'); // إذا كنت تستخدم POST بدلاً من PUT
    await updateHotelMutation.mutateAsync({ id, formData });

    // إرسال روابط الصور
    const urls = formData.getAll('image_urls[]');
    if (urls.length) {
      await Promise.all(
        urls.map(url =>
          api.post('/images', {
            imageable_id: id,
            imageable_type: 'App\\Models\\Hotel',
            url,
          })
        )
      );
    }

    toast.success('Hotel updated successfully');
    closeModal();
  } catch (error) {
    toast.error('Failed to update hotel');
  }
};


  const handleDeleteHotel = async (id) => {
    if (window.confirm("Are you sure to delete this hotel?")) {
      try {
        await deleteHotelMutation.mutateAsync(id);
        toast.success('Hotel deleted successfully');
      } catch (error) {
        toast.error('Failed to delete hotel');
      }
    }
  };

  const filteredHotels = data?.filter((hotel) => {
    const matchesSearch = hotel.name?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch;
  }) || [];
// console.log(filteredHotels);

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        {/* <h2>Hotels</h2> */}
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${styles.searchInput} dark:bg-gray-800! bg-gray-300! dark:text-white! rounded`}
          />

          <button className={`${styles.btn} bg-blue-600! hover:bg-blue-800!`} onClick={openAddModal}>
            Add Hotel
          </button>
        </div>

        <HotelTable
          Hotels={filteredHotels}
          onEdit={openEditModal}
          onDelete={handleDeleteHotel}
          isLoading={isLoading}
        />

        <div className={styles.pagination}>
          <button onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
            Prev
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>
            Next
          </button>
        </div>
      </div>

      <HotelModal
  isOpen={isModalOpen}
  onClose={closeModal}
  onSubmit={(formData) =>
    currentHotel
      ? handleEditHotel(currentHotel.id, formData)
      : handleAddHotel(formData)
  }
  initialData={currentHotel}
/>

    </div>
  );
}

export default HotelManagement;
