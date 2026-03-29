import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const fetchCruises = createAsyncThunk('cruises/fetchAll', async (_, { rejectWithValue }) => {
  try {
  const res = await API.get('/cruises');
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const getCruiseById = createAsyncThunk('cruises/fetchOne', async (id, { rejectWithValue }) => {
  try {
  const res = await API.get(`/cruises/${id}`);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const createCruise = createAsyncThunk('cruises/create', async (data, { rejectWithValue }) => {
  try {
  const res = await API.post('/cruises', data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const updateCruise = createAsyncThunk('cruises/update', async ({ id, data }, { rejectWithValue }) => {
  try {
  const res = await API.put(`/cruises/${id}`, data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const deleteCruise = createAsyncThunk('cruises/delete', async (id, { rejectWithValue }) => {
  try {
  await API.delete(`/cruises/${id}`);
  return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

const cruiseSlice = createSlice({
  name: 'cruise',
  initialState: {
    items: [],
    cruises: {
      data: [],
      meta: {}
    },
    selectedCruise: null,
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
      .addCase(fetchCruises.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCruises.fulfilled, (state, action) => {
        state.loading = false;
        const items = normalizeItems(action.payload);
        state.items = items;
        state.cruises.data = items;
        state.cruises.meta = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total,
        };
      })
      .addCase(fetchCruises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? 'Something went wrong';
      })
      .addCase(getCruiseById.fulfilled, (state, action) => {
        state.selectedCruise = action.payload;
      })
      .addCase(createCruise.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.cruises.data = state.items;
      })
      .addCase(updateCruise.fulfilled, (state, action) => {
        const index = state.items.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.cruises.data = state.items;
      })
      .addCase(deleteCruise.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
        state.cruises.data = state.items;
      });
  },
});

export const { setSearchQuery } = cruiseSlice.actions;
export const selectCruiseItems = (state) =>
  Array.isArray(state.cruise?.items) ? state.cruise.items : [];
export const selectCruiseSearchQuery = (state) => state.cruise.searchQuery || '';
export const selectFilteredCruises = (state, allItems = []) => {
  const searchQuery = selectCruiseSearchQuery(state);
  const safeItems = Array.isArray(allItems) ? allItems : [];

  return safeItems.filter((item) =>
    !searchQuery ||
    item?.name?.toLowerCase().includes(searchQuery) ||
    item?.title?.toLowerCase().includes(searchQuery) ||
    item?.city?.toLowerCase().includes(searchQuery) ||
    item?.location?.toLowerCase().includes(searchQuery) ||
    item?.country?.toLowerCase().includes(searchQuery) ||
    item?.from?.toLowerCase().includes(searchQuery) ||
    item?.to?.toLowerCase().includes(searchQuery)
  );
};

export default cruiseSlice.reducer;
