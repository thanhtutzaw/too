// import UserAuthState from '../context/UserAuthState'
import Head from 'next/head'
import '../styles/globals.css'
import initAuth from '../utils/initAuth'

initAuth()
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Too</title>
        <meta name="Too" content="for you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Component {...pageProps} />

    </>

  )
}

export default MyApp
