import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { IUserState } from "./types/user.types";

const initialState: IUserState = {
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    balance: 0,
    avatarUrl: "",
  },
  token: "",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticate(state, { payload }: PayloadAction<IUserState>): void {
      state!.user!.id = payload!.user!.id;
      state!.user!.name = payload!.user!.name;
      state!.user!.email = payload!.user!.email;
      state!.user!.password = state!.user!.password;
      state!.user!.avatarUrl = state!.user!.avatarUrl;
      state!.user!.balance = state!.user!.balance;
      state.token = payload.token;
    },
    clearStateUser(state): void {
      state.user = null;
      state.token = null;
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

export default slice.reducer;
