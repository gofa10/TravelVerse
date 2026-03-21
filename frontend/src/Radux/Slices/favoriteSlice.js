import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

export const fetchFavorites = createAsyncThunk('favorites/fetchAll', async () => {
  const res = await API.get('/favorites');
  return res.data;
});

export const toggleFavorite = createAsyncThunk('favorites/toggle', async (data) => {
  const res = await API.post('/favorites', data);
  return res.data;
});

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch favorites';
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const exists = state.favorites.find(f => f.id === action.payload.id);
        if (exists) {
          state.favorites = state.favorites.filter(f => f.id !== action.payload.id);
        } else {
          state.favorites.push(action.payload);
        }
      });
  },
});

export default favoriteSlice.reducer;
