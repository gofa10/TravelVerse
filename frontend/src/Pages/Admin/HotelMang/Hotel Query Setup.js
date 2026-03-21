import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '../../../Radux/axios';
import { toast } from 'react-toastify';

const API_BASE = '/hotels'; // axiosClient has baseURL already

// Get hotels with filters & pagination
export const useHotels = (filters = {}, page = 1) => {
  return useQuery({
    queryKey: ['hotels', filters, page],
    queryFn: async () => {
      const params = { page, ...filters };
      const res = await axiosClient.get(API_BASE, { params });
      return res.data.data;
    },
  });
};

// Add new hotel with images
// Add new hotel with images + image URLs
export const useAddHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      // ✅ لا تعيد بناء formData من جديد
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const res = await axiosClient.post(API_BASE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['hotels']);
      toast.success('Hotel added successfully');
    },
    onError: (error) => {
      console.error(error.response?.data);
      toast.error(
        error.response?.data?.message || 'Failed to add hotel'
      );
    },
  });
};


// Update hotel
// Update hotel with images + image URLs
export const useUpdateHotel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }) => {
      // ❌ لا تعيد بناء FormData، استعمله كما هو
      console.log('Sending FormData for UpdateHotel:');
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const res = await axiosClient.post(`${API_BASE}/${id}?_method=PUT`, formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['hotels']);
      toast.success('Hotel updated successfully');
    },
    onError: (error) => {
      console.log('Update Error:', error.response?.data);
      toast.error('Failed to update hotel');
    },
  });
};



// Delete hotel
export const useDeleteHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await axiosClient.delete(`${API_BASE}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['hotels']);
      toast.success('Hotel deleted');
    },
    onError: () => toast.error('Failed to delete hotel'),
  });
};
