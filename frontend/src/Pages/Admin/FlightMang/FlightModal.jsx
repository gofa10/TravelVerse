import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import styles from '../UserMang/UserManagement.module.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function FlightModal({ isOpen, onClose, initialData }) {
  const { t } = useTranslation();
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
      toast.success(t('flight_added_success'));
      onClose();
    },
    onError: () => toast.error(t('flight_add_failed'))
  });

  const updateFlight = useMutation({
    mutationFn: ({ id, ...data }) => api.put(`/flights/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['flights']);
      toast.success(t('flight_updated_success'));
      onClose();
    },
    onError: () => toast.error(t('flight_update_failed'))
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
        <h2>{initialData ? t('edit_flight') : t('add_flight_modal')}</h2>
        <form onSubmit={handleSubmit}>
          <label>{t('style')}</label>
          <input name="style" value={form.style} onChange={handleChange} />

          <label>{t('from')}</label>
          <input name="from_location" value={form.from_location} onChange={handleChange} required />

          <label>{t('departure_time')}</label>
          <input type="datetime-local" name="departure_time" value={form.departure_time} onChange={handleChange} required />

          <label>{t('to')}</label>
          <input name="to_location" value={form.to_location} onChange={handleChange} required />

          <label>{t('arrival_time')}</label>
          <input type="datetime-local" name="arrival_time" value={form.arrival_time} onChange={handleChange} required />

          <label>{t('return_from')}</label>
          <input name="return_from" value={form.return_from} onChange={handleChange} />

          <label>{t('return_departure_time')}</label>
          <input type="datetime-local" name="return_departure_time" value={form.return_departure_time} onChange={handleChange} />

          <label>{t('return_to')}</label>
          <input name="return_to" value={form.return_to} onChange={handleChange} />

          <label>{t('return_arrival_time')}</label>
          <input type="datetime-local" name="return_arrival_time" value={form.return_arrival_time} onChange={handleChange} />

          <label>{t('stops_count')}</label>
          <input type="number" name="stops_count" value={form.stops_count} onChange={handleChange} />

          <label>{t('stop_locations')}</label>
          <input name="stop_locations" value={form.stop_locations} onChange={handleChange} />

          <label>{t('duration_hours')}</label>
          <input name="duration" value={form.duration} onChange={handleChange} required />

          <label>{t('price')}</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />

          <label>{t('rate')}</label>
          <input type="number" step="0.1" name="rate" value={form.rate} onChange={handleChange} />

          <label>{t('booking_link')}</label>
          <input name="booking_link" value={form.booking_link} onChange={handleChange} />

          <button type="submit" className={styles.modalButton} disabled={addFlight.isLoading || updateFlight.isLoading}>
            {addFlight.isLoading || updateFlight.isLoading ? t('loading') : t('save')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FlightModal;
