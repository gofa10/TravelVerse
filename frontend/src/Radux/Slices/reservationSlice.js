import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

export const fetchReservations = createAsyncThunk('reservations/fetchAll', async () => {
  const res = await API.get('/reservations');
  return res.data;
});

export const createReservation = createAsyncThunk('reservations/create', async (data) => {
  const res = await API.post('/reservations', data);
  return res.data;
});

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reservations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch reservations';
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.reservations.push(action.payload);
      });
  },
});

export default reservationSlice.reducer;
