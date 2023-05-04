import useTheme from "../hooks/useTheme";
import "../styles/globals.css";
import initAuth from "../utils/initAuth";
import Head from "next/head";

initAuth();

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  useTheme();
  return getLayout(
    <>
      <Head>
        <title>Too</title>
        <meta
          name="description"
          content="Note Taking App built with Next.js SSR and FireStore"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <meta name="apple-mobile-web-app-status-bar" content="#90cdf4" />
        <link rel="icon" href="logo.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
