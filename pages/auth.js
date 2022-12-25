import React, { useEffect } from 'react'
import styles from "../styles/Home.module.css";
import FirebaseAuth from '../Components/FirebaseAuth'
import { withAuthUser, AuthAction, useAuthUser } from 'next-firebase-auth'
import Layout from '../Components/Layout';
import { useRouter } from 'next/router';
import EmailAuth from '../Components/EmailAuth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const MyLoader = () => <div>Loading...</div>


const Auth = () => {
  const router = useRouter()
  const email = "testuser@gmail.com";
  const password = "111111";
  const auth = getAuth()
  function signin(email, password) {
    signInWithEmailAndPassword(auth, email, password).then(
      () => {
        // router.push('/')
      }
    ).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    router.prefetch('/')
  }, []);
  return (
    <>
      <div className={styles.loginWrapper}>
        <h3>Welcome to Too</h3>
        <FirebaseAuth />
        or
        <button
          className={styles.loginBtn}
          onClick={() => {
            signin(email, password);
          }}
        >
          Sign in as testUser
        </button>
        {/* <EmailAuth /> */}

      </div>
    </>
  )
}
Auth.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenAuthedBeforeRedirect: AuthAction.RETURN_NULL,
  // appPageURL:'/',
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: MyLoader,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth)