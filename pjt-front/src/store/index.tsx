import { configureStore, createSlice } from "@reduxjs/toolkit";
import { User } from "../Interface";

const loadingSlice = createSlice({
  name: "isLoading",
  initialState: false,
  reducers: {
    toggle(state: boolean) {
      return !state;
    },
  },
});

const authInitialState: null | User = null;

const userObjectSlice = createSlice({
  name: "userObject",
  initialState: authInitialState,
  reducers: {
    login(state: null | User, actions: { type: string; payload: any }) {
      return actions.payload;
    },
    logout(state: null | User) {
      return null;
    },
  },
});

const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    userObject: userObjectSlice.reducer,
  },
});

export const loadingActions = loadingSlice.actions;
export const userObjectActions = userObjectSlice.actions;

export default store;
