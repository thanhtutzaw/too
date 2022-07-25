import styles from "../styles/Home.module.css";
import Image from 'next/image'
import profile from '../public/profile.jpg'
import Link from "next/link";
import Sidebar from "./Sidebar";
import { motion } from 'framer-motion'
import { CgClose } from 'react-icons/cg'
import { useState } from "react";
// import { useAuthContext } from '../../context/UserAuthState';

export default function Header({ showModal, setshowModal, user }) {
    const [Search, setSearch] = useState();
    // const {user} = useAuthContext()
    const [isClose, setisClose] = useState(false);
    const searchCloseHandle = () => {
        setSearch('')
        setisClose(true)
    }
    const modalHandle = () => {
        setshowModal((prevstate) => !prevstate)

    }
    return (
        <header className={styles.header}>
            <div className={styles.row}>
                <div><h1>Too</h1></div>

                <div className={styles.searchBar}>
                    <input value={Search} onChange={(e) => setSearch(e.target.value)} className={styles.searchInput} disabled={user ? '' : 'disable'} type="text" />

                    <CgClose onClick={searchCloseHandle} className={Search ? styles.searchCloseBtn : styles.searchCloseBtnHide} />
                </div>



                {/* {<h2>{user?.uid}</h2>} */}
                {/* 
{!user && <Image unoptimized={true} src={profile} alt={user?.displayName} width="40" height="40" className={styles.profile}></Image>} */}
                {/* {user && JSON.stringify(user)} */}
                {user.photoURL ?
                    // <>{user.displayName}</>
                    <motion.div className={styles.mainProfile} onClick={modalHandle} whileTap={{ scale: .8 }}>
                        {/* {user.displayName} */}
                        <Image referrerPolicy="no-referrer" unoptimized={true} src={user?.photoURL} alt="test" width="40" height="40" className={styles.profile}></Image>

                        {/* {showModal ? <Sidebar user={user} setshowModal={setshowModal} /> : null} */}
                    </motion.div>

                    :



                    <><Link href="/auth"><a className={styles.signinBtn}>Sign in</a></Link></>



                }
                {/* {console.log(user.photoURL)} */}


            </div>

        </header>

    )
}


// Header.getServerSideProps = async () => {
//     console.log("server stuff")
//   }
