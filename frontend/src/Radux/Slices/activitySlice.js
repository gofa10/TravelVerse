import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

export const fetchActivities = createAsyncThunk('activities/fetchAll', async () => {
  const res = await API.get('/activities');
  return res.data;
});

export const getActivityById = createAsyncThunk('activities/fetchOne', async (id) => {
  const res = await API.get(`/activities/${id}`);
  return res.data;
});

export const createActivity = createAsyncThunk('activities/create', async (data) => {
  const res = await API.post('/activities', data);
  return res.data;
});

export const updateActivity = createAsyncThunk('activities/update', async ({ id, data }) => {
  const res = await API.put(`/activities/${id}`, data);
  return res.data;
});

export const deleteActivity = createAsyncThunk('activities/delete', async (id) => {
  await API.delete(`/activities/${id}`);
  return id;
});

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    activities: {
      data: [],
      meta: {}
    },
    selectedActivity: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities.data = action.payload.data;
        state.activities.meta = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total
        };
      })
      .addCase(fetchActivities.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch activities';
      })
      .addCase(getActivityById.fulfilled, (state, action) => {
        state.selectedActivity = action.payload;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.activities.data.push(action.payload);
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        const index = state.activities.data.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.activities.data[index] = action.payload;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.activities.data = state.activities.data.filter(a => a.id !== action.payload);
      });
  },
});


export default activitySlice.reducer;
