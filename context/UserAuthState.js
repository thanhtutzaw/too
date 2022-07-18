// import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
// import React, { useContext, useEffect, useState } from "react";
// import { auth } from "../config/firebase";
// import AuthContext from "./AuthContext";

// function UserAuthState({ children }) {
//   // const [user, setuser] = useState(() => auth.currentUser || undefined);
//   const [user, setuser] = useState();

//   // const [isUserSignin, setisUserSignin] = useState();
//   // if (typeof window !== 'undefined') {
//   //   console.log('You are on the browser')
//   //   local = JSON.parse(localStorage.getItem('usersignin')) || {}
//   // } else {
//   //   console.log('You are on the server')
//   //   // 👉️ can't use localStorage
//   // }
//   // console.log(local , typeof(local))
//   // const [isUserSignin, setisUserSignin] = useState(false);

//   // const [user, setuser] = useState(localStorage.getItem('user'));
//   const loadingUser = user === undefined;
//   // function getLocal() {
//   //   console.log(localStorage.getItem('user'))
//   // }
//   function addLocal() {
//     localStorage.setItem('user', JSON.stringify(auth.currentUser)
//     )
//   }
//   function removeLocal() {
//     localStorage.removeItem('user')
//   }

//   // if(isUserSignin){
//   //   console.log(isUserSignin , typeof(isUserSignin))
//   // }

//   useEffect(() => {
//     // const local = JSON.parse(localStorage.getItem('usersignin'))
    
//     // setisUserSignin(local)
//     // if(isUserSignin){
//     //   console.log(isUserSignin , typeof(isUserSignin))
//     // }
//     // let local = localStorage.getItem('usersignin')
//     // console.log(typeof(local) , local , typeof(isUserSignin))
//     // if(local === 'true'){
//     //   setisUserSignin(true)
//     // }
//     // else{
//     //   setisUserSignin(false)
//     // }
//     // if(localStorage.getItem('usersignin') ===  'true'){
//     //   setisUserSignin(true)
//     // }
//     // else{
//     //   setisUserSignin(false)
//     // }
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // if(localStorage.getItem('usersignin') ===  'true'){
//         //   setisUserSignin(true)
//         // }
//         // else{
//         //   setisUserSignin(false)
//         // }
//         addLocal()
//         setuser(JSON.parse(localStorage.getItem('user')))
//         // localStorage.setItem('usersignin','true')
//         // console.log("added user to local")
//       }
//       else {
//         removeLocal()
//         setuser('')
//         // localStorage.removeItem('usersignin')

//         // console.log("removed user form local")
//       }
//     })
//     // if(user === null){

//     // }
//     // return () => {
//     //   cleanup
//     // };
//   }, []);


//   const logout = async () => {
//     setuser(null)
//     return await signOut(auth).then((res) => {
//       // localStorage.removeItem('user')
//     })
//   }

//   const googleSignin = async () => {
//     const provider = new GoogleAuthProvider();
//     return signInWithPopup(auth, provider)
//       .then((res) => {
//         // setuser(localStorage.getItem('user'))
//         console.log(res)
//       })
//       .catch((err) => {
//         console.log("error")
//         if (!disposed) {
//           setlogin(null)
//         }
//       })
//     // .then( (res) => {
//     //     console.log(res)
//     // })
//     // .catch( (err) => {
//     //     console.error(err)
//     // });
//   }

//   return (
//     <div>
//       <AuthContext.Provider
//         value={{ logout, googleSignin, user, setuser, loadingUser }}
//       >
//         {children}
//       </AuthContext.Provider>
//       {/* <AuthContext.Provider 
//       value={{ logout, googleSignin }}>
//         {children}
//       </AuthContext.Provider> */}
//     </div>
//   );
// }

// export default UserAuthState;

// export function useAuthContext() {
//   return useContext(AuthContext);

// }
