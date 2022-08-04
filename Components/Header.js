import styles from "../styles/Home.module.css";
import Image from 'next/image'
import profile from '../public/profile.jpg'
import Link from "next/link";
import Sidebar from "./Sidebar";
import { motion } from 'framer-motion'
import { CgClose } from 'react-icons/cg'
import { useEffect, useState } from "react";
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
// import { useAuthContext } from '../../context/UserAuthState';

  function Header ({user }) {
  const [showModal, setshowModal] = useState(false);

    
    // const user = useAuthUser()
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

    const [float, setfloat] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          const offset =22;
          console.log(offset , "offset")
          const { scrollTop } = document.documentElement
          console.log(scrollTop)
          const scrolled = scrollTop > offset

          if(float !== scrolled){
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
        <header className={float ? styles.headerfloat : styles.header}>
            <div className={styles.row}>

                <Link href='/'>
                <div><h1>Too</h1></div>
                </Link>

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


