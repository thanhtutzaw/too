import React from 'react'
import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'
import FirebaseAuth from '../Components/FirebaseAuth'

const Auth = () => (
  <>
    <h3>Sign in ssr</h3>

    <FirebaseAuth />
  </>

)

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})()

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Auth)
