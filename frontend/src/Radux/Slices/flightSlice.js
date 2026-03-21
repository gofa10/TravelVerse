import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

// Get all flights with pagination
export const fetchFlights = createAsyncThunk('flights/fetchAll', async () => {
  const res = await API.get('/flights');
  return res.data;
});

// Get single flight
export const getFlightById = createAsyncThunk('flights/fetchOne', async (id) => {
  const res = await API.get(`/flights/${id}`);
  return res.data;
});

// Create flight
export const createFlight = createAsyncThunk('flights/create', async (data) => {
  const res = await API.post('/flights', data);
  return res.data;
});

// Update flight
export const updateFlight = createAsyncThunk('flights/update', async ({ id, data }) => {
  const res = await API.put(`/flights/${id}`, data);
  return res.data;
});

// Delete flight
export const deleteFlight = createAsyncThunk('flights/delete', async (id) => {
  await API.delete(`/flights/${id}`);
  return id;
});

const flightSlice = createSlice({
  name: 'flight',
  initialState: {
    flights: {
      data: [],
      meta: {}
    },
    selectedFlight: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights.data = action.payload.data;
        state.flights.meta = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total,
        };
      })
      .addCase(fetchFlights.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch flights';
      })
      .addCase(getFlightById.fulfilled, (state, action) => {
        state.selectedFlight = action.payload;
      })
      .addCase(createFlight.fulfilled, (state, action) => {
        state.flights.data.push(action.payload);
      })
      .addCase(updateFlight.fulfilled, (state, action) => {
        const index = state.flights.data.findIndex(f => f.id === action.payload.id);
        if (index !== -1) state.flights.data[index] = action.payload;
      })
      .addCase(deleteFlight.fulfilled, (state, action) => {
        state.flights.data = state.flights.data.filter(f => f.id !== action.payload);
      });
  },
});

export default flightSlice.reducer;
