import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

export const fetchRestaurants = createAsyncThunk('restaurants/fetchAll', async () => {
  const res = await API.get('/restaurants');
  return res.data;
});

export const getRestaurantById = createAsyncThunk('restaurants/fetchOne', async (id) => {
  const res = await API.get(`/restaurants/${id}`);
  return res.data;
});

export const createRestaurant = createAsyncThunk('restaurants/create', async (data) => {
  const res = await API.post('/restaurants', data);
  return res.data;
});

export const updateRestaurant = createAsyncThunk('restaurants/update', async ({ id, data }) => {
  const res = await API.put(`/restaurants/${id}`, data);
  return res.data;
});

export const deleteRestaurant = createAsyncThunk('restaurants/delete', async (id) => {
  await API.delete(`/restaurants/${id}`);
  return id;
});

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    restaurants: {
      data: [],
      meta: {}
    },
    selectedRestaurant: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants.data = action.payload.data;
        state.restaurants.meta = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total
        };
      })
      .addCase(fetchRestaurants.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch restaurants';
      })
      .addCase(getRestaurantById.fulfilled, (state, action) => {
        state.selectedRestaurant = action.payload;
      })
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.restaurants.data.push(action.payload);
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        const index = state.restaurants.data.findIndex(r => r.id === action.payload.id);
        if (index !== -1) state.restaurants.data[index] = action.payload;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.restaurants.data = state.restaurants.data.filter(r => r.id !== action.payload);
      });
  },
});


export default restaurantSlice.reducer;
