import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const fetchCars = createAsyncThunk('cars/fetchAll', async (_, { rejectWithValue }) => {
  try {
  const res = await API.get('/cars');
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const getCarById = createAsyncThunk('cars/fetchOne', async (id, { rejectWithValue }) => {
  try {
  const res = await API.get(`/cars/${id}`);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const createCar = createAsyncThunk('cars/create', async (data, { rejectWithValue }) => {
  try {
  const res = await API.post('/cars', data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const updateCar = createAsyncThunk('cars/update', async ({ id, data }, { rejectWithValue }) => {
  try {
  const res = await API.put(`/cars/${id}`, data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const deleteCar = createAsyncThunk('cars/delete', async (id, { rejectWithValue }) => {
  try {
  await API.delete(`/cars/${id}`);
  return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

const carSlice = createSlice({
  name: 'car',
  initialState: {
    items: [],
    cars: {
      data: [],
      meta: {}
    },
    selectedCar: null,
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
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        const items = normalizeItems(action.payload);
        state.items = items;
        state.cars.data = items;
        state.cars.meta = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total,
        };
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? 'Something went wrong';
      })
      .addCase(getCarById.fulfilled, (state, action) => {
        state.selectedCar = action.payload;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.cars.data = state.items;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        const index = state.items.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.cars.data = state.items;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
        state.cars.data = state.items;
      });
  },
});

export const { setSearchQuery } = carSlice.actions;
export const selectCarItems = (state) =>
  Array.isArray(state.car?.items) ? state.car.items : [];
export const selectCarSearchQuery = (state) => state.car.searchQuery || '';
export const selectFilteredCars = (state, allItems = []) => {
  const searchQuery = selectCarSearchQuery(state);
  const safeItems = Array.isArray(allItems) ? allItems : [];

  return safeItems.filter((item) =>
    !searchQuery ||
    item?.name?.toLowerCase().includes(searchQuery) ||
    item?.brand?.toLowerCase().includes(searchQuery) ||
    item?.model?.toLowerCase().includes(searchQuery) ||
    item?.city?.toLowerCase().includes(searchQuery) ||
    item?.location?.toLowerCase().includes(searchQuery) ||
    item?.country?.toLowerCase().includes(searchQuery)
  );
};

export default carSlice.reducer;
