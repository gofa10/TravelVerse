import React, { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../../Radux/axios';

const initialForm = {
  name_en: '',
  name_ar: '',
  description_en: '',
  description_ar: '',
  location: '',
  price: '',
  rate: '',
  duration: '',
  continent: '',
  difficulty: 'easy',
  booking_link: '',
};

export default function GuideMyTrips() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImageIds, setExistingImageIds] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['guide-trips'],
    queryFn: async () => (await api.get('/guide/trips')).data,
  });

  const trips = useMemo(() => data?.data || [], [data]);

  const createMutation = useMutation({
    mutationFn: async (payload) => (await api.post('/guide/trips', payload)).data,
    onSuccess: () => {
      toast.success('Trip created successfully');
      queryClient.invalidateQueries({ queryKey: ['guide-trips'] });
      closeModal();
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to create trip'),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      payload.append('_method', 'PUT');
      return (await api.post(`/guide/trips/${id}`, payload)).data;
    },
    onSuccess: () => {
      toast.success('Trip updated successfully');
      queryClient.invalidateQueries({ queryKey: ['guide-trips'] });
      closeModal();
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to update trip'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => (await api.delete(`/guide/trips/${id}`)).data,
    onSuccess: () => {
      toast.success('Trip deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['guide-trips'] });
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to delete trip'),
  });

  const closeModal = () => {
    setOpen(false);
    setEditingId(null);
    setForm(initialForm);
    setImageFiles([]);
    setExistingImageIds([]);
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setOpen(true);
  };

  const openEdit = (trip) => {
    setEditingId(trip.id);
    setExistingImageIds((trip.images || []).map((img) => img.id).filter(Boolean));
    setForm({
      name_en: trip.name_en || trip.name || '',
      name_ar: trip.name_ar || trip.name || '',
      description_en: trip.description_en || '',
      description_ar: trip.description_ar || '',
      location: trip.location || '',
      price: trip.price ?? '',
      rate: trip.rate ?? '',
      duration: trip.duration || '',
      continent: trip.continent || '',
      difficulty: trip.difficulty || 'easy',
      booking_link: trip.booking_link || '',
    });
    setImageFiles([]);
    setOpen(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('name_en', form.name_en);
    payload.append('name_ar', form.name_ar);
    payload.append('description_en', form.description_en || '');
    payload.append('description_ar', form.description_ar || '');
    payload.append('location', form.location);
    payload.append('price', String(Number(form.price)));
    payload.append('rate', String(Number(form.rate)));
    payload.append('duration', form.duration || '');
    payload.append('continent', form.continent || '');
    payload.append('difficulty', form.difficulty || 'easy');
    payload.append('booking_link', form.booking_link || '');

    imageFiles.forEach((file) => payload.append('images[]', file));
    existingImageIds.forEach((id) => payload.append('old_images[]', String(id)));

    if (editingId) {
      updateMutation.mutate({ id: editingId, payload });
      return;
    }
    createMutation.mutate(payload);
  };

  return (
    <div style={{ marginTop: '16px' }} className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Trips</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
        >
          + Add Trip
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="px-6 py-8 text-gray-600 dark:text-gray-300">Loading trips...</div>
        ) : isError ? (
          <div className="px-6 py-8 text-red-600 dark:text-red-400">Failed to load trips.</div>
        ) : trips.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <p className="text-lg font-medium">No trips yet</p>
            <p className="text-sm mt-1">Click "Add Trip" to create your first trip</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Reviews</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-200">
                {trips.map((trip) => (
                  <tr key={trip.id}>
                    <td className="px-6 py-4">{trip.name_en || trip.name}</td>
                    <td className="px-6 py-4">{trip.location || '-'}</td>
                    <td className="px-6 py-4">{trip.price}</td>
                    <td className="px-6 py-4">{trip.reviews_count ?? 0}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(trip)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate(trip.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4">
          <form
            onSubmit={onSubmit}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-2xl grid grid-cols-2 gap-3 shadow-lg"
          >
            <h3 className="col-span-2 text-xl font-semibold text-gray-800 dark:text-white">
              {editingId ? 'Edit Trip' : 'Create Trip'}
            </h3>
            <input className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="English Name" value={form.name_en} onChange={(e) => setForm((p) => ({ ...p, name_en: e.target.value }))} required />
            <input className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="Arabic Name" value={form.name_ar} onChange={(e) => setForm((p) => ({ ...p, name_ar: e.target.value }))} required />
            <input className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="Location" value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} required />
            <input className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} required />
            <input className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" type="number" step="0.1" placeholder="Rate" value={form.rate} onChange={(e) => setForm((p) => ({ ...p, rate: e.target.value }))} required />
            <input className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="Duration" value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} />
            <input className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="Continent" value={form.continent} onChange={(e) => setForm((p) => ({ ...p, continent: e.target.value }))} />
            <select className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={form.difficulty} onChange={(e) => setForm((p) => ({ ...p, difficulty: e.target.value }))}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <div className="col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Upload Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              {imageFiles.length > 0 && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{imageFiles.length} file(s) selected</p>
              )}
            </div>
            <input className="p-2 border rounded-lg col-span-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="Booking Link" value={form.booking_link} onChange={(e) => setForm((p) => ({ ...p, booking_link: e.target.value }))} />
            <textarea className="p-2 border rounded-lg col-span-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" rows={3} placeholder="English Description" value={form.description_en} onChange={(e) => setForm((p) => ({ ...p, description_en: e.target.value }))} />
            <textarea className="p-2 border rounded-lg col-span-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" rows={3} placeholder="Arabic Description" value={form.description_ar} onChange={(e) => setForm((p) => ({ ...p, description_ar: e.target.value }))} />
            <div className="col-span-2 flex justify-end gap-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                {editingId ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
