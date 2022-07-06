// import React, { useCallback, useEffect } from "react";
// import { useAuthContext } from "../context/UserAuthState";
// import { useRouter } from "next/router";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../config/firebase";
// import Router from 'next/dist/server/router';

function SignUp() {

  
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       router.push("/");
  //       console.log(user);
  //     } else {
  //       // googleSignin()
  //       // googleSignin()
  //       // try {
  //       //   googleSignin();
  //       // } catch (error) {
          
  //       // }
  //       // googleSignin()
  //       // googleSignin()
  //       // try {
  //       //   googleSignin();
  //       //   // router.push('/')
  //       // } catch (err) {
  //       //   // console.error(err);
  //       // }
        
  //     }

  //   });
  //   // .then()
  //   // .catch()
  //   // try {
  //   //   googleSignin()
  //   //   router.push('/')
  //   // } catch (err) {
  //   //   console.error(err)
  //   // }

  //   return () => {};
  // }, []);
  
  // return (
  //   <div>
  //     <div>Siginup</div>
  //   <button onClick={()=> googleSignin()}>Google</button>
  //   </div>
  // );
}

export default SignUp;
