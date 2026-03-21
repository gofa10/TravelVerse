import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../axios';

export const fetchGuideTrips = createAsyncThunk('guide/fetchTrips', async () => {
  const res = await api.get('/guide/trips');
  return res.data;
});

export const createGuideTrip = createAsyncThunk('guide/createTrip', async (data) => {
  const res = await api.post('/guide/trips', data);
  return res.data;
});

export const updateGuideTrip = createAsyncThunk('guide/updateTrip', async ({ id, data }) => {
  const res = await api.put(`/guide/trips/${id}`, data);
  return res.data;
});

export const deleteGuideTrip = createAsyncThunk('guide/deleteTrip', async (id) => {
  await api.delete(`/guide/trips/${id}`);
  return id;
});

export const fetchGuideReservations = createAsyncThunk('guide/fetchReservations', async () => {
  const res = await api.get('/guide/reservations');
  return res.data;
});

export const fetchGuideReviews = createAsyncThunk('guide/fetchReviews', async () => {
  const res = await api.get('/guide/reviews');
  return res.data;
});

export const replyToReview = createAsyncThunk('guide/replyToReview', async ({ id, reply }) => {
  const res = await api.post(`/guide/reviews/${id}/reply`, { reply });
  return res.data;
});

const guideSlice = createSlice({
  name: 'guide',
  initialState: {
    trips: [],
    reservations: [],
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuideTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuideTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload.data || action.payload;
      })
      .addCase(fetchGuideTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGuideReservations.fulfilled, (state, action) => {
        state.reservations = action.payload.data || action.payload;
      })
      .addCase(fetchGuideReviews.fulfilled, (state, action) => {
        state.reviews = action.payload.data || action.payload;
      });
  },
});

export default guideSlice.reducer;
