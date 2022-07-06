import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useAuthContext } from "../context/UserAuthState";
import styles from "../styles/Home.module.css";
import Dashboard from "./Components/Dashboard";
import Welcome from "./Components/Welcome";
// import {AiOutlineArrowRight} from 'react-icons/ai'
export default function Home() {

  const { user, setuser, loadingUser } = useAuthContext()

  useEffect(() => {
    auth.onAuthStateChanged(setuser);
  }, []);

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

  if (loadingUser) return null;
  return (
    <div className={styles.container}>
      
        {user ? (
          <Dashboard />
        ) : (
          <Welcome />
        )}
      

    </div>

  );
}
