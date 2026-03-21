import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  const res = await API.get('/cart');
  return res.data;
});

export const addToCart = createAsyncThunk('cart/add', async (data) => {
  const res = await API.post('/cart', data);
  return res.data;
});

export const removeFromCart = createAsyncThunk('cart/remove', async (id) => {
  await API.delete(`/cart/${id}`);
  return id;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch cart';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter(i => i.id !== action.payload);
      });
  },
});

export default cartSlice.reducer;
