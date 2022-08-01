// import UserAuthState from '../context/UserAuthState'
import Head from 'next/head'
import '../styles/globals.css'
// import styles from "../styles/Home.module.css";
import initAuth from '../utils/initAuth'
import { LayoutGroup } from 'framer-motion';
import { useRouter } from 'next/router';
import Header from '../Components/Header';
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';

initAuth()
function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const {id} = router.query
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
   

          // <LayoutGroup type="crossfade" id={id}>

          <Component {...pageProps} />
        // </LayoutGroup>



  )
}



export default MyApp
