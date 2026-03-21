import React, { useState } from 'react';
import CarModal from './CarModal';
import styles from '../UserMang/UserManagement.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import toast from 'react-hot-toast';

function CarManagement() {
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
      toast.success('Car deleted successfully');
    },
    onError: () => toast.error('Failed to delete car'),
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
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
console.log(data);

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <h2>Cars</h2>
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search by brand, model, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button className={styles.btn} onClick={openAddModal}>Add Car</button>
        </div>

        {isLoading ? (
          <p>⏳ Loading cars...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>❌ Error fetching cars</p>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th><th>Brand</th><th>Model</th><th>Type</th><th>Year</th>
                    <th>Rate</th><th>Price</th><th>Location</th><th>Seats</th>
                    <th>Large Bag</th><th>Small Bag</th><th>Specification</th><th>Supplier</th>
                    <th>AR</th><th>EN</th><th>Booking</th><th>Images</th><th>Actions</th>
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
                      <td>{car.description_ar}</td>
                      <td>{car.description_en}</td>
                      <td><a href={car.booking_link} target="_blank" rel="noreferrer">Link</a></td>
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
                                alt={`car-${i}`}
                                style={{ width: '50px', height: '40px', objectFit: 'cover' }}
                                />
                            );
                            })}
                        </div>
                        </td>

                      <td>
                        <button className={styles.actionButton} onClick={() => openEditModal(car)}>Edit</button>
                        <button className={styles.actionButton} onClick={() => handleDelete(car.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.pagination}>
              <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</button>
              <span>Page {data.current_page} of {data.last_page}</span>
              <button onClick={() => setPage(prev => (prev < data.last_page ? prev + 1 : prev))} disabled={page === data.last_page}>Next</button>
            </div>
          </>
        )}
      </div>

      <CarModal isOpen={isModalOpen} onClose={closeModal} initialData={currentCar} />
    </div>
  );
}

export default CarManagement;
