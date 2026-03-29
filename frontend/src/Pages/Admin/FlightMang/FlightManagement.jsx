import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import FlightTable from './FlightTable';
import FlightModal from './FlightModal';
import styles from '../UserMang/UserManagement.module.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function FlightManagement() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFlight, setCurrentFlight] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [filterClass, setFilterClass] = useState('');
  const [filterStops, setFilterStops] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['flights', page],
    queryFn: () => api.get(`/flights?page=${page}`).then(res => res.data)
  });

  const addFlight = useMutation({
    mutationFn: flightData => api.post('/flights', flightData).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['flights']);
      toast.success(t('flight_added_success'));
      closeModal();
    },
    onError: () => toast.error(t('flight_add_failed'))
  });

  const updateFlight = useMutation({
    mutationFn: flightData => api.put(`/flights/${flightData.id}`, flightData).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['flights']);
      toast.success(t('flight_updated_success'));
      closeModal();
    },
    onError: () => toast.error(t('flight_update_failed'))
  });

  const deleteFlight = useMutation({
    mutationFn: id => api.delete(`/flights/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['flights']);
      toast.success(t('flight_deleted_success'));
    },
    onError: () => toast.error(t('flight_delete_failed'))
  });

  const flights = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.items)
      ? data.data.items
      : [];

  const filteredFlights = (flights || []).filter(flight => {
    if (!flight || typeof flight !== 'object') return false; // ✅ حماية من undefined/null

    const from = flight.from_location || '';
    const to = flight.to_location || '';
    const classType = flight.style || '';
    const flightDate = flight.departure_time ? String(flight.departure_time).slice(0, 10) : '';
    const price = flight.price ?? '0';

    const matchSearch = from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = filterClass ? classType.toLowerCase() === filterClass.toLowerCase() : true;
    const matchStops = filterStops
      ? (filterStops === 'direct' ? Number(flight.stops_count || 0) === 0 : Number(flight.stops_count || 0) > 0)
      : true;
    const matchDate = filterDate ? flightDate === filterDate : true;
    const matchPrice = filterPrice ? parseFloat(price) <= parseFloat(filterPrice) : true;

    return matchSearch && matchClass && matchStops && matchDate && matchPrice;
  });


  const openAddModal = () => {
    setCurrentFlight(null);
    setIsModalOpen(true);
  };

  const openEditModal = (flight) => {
    setCurrentFlight(flight);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFlight(null);
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
    <div className={`${styles.content} `}>
      <div className={styles.card}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 px-8">
          <div>
            <h1 className="text-2xl font-bold dark:text-white">{t('flights_management')}</h1>
            <p className="text-sm text-gray-500">{t('manage_flights_catalog')}</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder={t('search_by_origin')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-gray-800! border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white!"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button className={`${styles.btn} w-80! hover:bg-blue-700! whitespace-nowrap !rounded-lg`} onClick={openAddModal}>{t('add_flight')}</button>
          </div>
        </div>
        {isLoading ? <p>{t('loading')}</p> : (
          <>
            <FlightTable
              flights={filteredFlights}
              onEdit={openEditModal}
              onDelete={(id) => {
                if (window.confirm(t('confirm_delete_flight'))) deleteFlight.mutate(id);
              }}
            />
            {renderPagination()}
          </>
        )}
      </div>

      <FlightModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={currentFlight ? updateFlight.mutate : addFlight.mutate}
        initialData={currentFlight}
      />
    </div>
  );
}

export default FlightManagement;
