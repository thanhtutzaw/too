import styles from "../styles/Home.module.css";
import Image from 'next/image'
import profile from '../public/profile.jpg'
import Link from "next/link";
import Sidebar from "./Sidebar";
import { motion } from 'framer-motion'
import { CgClose } from 'react-icons/cg'
import { useEffect, useRef, useState } from "react";
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
// import { useAuthContext } from '../../context/UserAuthState';

function Header({ user }) {
    const input = useRef(null)
    const [showModal, setshowModal] = useState(false);


    // const user = useAuthUser()
    const [Search, setSearch] = useState();
    // const {user} = useAuthContext()
    const [isClose, setisClose] = useState(false);

    const searchCloseHandle = (e) => {
        setSearch('')
        input.current.focus()
        setisClose(true)
    }
    const modalHandle = () => {
        setshowModal((prevstate) => !prevstate)

    }

    const [float, setfloat] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = 22;
            console.log(offset, "offset")
            const { scrollTop } = document.documentElement
            console.log(scrollTop)
            const scrolled = scrollTop > offset

            if (float !== scrolled) {
                console.log("scroll in ")
                setfloat(scrolled)
            }
        };
        // clean up code
        // document.removeEventListener('scroll', handleScroll);
        document.addEventListener('scroll', handleScroll);
        // if(offset >= 69){
        //   setfloat(true)
        //   console.log("header ...")
        // }
        return () => document.removeEventListener('scroll', handleScroll);
    }, [float]);
    return (
        <header className={styles.headerContainer}>
            {/* <header className={float ? styles.headerfloat : styles.header}> */}
            <div className={styles.header}>
                <Link href='/'>
                    <h1 className={styles.logo}>Too</h1>
                </Link>
                {/* {user.photoURL ?
                    // <>{user.displayName}</>
                    <motion.div className={styles.mainProfile} onClick={modalHandle} whileTap={{ scale: .8 }}>
                        <Image referrerPolicy="no-referrer" unoptimized={true} src={user?.photoURL} alt="test" width="40" height="40" className={styles.profile}></Image>
                    </motion.div>
                    :
                    <><Link href="/auth"><a className={styles.signinBtn}>Sign in</a></Link></>
                } */}
                <div className={styles.searchBar}>
                    <input ref={input} value={Search} onChange={(e) => setSearch(e.target.value)} className={styles.searchInput} disabled={user ? '' : 'disable'} type="text" placeholder="Search"/>
                    <CgClose onClick={searchCloseHandle} className={Search ? styles.searchCloseBtn : styles.searchCloseBtnHide} />
                </div>




                {user.photoURL ?
                    // <>{user.displayName}</>
                    <motion.div className={styles.mainProfile} onClick={modalHandle} whileTap={{ scale: .8 }}>
                        <Image referrerPolicy="no-referrer" unoptimized={true} src={user?.photoURL} alt="test" width="40" height="40" className={styles.profile}></Image>
                    </motion.div>
                    :
                    <><Link href="/auth"><a className={styles.signinBtn}>Sign in</a></Link></>
                }



                {/* {showModal ? <Sidebar user={user} setshowModal={setshowModal} /> : null} */}
                {/* {user.displayName} */}
                {/* {console.log(user.photoURL)} */}
                {/* {<h2>{user?.uid}</h2>} */}
                {/* 
{!user && <Image unoptimized={true} src={profile} alt={user?.displayName} width="40" height="40" className={styles.profile}></Image>} */}
                {/* {user && JSON.stringify(user)} */}



            </div>

            {showModal && <Sidebar user={user} setshowModal={setshowModal} />}
        </header>



    )
}
// export default withAuthUser()(Header)

// Header.getServerSideProps = async () => {
//     console.log("server stuff")
//   }

// export const getServerSideProps = withAuthUserTokenSSR()()

export default Header


