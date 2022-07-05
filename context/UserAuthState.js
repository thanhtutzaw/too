import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../config/firebase";
import AuthContext from "./AuthContext";

function UserAuthState({ children }) {

  const logout = () => {
    return signOut(auth);
  }

  // const googleSignin = () => {
  //   const provider = new GoogleAuthProvider();
  //   return signInWithPopup(auth, provider)
  //   .then( (res) => {
  //     console.log(res)
  //   })
  //   .catch( (err) => {
  //     console.log("error")
  //     if(!disposed){
  //       setlogin(null)
  //     }
  //   })
  //   // .then( (res) => {
  //   //     console.log(res)
  //   // })
  //   // .catch( (err) => {
  //   //     console.error(err)
  //   // });
  // }

  return (
    <div>
      <AuthContext.Provider
        value={{  logout }}
      >
        {children}
      </AuthContext.Provider>
      {/* <AuthContext.Provider 
      value={{ logout, googleSignin }}>
        {children}
      </AuthContext.Provider> */}
    </div>
  );
}

export default UserAuthState;

export function useAuthContext() {
  return useContext(AuthContext);

}
