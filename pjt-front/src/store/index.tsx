import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "./../cookie";
import { ArtworkItem, User } from "../Interface";

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
      sessionStorage.setItem("token", "");
      setCookie("refresh_token", "");
      return null;
    },
    nickname(state: any, actions: { type: string; payload: any }) {
      if (state) {
        return { ...state, nickname: actions.payload };
      } else {
        return state;
      }
    },
  },
});

const searchInitialState: ArtworkItem[] = [];
const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: searchInitialState,
  reducers: {
    setResults(state: ArtworkItem[], actions: { type: string; payload: any }) {
      return actions.payload;
    },
  },
});

const chatPartnerInitialState: string = "";
const chatPartnerSlice = createSlice({
  name: "chatPartner",
  initialState: chatPartnerInitialState,
  reducers: {
    setPartner(state: string, actions: { type: string; payload: string }) {
      return actions.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    userObject: userObjectSlice.reducer,
    searchResults: searchResultsSlice.reducer,
    chatPartner: chatPartnerSlice.reducer,
  },
});

export const loadingActions = loadingSlice.actions;
export const userObjectActions = userObjectSlice.actions;
export const searchResultsActions = searchResultsSlice.actions;
export const chatPartnerActions = chatPartnerSlice.actions;

export default store;
