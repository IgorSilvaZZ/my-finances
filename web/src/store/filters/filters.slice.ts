import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { IFilterPayload, IFiltersState } from "./types/filters.types";
import { AppState } from "..";

import { currentYear } from "../../utils/headerHome";

const initialState: IFiltersState = {
  description: "",
  categoryId: "",
  mouth: "",
  year: currentYear,
};

const sliceFilter = createSlice({
  name: "filters",
  initialState,
  reducers: {
    searchFilter(state, { payload }: PayloadAction<IFilterPayload>): void {
      state.description = payload.filters.description ?? "";
      state.categoryId = payload.filters.categoryId ?? "";
      state.mouth = payload.filters.mouth ?? "";
      state.year = payload.filters.year ?? "";
    },
    clearStateFilters(state): void {
      state.description = "";
      state.categoryId = "";
      state.mouth = "";
      state.year = currentYear;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.filters,
      };
    },
  },
});

export const filtersAction = sliceFilter.actions;
export const selectFilters = (state: AppState) => state.filters;

export default sliceFilter.reducer;
