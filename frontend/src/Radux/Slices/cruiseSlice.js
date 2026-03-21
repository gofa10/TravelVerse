import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

export const fetchCruises = createAsyncThunk('cruises/fetchAll', async () => {
  const res = await API.get('/cruises');
  return res.data;
});

export const getCruiseById = createAsyncThunk('cruises/fetchOne', async (id) => {
  const res = await API.get(`/cruises/${id}`);
  return res.data;
});

export const createCruise = createAsyncThunk('cruises/create', async (data) => {
  const res = await API.post('/cruises', data);
  return res.data;
});

export const updateCruise = createAsyncThunk('cruises/update', async ({ id, data }) => {
  const res = await API.put(`/cruises/${id}`, data);
  return res.data;
});

export const deleteCruise = createAsyncThunk('cruises/delete', async (id) => {
  await API.delete(`/cruises/${id}`);
  return id;
});

const cruiseSlice = createSlice({
  name: 'cruise',
  initialState: {
    cruises: {
      data: [],
      meta: {}
    },
    selectedCruise: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCruises.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCruises.fulfilled, (state, action) => {
        state.loading = false;
        state.cruises.data = action.payload.data;
        state.cruises.meta = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total,
        };
      })
      .addCase(fetchCruises.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch cruises';
      })
      .addCase(getCruiseById.fulfilled, (state, action) => {
        state.selectedCruise = action.payload;
      })
      .addCase(createCruise.fulfilled, (state, action) => {
        state.cruises.data.push(action.payload);
      })
      .addCase(updateCruise.fulfilled, (state, action) => {
        const index = state.cruises.data.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.cruises.data[index] = action.payload;
      })
      .addCase(deleteCruise.fulfilled, (state, action) => {
        state.cruises.data = state.cruises.data.filter(c => c.id !== action.payload);
      });
  },
});


export default cruiseSlice.reducer;
