import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IFilterPayload, IFiltersState } from "./types/filters.types";
import { AppState } from "..";

const initialState: IFiltersState = {
    description: '',
    categoryId: '',
    mouth: '',
    year: ''
};

const sliceFilter = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        searchFilter(state, { payload }: PayloadAction<IFilterPayload>): void {
            state.description = payload.filters.description ?? '';
            state.categoryId = payload.filters.categoryId ?? '';
            state.mouth = payload.filters.mouth ?? '';
            state.year = payload.filters.year ?? '';
        },
        clearFilters(state): void {
            state = initialState;
        }
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