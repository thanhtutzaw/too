import React, { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';



const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: () =>
      false,
  },
}
const FirebaseAuth = () => {
  const [renderAuth, setRenderAuth] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
      console.log('CLIENT')
    }
    else {
      console.log('server')
    }
  }, [])
  return (
    <div>
      {renderAuth ?
        (<>
          <StyledFirebaseAuth
            uiConfig={firebaseAuthConfig}
            firebaseAuth={getAuth()}
            // className={"styles.google"}
          />
        </>
        )
        :
        null}
    </div>
  )
}
export default FirebaseAuth
