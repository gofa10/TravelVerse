import React, { useState } from 'react';
import { useHotels, useAddHotel, useUpdateHotel, useDeleteHotel } from './Hotel Query Setup';
import { toast } from 'react-toastify';
import HotelTable from './HotelTable';
import HotelModal from './HotelModal';
import styles from '../UserMang/UserManagement.module.css';
import api from '../../../Radux/axios';
import { useTranslation } from 'react-i18next';
// import axios from 'axios';

function HotelManagement() {
  const { t } = useTranslation();
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

    toast.success(t('hotel_added_success'));
    closeModal();
  } catch (error) {
    toast.error(t('hotel_add_failed'));
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

    toast.success(t('hotel_updated_success'));
    closeModal();
  } catch (error) {
    toast.error(t('hotel_update_failed'));
  }
};


  const handleDeleteHotel = async (id) => {
    if (window.confirm(t('confirm_delete_hotel'))) {
      try {
        await deleteHotelMutation.mutateAsync(id);
        toast.success(t('hotel_deleted_success'));
      } catch (error) {
        toast.error(t('hotel_delete_failed'));
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 px-8">
          <div>
            <h1 className="text-2xl font-bold dark:text-white">{t('hotels_management')}</h1>
            <p className="text-sm text-gray-500">{t('manage_hotels_catalog')}</p>
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
            <button className={`${styles.btn} bg-blue-600! hover:bg-blue-800! whitespace-nowrap !rounded-lg`} onClick={openAddModal}>
              {t('add_hotel')}
            </button>
          </div>
        </div>

        <HotelTable
          Hotels={filteredHotels}
          onEdit={openEditModal}
          onDelete={handleDeleteHotel}
          isLoading={isLoading}
        />

        <div className={styles.pagination}>
          <button onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
            {t('previous')}
          </button>
          <span>{t('page')} {page}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>
            {t('next')}
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
