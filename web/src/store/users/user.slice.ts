import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { IUserState, IUserPayload } from "./types/user.types";
import { AppState } from "..";

const initialState: IUserState = {
  id: "",
  name: "",
  email: "",
  password: "",
  balance: 0,
  avatarUrl: "",
  token: "",
  histories: [],
  categories: []
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticate(state, { payload }: PayloadAction<IUserPayload>): void {
      state.id = payload.user.id;
      state.name = payload.user.name;
      state.email = payload.user.email;
      state.password = payload.user.password;
      state.avatarUrl = payload.user.avatarUrl;
      state.balance = payload.user.balance;
      state.token = payload.token;
      state.histories = payload.user.histories;
      state.categories = payload.user.categories
    },
    updateBalance(state, { payload }): void {
      state.balance = payload.balance;
    },
    clearStateUser(state): void {
      state.id = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.avatarUrl = "";
      state.balance = 0;
      state.token = "";
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const usersActions = slice.actions;
export const selectUser = (state: AppState) => state.user;

export default slice.reducer;
