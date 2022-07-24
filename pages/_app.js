// import UserAuthState from '../context/UserAuthState'
import Head from 'next/head'
import '../styles/globals.css'
import initAuth from '../utils/initAuth'
import styles from "../styles/Home.module.css";

initAuth()
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Too</title>
        <meta name="Too" content="for you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <Component {...pageProps} />
        </div>

      </main>

    </>

  )
}

export default MyApp
