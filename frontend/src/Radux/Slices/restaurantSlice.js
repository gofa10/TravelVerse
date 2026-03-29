import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const fetchRestaurants = createAsyncThunk('restaurants/fetchAll', async (_, { rejectWithValue }) => {
  try {
  const res = await API.get('/restaurants');
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const getRestaurantById = createAsyncThunk('restaurants/fetchOne', async (id, { rejectWithValue }) => {
  try {
  const res = await API.get(`/restaurants/${id}`);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const createRestaurant = createAsyncThunk('restaurants/create', async (data, { rejectWithValue }) => {
  try {
  const res = await API.post('/restaurants', data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const updateRestaurant = createAsyncThunk('restaurants/update', async ({ id, data }, { rejectWithValue }) => {
  try {
  const res = await API.put(`/restaurants/${id}`, data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const deleteRestaurant = createAsyncThunk('restaurants/delete', async (id, { rejectWithValue }) => {
  try {
  await API.delete(`/restaurants/${id}`);
  return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    items: [],
    restaurants: {
      data: [],
      meta: {}
    },
    selectedRestaurant: null,
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
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        const items = normalizeItems(action.payload);
        state.items = items;
        state.restaurants.data = items;
        state.restaurants.meta = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total
        };
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? 'Something went wrong';
      })
      .addCase(getRestaurantById.fulfilled, (state, action) => {
        state.selectedRestaurant = action.payload;
      })
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.restaurants.data = state.items;
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        const index = state.items.findIndex(r => r.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.restaurants.data = state.items;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.items = state.items.filter(r => r.id !== action.payload);
        state.restaurants.data = state.items;
      });
  },
});

export const { setSearchQuery } = restaurantSlice.actions;
export const selectRestaurantItems = (state) =>
  Array.isArray(state.restaurant?.items) ? state.restaurant.items : [];
export const selectRestaurantSearchQuery = (state) => state.restaurant.searchQuery || '';
export const selectFilteredRestaurants = (state, allItems = []) => {
  const searchQuery = selectRestaurantSearchQuery(state);
  const safeItems = Array.isArray(allItems) ? allItems : [];

  return safeItems.filter((item) =>
    !searchQuery ||
    item?.name?.toLowerCase().includes(searchQuery) ||
    item?.title?.toLowerCase().includes(searchQuery) ||
    item?.city?.toLowerCase().includes(searchQuery) ||
    item?.location?.toLowerCase().includes(searchQuery) ||
    item?.country?.toLowerCase().includes(searchQuery) ||
    item?.cuisine?.toLowerCase().includes(searchQuery)
  );
};

export default restaurantSlice.reducer;
