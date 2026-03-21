import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "USD", // القيمة الافتراضية ممكن تكون USD أو أي حاجة تحب
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

// Export the action to dispatch
export const { setCurrency } = currencySlice.actions;

// Export the reducer to add to the store
export default currencySlice.reducer;
