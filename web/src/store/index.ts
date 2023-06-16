import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import userReducer from "./users/user.slice";

const rootReducer = combineReducers({
  user: userReducer,
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

export const wrapper = createWrapper(makeStore);
