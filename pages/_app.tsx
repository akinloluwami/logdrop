import "@/styles/globals.css";
import PlausibleProvider from "next-plausible";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="reqlog.co">
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}
