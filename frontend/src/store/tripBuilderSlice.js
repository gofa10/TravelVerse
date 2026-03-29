import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../Radux/axios';
import { clearAuth } from '../Utility/authToken';

const getErrorMessage = (error, fallbackMessage) =>
  error.response?.data?.message || fallbackMessage;

const getErrorPayload = (error, fallbackMessage) => ({
  message: getErrorMessage(error, fallbackMessage),
  status: error.response?.status ?? null,
});

const normalizePlannableType = (type) => {
  if (!type) {
    return '';
  }

  return String(type).split('\\').pop();
};

export const fetchPlans = createAsyncThunk(
  'tripBuilder/fetchPlans',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/trip-plans');
      return res.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        clearAuth();
      }
      return rejectWithValue(getErrorPayload(error, 'Failed to fetch trip plans'));
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const userType = state.auth.user?.user_type;

      if (state.tripBuilder.loading || state.tripBuilder.authBlocked) {
        return false;
      }

      if (userType !== 'user') {
        return false;
      }

      return userType === 'user';
    },
  }
);

export const fetchPlanDetail = createAsyncThunk(
  'tripBuilder/fetchPlanDetail',
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/trip-plans/${id}`);
      return res.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        clearAuth();
      }
      return rejectWithValue(getErrorPayload(error, 'Failed to fetch trip plan details'));
    }
  }
);

export const createPlan = createAsyncThunk(
  'tripBuilder/createPlan',
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post('/trip-plans', data);
      return res.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        clearAuth();
      }
      return rejectWithValue(getErrorPayload(error, 'Failed to create trip plan'));
    }
  }
);

export const updatePlan = createAsyncThunk(
  'tripBuilder/updatePlan',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/trip-plans/${id}`, data);
      return res.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        clearAuth();
      }
      return rejectWithValue(getErrorPayload(error, 'Failed to update trip plan'));
    }
  }
);

export const deletePlan = createAsyncThunk(
  'tripBuilder/deletePlan',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/trip-plans/${id}`);
      return id;
    } catch (error) {
      if (error.response?.status === 401) {
        clearAuth();
      }
      return rejectWithValue(getErrorPayload(error, 'Failed to delete trip plan'));
    }
  }
);

export const addItemToPlan = createAsyncThunk(
  'tripBuilder/addItemToPlan',
  async ({ planId, data }, { rejectWithValue }) => {
    try {
      const res = await API.post(`/trip-plans/${planId}/items`, data);
      return { planId, item: res.data.data };
    } catch (error) {
      if (error.response?.status === 401) {
        clearAuth();
      }
      return rejectWithValue(getErrorPayload(error, 'Failed to add item to trip plan'));
    }
  }
);

export const removeItemFromPlan = createAsyncThunk(
  'tripBuilder/removeItemFromPlan',
  async (itemId, { rejectWithValue }) => {
    try {
      await API.delete(`/trip-plan-items/${itemId}`);
      return itemId;
    } catch (error) {
      if (error.response?.status === 401) {
        clearAuth();
      }
      return rejectWithValue(getErrorPayload(error, 'Failed to remove item from trip plan'));
    }
  }
);

export const updatePlanItem = createAsyncThunk(
  'tripBuilder/updatePlanItem',
  async ({ itemId, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/trip-plan-items/${itemId}`, data);
      return res.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        clearAuth();
      }
      return rejectWithValue(getErrorPayload(error, 'Failed to update trip plan item'));
    }
  }
);

const initialState = {
  plans: [],
  activePlanId: null,
  loading: false,
  itemLoading: false,
  error: null,
  errorStatus: null,
  authBlocked: false,
  hasFetched: false,
};

const replacePlan = (plans, updatedPlan) =>
  plans.some((plan) => plan.id === updatedPlan.id)
    ? plans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan))
    : [updatedPlan, ...plans];

const tripBuilderSlice = createSlice({
  name: 'tripBuilder',
  initialState,
  reducers: {
    setActivePlan: (state, action) => {
      state.activePlanId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorStatus = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
        state.authBlocked = false;
        state.hasFetched = true;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload;
        state.errorStatus = action.payload?.status ?? null;
        state.authBlocked = action.payload?.status === 401 || action.payload?.status === 403;
        state.hasFetched = true;
      })
      .addCase(fetchPlanDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorStatus = null;
      })
      .addCase(fetchPlanDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = replacePlan(state.plans, action.payload);
        state.activePlanId = action.payload.id;
      })
      .addCase(fetchPlanDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload;
        state.errorStatus = action.payload?.status ?? null;
      })
      .addCase(createPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorStatus = null;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plans.unshift(action.payload);
        state.activePlanId = action.payload.id;
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload;
        state.errorStatus = action.payload?.status ?? null;
      })
      .addCase(updatePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorStatus = null;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = state.plans.map((plan) =>
          plan.id === action.payload.id ? { ...plan, ...action.payload } : plan
        );
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload;
        state.errorStatus = action.payload?.status ?? null;
      })
      .addCase(deletePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorStatus = null;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = state.plans.filter((plan) => plan.id !== action.payload);
        if (state.activePlanId === action.payload) {
          state.activePlanId = null;
        }
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload;
        state.errorStatus = action.payload?.status ?? null;
      })
      .addCase(addItemToPlan.pending, (state) => {
        state.itemLoading = true;
        state.error = null;
        state.errorStatus = null;
      })
      .addCase(addItemToPlan.fulfilled, (state, action) => {
        state.itemLoading = false;
        state.plans = state.plans.map((plan) => {
          if (plan.id !== action.payload.planId) {
            return plan;
          }

          return {
            ...plan,
            items: [...(plan.items || []), action.payload.item],
            items_count: typeof plan.items_count === 'number' ? plan.items_count + 1 : plan.items_count,
          };
        });
      })
      .addCase(addItemToPlan.rejected, (state, action) => {
        state.itemLoading = false;
        state.error = action.payload?.message || action.payload;
        state.errorStatus = action.payload?.status ?? null;
      })
      .addCase(removeItemFromPlan.pending, (state) => {
        state.itemLoading = true;
        state.error = null;
        state.errorStatus = null;
      })
      .addCase(removeItemFromPlan.fulfilled, (state, action) => {
        state.itemLoading = false;
        state.plans = state.plans.map((plan) => {
          if (!plan.items) {
            return plan;
          }

          const hadItem = plan.items.some((item) => item.id === action.payload);

          return {
            ...plan,
            items: plan.items.filter((item) => item.id !== action.payload),
            items_count:
              hadItem && typeof plan.items_count === 'number'
                ? Math.max(0, plan.items_count - 1)
                : plan.items_count,
          };
        });
      })
      .addCase(removeItemFromPlan.rejected, (state, action) => {
        state.itemLoading = false;
        state.error = action.payload?.message || action.payload;
        state.errorStatus = action.payload?.status ?? null;
      })
      .addCase(updatePlanItem.pending, (state) => {
        state.itemLoading = true;
        state.error = null;
        state.errorStatus = null;
      })
      .addCase(updatePlanItem.fulfilled, (state, action) => {
        state.itemLoading = false;
        state.plans = state.plans.map((plan) => {
          if (!plan.items) {
            return plan;
          }

          return {
            ...plan,
            items: plan.items.map((item) =>
              item.id === action.payload.id ? { ...item, ...action.payload } : item
            ),
          };
        });
      })
      .addCase(updatePlanItem.rejected, (state, action) => {
        state.itemLoading = false;
        state.error = action.payload?.message || action.payload;
        state.errorStatus = action.payload?.status ?? null;
      });
  },
});

export const { setActivePlan } = tripBuilderSlice.actions;

export const selectAllPlans = (state) => state.tripBuilder.plans;
export const selectActivePlan = (state) =>
  state.tripBuilder.plans.find((plan) => plan.id === state.tripBuilder.activePlanId) || null;
export const selectTripBuilderLoading = (state) => state.tripBuilder.loading;
export const selectItemLoading = (state) => state.tripBuilder.itemLoading;
export const selectTripBuilderBlocked = (state) => state.tripBuilder.authBlocked;
export const selectTripBuilderErrorStatus = (state) => state.tripBuilder.errorStatus;
export const selectTripBuilderHasFetched = (state) => state.tripBuilder.hasFetched;
export const selectIsInAnyPlan = (plannableId, plannableType) => (state) =>
  state.tripBuilder.plans.some((plan) =>
    (plan.items || []).some(
      (item) =>
        Number(item.plannable_id) === Number(plannableId) &&
        normalizePlannableType(item.plannable_type) === normalizePlannableType(plannableType)
    )
  );

export default tripBuilderSlice.reducer;
