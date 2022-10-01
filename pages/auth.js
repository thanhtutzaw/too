import React from 'react'
import FirebaseAuth from '../Components/FirebaseAuth'
import {withAuthUser , AuthAction} from 'next-firebase-auth'
import styles from "../styles/Home.module.css";
import Layout from '../Components/Layout';

const  Auth = () =>{
  return (

    <>
    <h3>Welcome to Too</h3>
    <FirebaseAuth />
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
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth)
