import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

export const fetchReviews = createAsyncThunk('reviews/fetchAll', async () => {
  const res = await API.get('/reviews');
  return res.data;
});

export const createReview = createAsyncThunk('reviews/create', async (data) => {
  const res = await API.post('/reviews', data);
  return res.data;
});

export const deleteReview = createAsyncThunk('reviews/delete', async (id) => {
  await API.delete(`/reviews/${id}`);
  return id;
});

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch reviews';
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(r => r.id !== action.payload);
      });
  },
});

export default reviewSlice.reducer;
