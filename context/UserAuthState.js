import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import AuthContext from "./AuthContext";

function UserAuthState({ children }) {
  // const [user, setuser] = useState(() => auth.currentUser || undefined);
  const [user, setuser] = useState();
  // const [user, setuser] = useState(localStorage.getItem('user'));
  const loadingUser = user === undefined;
  // function getLocal() {
  //   console.log(localStorage.getItem('user'))
  // }
  function addLocal() {
    localStorage.setItem('user', JSON.stringify(auth.currentUser)
    )
  }
  function removeLocal() {
    localStorage.removeItem('user')
  }


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        addLocal()
        setuser(JSON.parse(localStorage.getItem('user')))
        console.log("added user to local")
      }
      else {
        removeLocal()
        setuser('')
        console.log("removed user form local")
      }
    })
    // if(user === null){

    // }
    // return () => {
    //   cleanup
    // };
  }, []);


  const logout = async () => {
    return signOut(auth).then((res) => {
      // localStorage.removeItem('user')
    })
  }

  const googleSignin = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((res) => {
        // setuser(localStorage.getItem('user'))
        console.log(res)
      })
      .catch((err) => {
        console.log("error")
        if (!disposed) {
          setlogin(null)
        }
      })
    // .then( (res) => {
    //     console.log(res)
    // })
    // .catch( (err) => {
    //     console.error(err)
    // });
  }

  return (
    <div>
      <AuthContext.Provider
        value={{ logout, googleSignin, user, setuser, loadingUser }}
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
