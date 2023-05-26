import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import "@/styles/globals.css";

import "react-toastify/dist/ReactToastify.css";

import { wrapper } from "../store";

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
