// import UserAuthState from '../context/UserAuthState'
import Head from 'next/head'
import UserAuthState from '../context/UserAuthState'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Too</title>
        <meta name="Too" content="for you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserAuthState>
        <Component {...pageProps} />
      </UserAuthState>
    </>

  )
}

export default MyApp
