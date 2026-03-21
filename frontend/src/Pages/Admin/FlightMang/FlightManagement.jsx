import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import FlightTable from './FlightTable';
import FlightModal from './FlightModal';
import styles from '../UserMang/UserManagement.module.css';
import { toast } from 'react-toastify';

function FlightManagement() {
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
      toast.success('Flight added');
      closeModal();
    },
    onError: () => toast.error('Error adding flight')
  });

  const updateFlight = useMutation({
    mutationFn: flightData => api.put(`/flights/${flightData.id}`, flightData).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['flights']);
      toast.success('Flight updated');
      closeModal();
    },
    onError: () => toast.error('Error updating flight')
  });

  const deleteFlight = useMutation({
    mutationFn: id => api.delete(`/flights/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['flights']);
      toast.success('Flight deleted');
    },
    onError: () => toast.error('Error deleting flight')
  });

  const flights = data?.data || [];

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
    const totalPages = data?.last_page || 1;
    if (totalPages <= 1) return null;

    return (
      <div className="d-flex justify-content-center mt-4 gap-2">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? 'btn btn-primary' : 'btn btn-outline-primary'}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    );
  };

  return (
    <div className={`${styles.content} `}>
      <div className={styles.card}>
        {/* <h2>Flights</h2> */}

        {/* <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search by origin or destination"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />

          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className={styles.searchInput}
          >
            <option value="">All Classes</option>
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
            <option value="premium">Premium</option>
          </select>

          <select
            value={filterStops}
            onChange={(e) => setFilterStops(e.target.value)}
            className={styles.searchInput}
          >
            <option value="">All Stops</option>
            <option value="direct">Direct</option>
            <option value="with_stops">With Stops</option>
          </select>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className={styles.searchInput}
          />

          <input
            type="number"
            placeholder="Max Price"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className={styles.searchInput}
          />


        </div> */}
        <button className={`${styles.btn} w-80! hover:bg-blue-700!`} onClick={openAddModal}>Add Flight</button>
        {isLoading ? <p>Loading...</p> : (
          <>
            <FlightTable
              flights={filteredFlights}
              onEdit={openEditModal}
              onDelete={(id) => {
                if (window.confirm("Delete this flight?")) deleteFlight.mutate(id);
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
