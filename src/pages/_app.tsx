import type { AppProps } from "next/app";
import "../styles/globals.css";

const app = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default app;
