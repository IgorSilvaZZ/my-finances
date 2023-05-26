import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { IUserState } from "./types/user.types";
import { AppState } from "..";

const initialState: IUserState = {
  id: "",
  name: "",
  email: "",
  password: "",
  balance: 0,
  avatarUrl: "",
  token: "",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticate(state, { payload }: PayloadAction<IUserState>): void {
      state.id = payload.id;
      state.name = payload.name;
      state.email = payload.email;
      state.password = payload.password;
      state.avatarUrl = payload.avatarUrl;
      state.balance = payload.balance;
      state.token = payload.token;
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
