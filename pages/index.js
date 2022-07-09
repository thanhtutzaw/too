import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useAuthContext } from "../context/UserAuthState";
import styles from "../styles/Home.module.css";
// import global from "../styles/global.css";
import Dashboard from "./Components/Dashboard";
import Welcome from "./Components/Welcome";
// import {AiOutlineArrowRight} from 'react-icons/ai'
export default function Home() {

  // const [issignin, setissignin] = useState(true);


  const { user, setuser, loadingUser } = useAuthContext()
// const [isSignin, setisSignin] = useState(true);
// console.log("first")


// if(user){
  //   console.log("user exist")
  // }
  
  // if(local){
    //   console.log("local")
    // }else{
      //   console.log("n0")
      // }
      useEffect(() => {

        
// const local = localStorage.getItem('user')
// if(local){
//   console.log("true")
// }
// else{
//   console.log("false")
// }
    // const local = localStorage.getItem('user')

    // if(local){
    //   console.log("first")
    // }
    // if(localStorage.getItem('user') == true){
    //   console.log("true")
    // }
    // console.log("set here")
    // setuser(localStorage.getItem('user'))
    // auth.onAuthStateChanged(setuser);
    
    // return unsub;
  }, []);
  // onAuthStateChanged(auth , (user) => {
  //   if(user){
  //     setuser(JSON.parse(localStorage.getItem('user')))
  //     console.log(user)
  //   }else{
  //     setuser('')
  //   }
  // })
  // if(user){
  //   // setissignin(false)
  // }
  // var request = window.indexedDB.open("firebaseLocalStorageDb", 1);
  // request.onsuccess = function (e) {
  //   setlocal(true)
  //   console.log("db initilalized");
  //   const indexDB = request.result;
  //   getData(indexDB);
  // }

  // function getData(indexDB) {
  //   var transaction = indexDB.transaction(["firebaseLocalStorage"],"readwrite");

  //   transaction.oncomplete = function (e) {
  //     console.log("transaction complete")

  //   }
  //   transaction.onerror = function(e) {
  //     console.log(e)
  //   }

  //   var objectStore = transaction.objectStore("firebaseLocalStorage");

  //   objectStore.openCursor().onsuccess = async (e) => {
  //     let cursor = e.target.result;
  //     if(cursor){
  //       setlocal(cursor.value.value.photoURL)
  //       cursor.continue()
  //     }
  //   }

  // }

  // if (loadingUser) return <>Am i null ?</>;
  // {loadingUser ? <>Loading</> : null}
  // if(!user) return (<Welcome />)

  return (
    <>


      {/* {user && (<>User exist</>)}
      {!user && (<>No user</>)} */}
      {/* {user && issignin && <Dashboard/>} */}
      <div className={styles.container}>
        {/* {user ? <Dashboard /> : <Welcome/>} */}
        {/* {user ? <Dashboard /> : <Welcome/>} */}
        {user ? <Dashboard/> : <Welcome/>}
        
      </div>
      {/* {user ? (
        ) : (
          <Welcome />
        )} */}
    </>



  );
}
