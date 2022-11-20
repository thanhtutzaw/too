// import UserAuthState from '../context/UserAuthState'
import '../styles/globals.css'
// import styles from "../styles/Home.module.css";
import initAuth from '../utils/initAuth'
import Header from '../Components/Header';
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import Head from 'next/head';

initAuth()

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <>
      <Head>
        <title>Too</title>
        <meta name="Too" content="for you" />
        <link rel="icon" href="favicon.ico" />
        <link href="//fonts.googleapis.com/css?family=Google+Sans:400,500&amp;subset=cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese" rel="stylesheet" nonce=""></link>
      </Head>
      <Component {...pageProps} />
    </>
  )
}