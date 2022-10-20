// import UserAuthState from '../context/UserAuthState'
import '../styles/globals.css'
// import styles from "../styles/Home.module.css";
import initAuth from '../utils/initAuth'
import Header from '../Components/Header';
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';

initAuth()
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(

          <Component {...pageProps} />

  )
}



export default MyApp
