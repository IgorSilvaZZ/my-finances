import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { Provider, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { wrapper } from "../store";

import "@/styles/globals.css";

import "react-toastify/dist/ReactToastify.css";

export function App({ Component, pageProps }: AppProps) {

  const store: any = useStore();

  return (
    <PersistGate persistor={store.__persistor} loading={null}>
      <ToastContainer />
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(App);