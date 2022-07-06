import React, { useState } from 'react'
// import { useAuthContext } from '../../context/UserAuthState';
import styles from "../../styles/Home.module.css";
import Header from './Header';
import Sidebar from './Sidebar';



function Dashboard() {
  const [showModal, setshowModal] = useState(false);
  

  return (
    
      <section className={styles.main}>
    <Header setshowModal={setshowModal}/>

    {showModal ? <Sidebar  setshowModal={setshowModal}/> : null}
      
    </section>
  );
}

export default Dashboard;