import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const fetchHotels = createAsyncThunk('hotels/fetchAll', async (_, { rejectWithValue }) => {
  try {
  const res = await API.get('/hotels');
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const getHotelById = createAsyncThunk('hotels/fetchOne', async (id, { rejectWithValue }) => {
  try {
  const res = await API.get(`/hotels/${id}`);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const createHotel = createAsyncThunk('hotels/create', async (data, { rejectWithValue }) => {
  try {
  const res = await API.post('/hotels', data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const updateHotel = createAsyncThunk('hotels/update', async ({ id, data }, { rejectWithValue }) => {
  try {
  const res = await API.put(`/hotels/${id}`, data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const deleteHotel = createAsyncThunk('hotels/delete', async (id, { rejectWithValue }) => {
  try {
  await API.delete(`/hotels/${id}`);
  return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    items: [],
    hotels: {
      data: [],
      meta: {}
    },
    selectedHotel: null,
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
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        const items = normalizeItems(action.payload);
        state.items = items;
        state.hotels.data = items;
        state.hotels.meta = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total
        };
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? 'Something went wrong';
      })
      .addCase(getHotelById.fulfilled, (state, action) => {
        state.selectedHotel = action.payload;
      })
      .addCase(createHotel.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.hotels.data = state.items;
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        const index = state.items.findIndex(h => h.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.hotels.data = state.items;
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.items = state.items.filter(h => h.id !== action.payload);
        state.hotels.data = state.items;
      });
  },
});

export const { setSearchQuery } = hotelSlice.actions;
export const selectHotelItems = (state) =>
  Array.isArray(state.hotel?.items) ? state.hotel.items : [];
export const selectHotelSearchQuery = (state) => state.hotel.searchQuery || '';
export const selectFilteredHotels = (state, allItems = []) => {
  const searchQuery = selectHotelSearchQuery(state);
  const safeItems = Array.isArray(allItems) ? allItems : [];

  return safeItems.filter((item) =>
    !searchQuery ||
    item?.name?.toLowerCase().includes(searchQuery) ||
    item?.title?.toLowerCase().includes(searchQuery) ||
    item?.city?.toLowerCase().includes(searchQuery) ||
    item?.location?.toLowerCase().includes(searchQuery) ||
    item?.country?.toLowerCase().includes(searchQuery)
  );
};

export default hotelSlice.reducer;
