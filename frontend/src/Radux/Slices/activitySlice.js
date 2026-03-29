import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const fetchActivities = createAsyncThunk('activities/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/activities');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const getActivityById = createAsyncThunk('activities/fetchOne', async (id, { rejectWithValue }) => {
  try {
    const res = await API.get(`/activities/${id}`);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const createActivity = createAsyncThunk('activities/create', async (data, { rejectWithValue }) => {
  try {
    const res = await API.post('/activities', data);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const updateActivity = createAsyncThunk('activities/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await API.put(`/activities/${id}`, data);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

export const deleteActivity = createAsyncThunk('activities/delete', async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/activities/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');
  }
});

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    items: [],
    activities: {
      data: [],
      meta: {}
    },
    selectedActivity: null,
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
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        const items = normalizeItems(action.payload);
        state.items = items;
        state.activities.data = items;
        state.activities.meta = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total
        };
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? 'Something went wrong';
      })
      .addCase(getActivityById.fulfilled, (state, action) => {
        state.selectedActivity = action.payload;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.activities.data = state.items;
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        const index = state.items.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.activities.data = state.items;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.items = state.items.filter(a => a.id !== action.payload);
        state.activities.data = state.items;
      });
  },
});

export const { setSearchQuery } = activitySlice.actions;
export const selectActivityItems = (state) =>
  Array.isArray(state.activity?.items) ? state.activity.items : [];
export const selectActivitySearchQuery = (state) => state.activity.searchQuery || '';
export const selectFilteredActivities = (state, allItems = []) => {
  const searchQuery = selectActivitySearchQuery(state);
  const safeItems = Array.isArray(allItems) ? allItems : [];

  return safeItems.filter((item) =>
    !searchQuery ||
    item?.name?.toLowerCase().includes(searchQuery) ||
    item?.title?.toLowerCase().includes(searchQuery) ||
    item?.city?.toLowerCase().includes(searchQuery) ||
    item?.location?.toLowerCase().includes(searchQuery) ||
    item?.country?.toLowerCase().includes(searchQuery) ||
    item?.type?.toLowerCase().includes(searchQuery)
  );
};

export default activitySlice.reducer;
