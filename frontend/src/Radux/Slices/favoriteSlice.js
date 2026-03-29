import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const fetchFavorites = createAsyncThunk('favorites/fetchAll', async (_, { rejectWithValue }) => {
  try {
  const res = await API.get('/favorites');
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const toggleFavorite = createAsyncThunk('favorites/toggle', async (data, { rejectWithValue }) => {
  try {
  const res = await API.post('/favorites', data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    items: [],
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
        const items = normalizeItems(action.payload);
        state.items = items;
        state.favorites = items;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? 'Something went wrong';
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const exists = state.items.find(f => f.id === action.payload.id);
        if (exists) {
          state.items = state.items.filter(f => f.id !== action.payload.id);
        } else {
          state.items.push(action.payload);
        }
        state.favorites = state.items;
      });
  },
});

export const selectFavoriteItems = (state) =>
  Array.isArray(state.favorite?.items) ? state.favorite.items : [];
export default favoriteSlice.reducer;
