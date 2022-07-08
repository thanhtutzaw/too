import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useAuthContext } from "../context/UserAuthState";
import styles from "../styles/Home.module.css";
// import global from "../styles/global.css";
import Dashboard from "./Components/Dashboard";
import Welcome from "./Components/Welcome";
// import {AiOutlineArrowRight} from 'react-icons/ai'
export default function Home() {

  const [issignin, setissignin] = useState(true);


  const { user, setuser, loadingUser } = useAuthContext()
  // useEffect(
  //   // const local = localStorage.getItem('randid')
  //   //   if (local !== null) {
  //   //     console.log(local)
  //   //   }
  //   () => {
      
  //   }, []);
  // console.log(issignin)

  useEffect(() => {
    auth.onAuthStateChanged(setuser);
    // return () => {
    //   cleanup
    // };
  }, []);
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
        <Dashboard />
      </div>
      {/* {user ? (
        ) : (
          <Welcome />
        )} */}
    </>



  );
}
