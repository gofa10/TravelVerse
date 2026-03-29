import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

// Get all flights with pagination
export const fetchFlights = createAsyncThunk('flights/fetchAll', async (_, { rejectWithValue }) => {
  try {
  const res = await API.get('/flights');
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

// Get single flight
export const getFlightById = createAsyncThunk('flights/fetchOne', async (id, { rejectWithValue }) => {
  try {
  const res = await API.get(`/flights/${id}`);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

// Create flight
export const createFlight = createAsyncThunk('flights/create', async (data, { rejectWithValue }) => {
  try {
  const res = await API.post('/flights', data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

// Update flight
export const updateFlight = createAsyncThunk('flights/update', async ({ id, data }, { rejectWithValue }) => {
  try {
  const res = await API.put(`/flights/${id}`, data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

// Delete flight
export const deleteFlight = createAsyncThunk('flights/delete', async (id, { rejectWithValue }) => {
  try {
  await API.delete(`/flights/${id}`);
  return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

const flightSlice = createSlice({
  name: 'flight',
  initialState: {
    items: [],
    flights: {
      data: [],
      meta: {}
    },
    selectedFlight: null,
    searchQuery: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = (action.payload || '').toLowerCase().trim();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.loading = false;
        const items = normalizeItems(action.payload);
        state.items = items;
        state.flights.data = items;
        state.flights.meta = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total,
        };
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? 'Something went wrong';
      })
      .addCase(getFlightById.fulfilled, (state, action) => {
        state.selectedFlight = action.payload;
      })
      .addCase(createFlight.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.flights.data = state.items;
      })
      .addCase(updateFlight.fulfilled, (state, action) => {
        const index = state.items.findIndex(f => f.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.flights.data = state.items;
      })
      .addCase(deleteFlight.fulfilled, (state, action) => {
        state.items = state.items.filter(f => f.id !== action.payload);
        state.flights.data = state.items;
      });
  },
});

export const { setSearchQuery } = flightSlice.actions;
export const selectFlightItems = (state) =>
  Array.isArray(state.flight?.items) ? state.flight.items : [];
export const selectFlightSearchQuery = (state) => state.flight.searchQuery || '';
export const selectFilteredFlights = (state, allItems = []) => {
  const searchQuery = selectFlightSearchQuery(state);
  const safeItems = Array.isArray(allItems) ? allItems : [];

  return safeItems.filter((item) =>
    !searchQuery ||
    item?.name?.toLowerCase().includes(searchQuery) ||
    item?.airline?.toLowerCase().includes(searchQuery) ||
    item?.city?.toLowerCase().includes(searchQuery) ||
    item?.location?.toLowerCase().includes(searchQuery) ||
    item?.country?.toLowerCase().includes(searchQuery) ||
    item?.from?.toLowerCase().includes(searchQuery) ||
    item?.to?.toLowerCase().includes(searchQuery) ||
    item?.from_code?.toLowerCase().includes(searchQuery) ||
    item?.to_code?.toLowerCase().includes(searchQuery) ||
    item?.from_airport?.toLowerCase().includes(searchQuery) ||
    item?.to_airport?.toLowerCase().includes(searchQuery)
  );
};

export default flightSlice.reducer;
