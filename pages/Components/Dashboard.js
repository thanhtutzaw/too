import React from 'react'
import { useAuthContext } from '../../context/UserAuthState';
import styles from "../../styles/Home.module.css";



function Dashboard({ user }) {
  const { logout } = useAuthContext()

  const logoutHandle = () => {
    try {
      logout();
      // setisSignin(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <img src={user.photoURL} className={styles.profile} />
      {user.email}
      <button onClick={logoutHandle}>Logout</button>
    </>
  )
}

export default Dashboard