import "../styles/globals.css";
import initAuth from "../utils/initAuth";
import Head from "next/head";

initAuth();

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <>
      <Head>
        <title>Too</title>
        <meta
          name="description"
          content="Note Taking App built with Next.js SSR and FireStore"
        />
        <link rel="icon" href="logo.svg" />
        {/* <link rel="icon" href="favicon.ico" /> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
