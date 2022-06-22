import Image from 'next/image';
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
      <Image src={user?.photoURL} alt={user?.displayName} className={styles.profile}></Image>
      {user?.email}
      <button onClick={logoutHandle}>Logout</button>
    </>
  );
}

export default Dashboard;