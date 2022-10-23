import React, { useEffect } from 'react'
import styles from "../styles/Home.module.css";
import FirebaseAuth from '../Components/FirebaseAuth'
import { withAuthUser, AuthAction, useAuthUser } from 'next-firebase-auth'
import Layout from '../Components/Layout';
import { useRouter } from 'next/router';
// const MyLoader = () => <div>Loading...</div>

const Auth = () => {
  const router = useRouter()
  const user = useAuthUser()
  useEffect(() => {
    if (user.photoURL) {
      router.push('/')
    }
  }, [user]);
  return (
    <>
      {!user ?
        null
        :
        <div className={styles.loginWrapper}>
          <h3>Welcome to Too</h3>
          <FirebaseAuth />
        </div>
      }
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
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth)