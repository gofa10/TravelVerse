import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

export const fetchHotels = createAsyncThunk('hotels/fetchAll', async () => {
  const res = await API.get('/hotels');
  return res.data;
});

export const getHotelById = createAsyncThunk('hotels/fetchOne', async (id) => {
  const res = await API.get(`/hotels/${id}`);
  return res.data;
});

export const createHotel = createAsyncThunk('hotels/create', async (data) => {
  const res = await API.post('/hotels', data);
  return res.data;
});

export const updateHotel = createAsyncThunk('hotels/update', async ({ id, data }) => {
  const res = await API.put(`/hotels/${id}`, data);
  return res.data;
});

export const deleteHotel = createAsyncThunk('hotels/delete', async (id) => {
  await API.delete(`/hotels/${id}`);
  return id;
});

const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    hotels: {
      data: [],
      meta: {}
    },
    selectedHotel: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels.data = action.payload.data;
        state.hotels.meta = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total
        };
      })
      .addCase(fetchHotels.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch hotels';
      })
      .addCase(getHotelById.fulfilled, (state, action) => {
        state.selectedHotel = action.payload;
      })
      .addCase(createHotel.fulfilled, (state, action) => {
        state.hotels.data.push(action.payload);
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        const index = state.hotels.data.findIndex(h => h.id === action.payload.id);
        if (index !== -1) state.hotels.data[index] = action.payload;
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.hotels.data = state.hotels.data.filter(h => h.id !== action.payload);
      });
  },
});


export default hotelSlice.reducer;
