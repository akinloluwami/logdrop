import "@/styles/globals.css";
import PlausibleProvider from "next-plausible";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="reqlog.co">
      <Toaster />
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}
