import styles from "../styles/Home.module.css";
import Image from 'next/image'
import profile from '../public/profile.jpg'
import Link from "next/link";
import Sidebar from "./Sidebar";
import { motion } from 'framer-motion'
import { CgClose } from 'react-icons/cg'
import { useEffect, useRef, useState } from "react";
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";

export default function Header({ user }) {
    const input = useRef(null)
    const [showModal, setshowModal] = useState(false);
    const [Search, setSearch] = useState();
    // const [isClose, setisClose] = useState(false);
    const searchCloseHandle = (e) => {
        setSearch('')
        input.current.focus()
        // setisClose(true)
    }
    const modalHandle = () => {
        setshowModal((prevstate) => !prevstate)
    }
    // const [float, setfloat] = useState(false);
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const offset = 22;
    //         const { scrollTop } = document.documentElement
    //         const scrolled = scrollTop > offset
    //         if (float !== scrolled) {
    //             setfloat("scrolled", scrolled)
    //         }
    //     };
    //     document.addEventListener('scroll', handleScroll);
    //     return () => document.removeEventListener('scroll', handleScroll);
    // }, [float]);
    return (
        <>
            <header className={styles.headerContainer}>
                {/* <header className={float ? styles.headerfloat : styles.header}> */}
                <div className={styles.header}>
                    <Link href='/'>
                        <h1 className={styles.logo}>Too</h1>
                    </Link>
                    <div className={styles.searchBar}>
                        <input ref={input} value={Search} onChange={(e) => setSearch(e.target.value)} className={styles.searchInput} disabled={user ? '' : 'disable'} type="text" placeholder="Search" />
                        <CgClose onClick={searchCloseHandle} className={Search ? styles.searchCloseBtn : styles.searchCloseBtnHide} />
                    </div>
                    <div>
                        {user.photoURL ?
                            <motion.div className={styles.mainProfile} onClick={modalHandle} whileTap={{ scale: .8 }}>
                                <Image referrerPolicy="no-referrer" unoptimized={true} src={user?.photoURL} alt="test" width="40" height="40" className={styles.profile}></Image>
                            </motion.div>
                            :
                            <><Link href="/auth"><a className={styles.signinBtn}>Sign in</a></Link></>
                        }
                        {showModal && <Sidebar user={user} setshowModal={setshowModal} />}
                    </div>
                </div>
            </header>
        </>
    )
}

