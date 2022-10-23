import React from 'react'
import styles from "../styles/Home.module.css";
import FirebaseAuth from '../Components/FirebaseAuth'
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import Layout from '../Components/Layout';
// const MyLoader = () => <div>Loading...</div>
const Auth = () => {
  return (
    <div className={styles.loginWrapper}>
      <h3>Welcome to Too</h3>
      <FirebaseAuth />
    </div>
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
  whenAuthedBeforeRedirect:AuthAction.RETURN_NULL,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth)
