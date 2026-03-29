import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const fetchReviews = createAsyncThunk('reviews/fetchAll', async (_, { rejectWithValue }) => {
  try {
  const res = await API.get('/reviews');
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const createReview = createAsyncThunk('reviews/create', async (data, { rejectWithValue }) => {
  try {
  const res = await API.post('/reviews', data);
  return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const deleteReview = createAsyncThunk('reviews/delete', async (id, { rejectWithValue }) => {
  try {
  await API.delete(`/reviews/${id}`);
  return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    items: [],
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
        const items = normalizeItems(action.payload);
        state.items = items;
        state.reviews = items;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? 'Something went wrong';
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.reviews = state.items;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.items = state.items.filter(r => r.id !== action.payload);
        state.reviews = state.items;
      });
  },
});

export const selectReviewItems = (state) =>
  Array.isArray(state.review?.items) ? state.review.items : [];
export default reviewSlice.reducer;
