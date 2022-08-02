import { configureStore, createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "isLoading",
  initialState: false,
  reducers: {
    toggle(state: boolean) {
      return !state;
    },
  },
});

const store = configureStore({
  reducer: { loading: loadingSlice.reducer },
});

export const loadingActions = loadingSlice.actions;
export default store;
