import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../axios';
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const fetchGuideTrips = createAsyncThunk('guide/fetchTrips', async (_, { rejectWithValue }) => {
  try {
  const res = await api.get('/guide/trips');
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const createGuideTrip = createAsyncThunk('guide/createTrip', async (data, { rejectWithValue }) => {
  try {
  const res = await api.post('/guide/trips', data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const updateGuideTrip = createAsyncThunk('guide/updateTrip', async ({ id, data }, { rejectWithValue }) => {
  try {
  const res = await api.put(`/guide/trips/${id}`, data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const deleteGuideTrip = createAsyncThunk('guide/deleteTrip', async (id, { rejectWithValue }) => {
  try {
  await api.delete(`/guide/trips/${id}`);
  return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const fetchGuideReservations = createAsyncThunk('guide/fetchReservations', async (_, { rejectWithValue }) => {
  try {
  const res = await api.get('/guide/reservations');
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const fetchGuideReviews = createAsyncThunk('guide/fetchReviews', async (_, { rejectWithValue }) => {
  try {
  const res = await api.get('/guide/reviews');
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const replyToReview = createAsyncThunk('guide/replyToReview', async ({ id, reply }, { rejectWithValue }) => {
  try {
    const res = await api.post(`/guide/reviews/${id}/reply`, { reply });
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
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
        state.trips = normalizeItems(action.payload);
      })
      .addCase(fetchGuideTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? 'Something went wrong';
      })
      .addCase(fetchGuideReservations.fulfilled, (state, action) => {
        state.reservations = normalizeItems(action.payload);
      })
      .addCase(fetchGuideReviews.fulfilled, (state, action) => {
        state.reviews = normalizeItems(action.payload);
      });
  },
});

export const selectGuideTrips = (state) =>
  Array.isArray(state.guide?.trips) ? state.guide.trips : [];
export const selectGuideReservations = (state) =>
  Array.isArray(state.guide?.reservations) ? state.guide.reservations : [];
export const selectGuideReviews = (state) =>
  Array.isArray(state.guide?.reviews) ? state.guide.reviews : [];
export default guideSlice.reducer;
