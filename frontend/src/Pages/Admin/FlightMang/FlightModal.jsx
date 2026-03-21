import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import styles from '../UserMang/UserManagement.module.css';
import { toast } from 'react-toastify';

function FlightModal({ isOpen, onClose, initialData }) {
  const [form, setForm] = useState({
    style: '',
    from_location: '',
    departure_time: '',
    to_location: '',
    arrival_time: '',
    return_from: '',
    return_departure_time: '',
    return_to: '',
    return_arrival_time: '',
    stops_count: 0,
    stop_locations: '',
    duration: '',
    price: '',
    rate: '',
    booking_link: '',
  });

  const queryClient = useQueryClient();

  const addFlight = useMutation({
    mutationFn: data => api.post('/flights', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['flights']);
      toast.success('Flight added');
      onClose();
    },
    onError: () => toast.error('Error adding flight')
  });

  const updateFlight = useMutation({
    mutationFn: ({ id, ...data }) => api.put(`/flights/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['flights']);
      toast.success('Flight updated');
      onClose();
    },
    onError: () => toast.error('Error updating flight')
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        stop_locations: Array.isArray(initialData.stop_locations)
          ? initialData.stop_locations.join(', ')
          : initialData.stop_locations || '',
      });
    } else {
      setForm({
        style: '',
        from_location: '',
        departure_time: '',
        to_location: '',
        arrival_time: '',
        return_from: '',
        return_departure_time: '',
        return_to: '',
        return_arrival_time: '',
        stops_count: 0,
        stop_locations: '',
        duration: '',
        price: '',
        rate: '',
        booking_link: '',
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      stop_locations: form.stop_locations
        ? form.stop_locations.split(',').map(loc => loc.trim())
        : [],
    };

    if (initialData?.id) {
      updateFlight.mutate({ id: initialData.id, ...payload });
    } else {
      addFlight.mutate(payload);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>×</span>
        <h2>{initialData ? 'Edit Flight' : 'Add Flight'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Style</label>
          <input name="style" value={form.style} onChange={handleChange} />

          <label>From</label>
          <input name="from_location" value={form.from_location} onChange={handleChange} required />

          <label>Departure Time</label>
          <input type="datetime-local" name="departure_time" value={form.departure_time} onChange={handleChange} required />

          <label>To</label>
          <input name="to_location" value={form.to_location} onChange={handleChange} required />

          <label>Arrival Time</label>
          <input type="datetime-local" name="arrival_time" value={form.arrival_time} onChange={handleChange} required />

          <label>Return From</label>
          <input name="return_from" value={form.return_from} onChange={handleChange} />

          <label>Return Departure Time</label>
          <input type="datetime-local" name="return_departure_time" value={form.return_departure_time} onChange={handleChange} />

          <label>Return To</label>
          <input name="return_to" value={form.return_to} onChange={handleChange} />

          <label>Return Arrival Time</label>
          <input type="datetime-local" name="return_arrival_time" value={form.return_arrival_time} onChange={handleChange} />

          <label>Stops Count</label>
          <input type="number" name="stops_count" value={form.stops_count} onChange={handleChange} />

          <label>Stop Locations (comma-separated)</label>
          <input name="stop_locations" value={form.stop_locations} onChange={handleChange} />

          <label>Duration (in hours)</label>
          <input name="duration" value={form.duration} onChange={handleChange} required />

          <label>Price</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />

          <label>Rate (0 to 5)</label>
          <input type="number" step="0.1" name="rate" value={form.rate} onChange={handleChange} />

          <label>Booking Link</label>
          <input name="booking_link" value={form.booking_link} onChange={handleChange} />

          <button type="submit" className={styles.modalButton} disabled={addFlight.isLoading || updateFlight.isLoading}>
            {addFlight.isLoading || updateFlight.isLoading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FlightModal;
