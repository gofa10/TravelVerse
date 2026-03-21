import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

export const fetchCars = createAsyncThunk('cars/fetchAll', async () => {
  const res = await API.get('/cars');
  return res.data;
});

export const getCarById = createAsyncThunk('cars/fetchOne', async (id) => {
  const res = await API.get(`/cars/${id}`);
  return res.data;
});

export const createCar = createAsyncThunk('cars/create', async (data) => {
  const res = await API.post('/cars', data);
  return res.data;
});

export const updateCar = createAsyncThunk('cars/update', async ({ id, data }) => {
  const res = await API.put(`/cars/${id}`, data);
  return res.data;
});

export const deleteCar = createAsyncThunk('cars/delete', async (id) => {
  await API.delete(`/cars/${id}`);
  return id;
});

const carSlice = createSlice({
  name: 'car',
  initialState: {
    cars: {
      data: [],
      meta: {}
    },
    selectedCar: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars.data = action.payload.data;
        state.cars.meta = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total,
        };
      })
      .addCase(fetchCars.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch cars';
      })
      .addCase(getCarById.fulfilled, (state, action) => {
        state.selectedCar = action.payload;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.cars.data.push(action.payload);
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        const index = state.cars.data.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.cars.data[index] = action.payload;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars.data = state.cars.data.filter(c => c.id !== action.payload);
      });
  },
});


export default carSlice.reducer;
