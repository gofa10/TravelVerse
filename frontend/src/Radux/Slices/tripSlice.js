import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const fetchTrips = createAsyncThunk('trips/fetchAll', async (_, { rejectWithValue }) => {
  try {
  const res = await API.get('/trips');
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const getTripById = createAsyncThunk('trips/fetchOne', async (id, { rejectWithValue }) => {
  try {
  const res = await API.get(`/trips/${id}`);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const createTrip = createAsyncThunk('trips/create', async (data, { rejectWithValue }) => {
  try {
  const res = await API.post('/trips', data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const updateTrip = createAsyncThunk('trips/update', async ({ id, data }, { rejectWithValue }) => {
  try {
  const res = await API.put(`/trips/${id}`, data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const deleteTrip = createAsyncThunk('trips/delete', async (id, { rejectWithValue }) => {
  try {
  await API.delete(`/trips/${id}`);
  return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

const tripSlice = createSlice({
  name: 'trip',
  initialState: {
    items: [],
    trips: {
      data: [],
      meta: {}
    },
    selectedTrip: null,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        const items = normalizeItems(action.payload);
        state.items = items;
        state.trips.data = items;
        state.trips.meta = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total,
        };
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? 'Something went wrong';
      })
      .addCase(getTripById.fulfilled, (state, action) => {
        state.selectedTrip = action.payload;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.trips.data = state.items;
      })
      .addCase(updateTrip.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.trips.data = state.items;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload);
        state.trips.data = state.items;
      });
  },
});

export const { setCurrentPage } = tripSlice.actions;
export const selectTripList = (state) =>
  Array.isArray(state.trip?.items) ? state.trip.items : [];
export default tripSlice.reducer;
