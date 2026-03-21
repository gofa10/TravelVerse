import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

export const fetchTrips = createAsyncThunk('trips/fetchAll', async () => {
  const res = await API.get('/trips');
  return res.data;
});

export const getTripById = createAsyncThunk('trips/fetchOne', async (id) => {
  const res = await API.get(`/trips/${id}`);
  return res.data;
});

export const createTrip = createAsyncThunk('trips/create', async (data) => {
  const res = await API.post('/trips', data);
  return res.data;
});

export const updateTrip = createAsyncThunk('trips/update', async ({ id, data }) => {
  const res = await API.put(`/trips/${id}`, data);
  return res.data;
});

export const deleteTrip = createAsyncThunk('trips/delete', async (id) => {
  await API.delete(`/trips/${id}`);
  return id;
});

const tripSlice = createSlice({
  name: 'trip',
  initialState: {
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
        state.trips.data = action.payload.data;
        state.trips.meta = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total,
        };
      })
      .addCase(fetchTrips.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch trips';
      })
      .addCase(getTripById.fulfilled, (state, action) => {
        state.selectedTrip = action.payload;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.trips.data.push(action.payload);
      })
      .addCase(updateTrip.fulfilled, (state, action) => {
        const index = state.trips.data.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.trips.data[index] = action.payload;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.trips.data = state.trips.data.filter(t => t.id !== action.payload);
      });
  },
});

export const { setCurrentPage } = tripSlice.actions;
export default tripSlice.reducer;

