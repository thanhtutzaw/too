import "firebase/auth";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const firebaseAuthConfig = {
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    // {
    //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   // Whether the display name should be displayed in Sign Up page.
    //   requireDisplayName: false,

    //   // signInMethod: getEma(),
    //   disableSignUp: {
    //     // status: getDisableSignUpStatus()
    //   }
    // }
  ],
  signInSuccessUrl: "/",
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};
const GoogleLogin = () => {
  const [renderAuth, setRenderAuth] = useState(false);
  // const input = document.querySelectorAll('input[type=email]')[0]

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
      console.log("CLIENT");
      // const input = document.querySelectorAll('#firebaseui_container > div > div.firebaseui-card-content > form > ul > li:nth-child(2) > button')[0]
      // if(input){
      //   input.addEventListener('click', ()=>{
      //     console.log(input)
      //   })
      // }
      // const emailInput = document.querySelectorAll('input[type=email]')[0]
      // emailInput.value = 'test'

      // if(emailInput){
      //   console.log(emailInput)
      //   // emailInput.value = "test"
      //   // emailInput.style.backgroundColor = 'red !important'
      // }
    } else {
      console.log("server");
    }
  }, []);
  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={getAuth()}
          className="googleBtn"
        />
      ) : null}
    </div>
  );
};
export default GoogleLogin;
