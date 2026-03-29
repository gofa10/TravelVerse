import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const fetchReservations = createAsyncThunk('reservations/fetchAll', async (_, { rejectWithValue }) => {
  try {
  const res = await API.get('/reservations');
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const createReservation = createAsyncThunk('reservations/create', async (data, { rejectWithValue }) => {
  try {
  const res = await API.post('/reservations', data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    items: [],
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
        const items = normalizeItems(action.payload);
        state.items = items;
        state.reservations = items;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? 'Something went wrong';
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.reservations = state.items;
      });
  },
});

export const selectReservationItems = (state) =>
  Array.isArray(state.reservation?.items) ? state.reservation.items : [];
export default reservationSlice.reducer;
