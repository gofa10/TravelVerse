import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from './axios';
import { clearAuth, hasValidToken } from '../Utility/authToken';

// تسجيل الدخول
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const res = await API.post('/login', credentials);
    const token = res.data?.token ?? res.data?.access_token;
    if (typeof token === 'string' && token.trim()) {
      localStorage.setItem('token', token);
    }
    return res.data?.user ?? res.data?.data?.user ?? null;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

// تسجيل حساب جديد
export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const res = await API.post('/register', {
      ...data,
      password_confirmation: data.password, // ← مهم جدًا لـ Laravel validation
    });
    const token = res.data?.token ?? res.data?.access_token;
    if (typeof token === 'string' && token.trim()) {
      localStorage.setItem('token', token);
    }
    return res.data?.user ?? res.data?.data?.user ?? null;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Register failed');
  }
});

// استرجاع بيانات المستخدم
export const getProfile = createAsyncThunk('auth/profile', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/profile');
    return res.data?.user ?? res.data?.data ?? null;
  } catch (err) {
    const status = err.response?.status;
    if (status === 401 || status === 403) {
      clearAuth();
    }
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    // If token exists, wait for profile hydration before route guards redirect.
    loading: hasValidToken(),
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      clearAuth();
    },
    updateUserAvatar: (state, action) => {
      if (state.user) {
        state.user.image = action.payload ? { url: action.payload } : null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { logout, updateUserAvatar } = authSlice.actions;
export default authSlice.reducer;
