import React, { useState } from 'react';
import CarModal from './CarModal';
import styles from '../UserMang/UserManagement.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function CarManagement() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const fetchCars = async ({ queryKey }) => {
    const [_key, { page, searchTerm }] = queryKey;
    const response = await api.get(`/cars?page=${page}&search=${searchTerm}`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['cars', { page, searchTerm }],
    queryFn: fetchCars,
    keepPreviousData: true,
  });

  const deleteCar = useMutation({
    mutationFn: async (id) => await api.delete(`/cars/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['cars']);
      toast.success(t('car_deleted_success'));
    },
    onError: () => toast.error(t('car_delete_failed')),
  });

  const handleDelete = (id) => {
    if (window.confirm(t('confirm_delete_car'))) {
      deleteCar.mutate(id);
    }
  };

  const openAddModal = () => {
    setCurrentCar(null);
    setIsModalOpen(true);
  };

  const openEditModal = (car) => {
    setCurrentCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentCar(null);
    setIsModalOpen(false);
  };
// console.log(data);

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 px-8">
          <div>
            <h1 className="text-2xl font-bold dark:text-white">{t('cars_management')}</h1>
            <p className="text-sm text-gray-500">{t('manage_cars_catalog')}</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder={t('search_car_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-gray-800! border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white!"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button className={`${styles.btn} whitespace-nowrap !rounded-lg`} onClick={openAddModal}>{t('add_car')}</button>
          </div>
        </div>

        {isLoading ? (
          <p>⏳ {t('loading_cars')}</p>
        ) : error ? (
          <p style={{ color: 'red' }}>❌ {t('error_fetching_cars')}</p>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{t('id')}</th><th>{t('brand')}</th><th>{t('model')}</th><th>{t('type')}</th><th>{t('year')}</th>
                    <th>{t('rate')}</th><th>{t('price')}</th><th>{t('location')}</th><th>{t('seats')}</th>
                    <th>{t('large_bag')}</th><th>{t('small_bag')}</th><th>{t('specification')}</th><th>{t('supplier')}</th>
                    <th>{t('ar')}</th><th>{t('en')}</th><th>{t('booking')}</th><th>{t('images')}</th><th>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map(car => (
                    <tr key={car.id}>
                      <td>{car.id}</td>
                      <td>{car.brand}</td>
                      <td>{car.model}</td>
                      <td>{car.type}</td>
                      <td>{car.year}</td>
                      <td>{car.rate}</td>
                      <td>{car.price}</td>
                      <td>{car.location}</td>
                      <td>{car.seats}</td>
                      <td>{car.large_bag}</td>
                      <td>{car.small_bag}</td>
                      <td>{car.car_specification}</td>
                      <td>{car.supplier}</td>
                      <td>{t('description_ar')}</td>
                      <td>{t('description_en')}</td>
                      <td><a href={car.booking_link} target="_blank" rel="noreferrer">{t('link')}</a></td>
                      <td>
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                            {car.images?.slice(0, 5).map((img, i) => {
                            const imageSrc = img.image_path
                                ? `${import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8000'}${img.image_path}`
                                : img;
                            return (
                                <img
                                key={i}
                                src={imageSrc}
                                alt={`Car image ${i + 1}`}
                                style={{ width: '50px', height: '40px', objectFit: 'cover' }}
                                loading="lazy"
                                />
                            );
                            })}
                        </div>
                        </td>

                      <td>
                        <button className={styles.actionButton} onClick={() => openEditModal(car)}>{t('edit')}</button>
                        <button className={styles.actionButton} onClick={() => handleDelete(car.id)}>{t('delete')}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.pagination}>
              <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>{t('previous')}</button>
              <span>{t('page')} {data.current_page} {t('of')} {data.last_page}</span>
              <button onClick={() => setPage(prev => (prev < data.last_page ? prev + 1 : prev))} disabled={page === data.last_page}>{t('next')}</button>
            </div>
          </>
        )}
      </div>

      <CarModal isOpen={isModalOpen} onClose={closeModal} initialData={currentCar} />
    </div>
  );
}

export default CarManagement;
