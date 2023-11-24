import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import userReducer from "./users/user.slice";
import filtersReducer from "./filters/filters.slice";

const rootReducer = combineReducers({
  user: userReducer,
  filters: filtersReducer,
});

const persistConfig = {
  key: "my-finances",
  storage,
};

export const makeStore = () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  let store: any = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: [thunk],
  });

  store.__persistor = persistStore(store);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper(makeStore);
