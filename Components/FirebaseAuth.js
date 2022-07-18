/* globals window */
// import StyledFirebaseAuth from 'firebaseui'


// import firebase from 'firebase/compat/app';
// import initAuth from '../../utils/initAuth';
// import { AuthCredential, GoogleAuthProvider, PhoneAuthProvider, EmailAuthProvider, GithubAuthProvider, SAMLAuthProvider, OAuthProvider, RecaptchaVerifier, Auth } from 'firebase/compat/auth';
// export { auth, FirebaseUiHandler, selectTenant, getAuth, startSignIn, reset, showProgressBar, hideProgressBar, completeSignOut, handleError, processUser, AuthUI, getInstance, disableAutoSignIn, start, setConfig, signIn, reset, delete, isPendingRedirect, AuthUIError, toJSON, ACCOUNT_CHOOSER_COM, GOOGLE_YOLO, NONE, PROVIDER_ID};
// import firebase from 'firebase/compat/app';
import React, { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
// import 'firebaseui/dist/firebaseui.css';


// import { init } from 'next-firebase-auth';
// import * as firebaseui from 'firebaseui'
// import * as firebaseui from 'firebaseui';
// const response = await fetch('/__/firebase/init.json');
// const app = firebase.initializeApp(await response.json());
// const ui = new firebaseui.auth.AuthUI(app.auth());
// import initAuth from "../../utils/initAuth";
// initAuth()

// import {}  from 'firebase/auth'

// Note that next-firebase-auth inits Firebase for us,
// so we don't need to.
// Auth providers
// https://github.com/firebase/firebaseui-web#configure-oauth-providers

// const config = {
//   apiKey: "AIzaSyAqiYmXkm_fDhvVICxEF_JPcNvn1zKQpPs",
//   authDomain: "too-dc752.firebaseapp.com",
//   projectId: "too-dc752",
//   storageBucket: "too-dc752.appspot.com",
//   messagingSenderId: "190703670735",
//   appId: "1:190703670735:web:ee69e434991f2c5304aeba",
//   measurementId: "G-HLWGM0RSC2"
// };
// firebase.initializeApp(config);

// initAuth()
// if (!firebase.apps.length) {
//     console.log("false")
//     // firebase.app() ;
//  }else {
//   console.log("true")
//      // if already initialized, use that one
//     }
    // firebase.initializeApp(config);

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
  // Do not SSR FirebaseUI, because not supported. 
  //If you run firebase ui SSR , Error!!
  const [renderAuth, setRenderAuth] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
      console.log('CLIENT')
    }
    else{
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
          />
        </>
        )
        :
        null}

    </div>
  )
}

export default FirebaseAuth
