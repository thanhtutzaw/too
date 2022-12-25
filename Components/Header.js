import styles from "../styles/Home.module.css";
import Image from 'next/image'
import Link from "next/link";
import Sidebar from "./Sidebar";
import { motion } from 'framer-motion'
import { CgClose } from 'react-icons/cg'
import { useCallback, useRef, useState } from "react";


function Searchbar(props) {
    return (<div className={styles.searchBar}>
        <input onBlur={e => {
            props.setisSearching(false);
        }} onFocus={e => {
            props.setisSearching(true);
        }} ref={props.input} value={props.Search} onChange={e => props.setSearch(e.target.value)} className={styles.searchInput} disabled={props.user ? '' : 'disable'} type="text" placeholder="Search" />
        <CgClose onClick={props.searchCloseHandle} className={props.Search ? styles.searchCloseBtn : styles.searchCloseBtnHide} />
    </div>);
}


export default function Header({ user, setisSearching }) {
    const input = useRef(null)
    const [showModal, setshowModal] = useState(false);
    const [Search, setSearch] = useState();
    const searchCloseHandle = (e) => {
        setSearch('')
        input.current.focus()
    }
    const modalHandle = useCallback(() => {
        setshowModal((prevstate) => !prevstate)
    }
        , [])
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
    // if(!user){
    //     Router.push('/auth')
    // }
    return (
        <>
            <div className={styles.headerContainer}>
                {/* <header className={float ? styles.headerfloat : styles.header}> */}
                <div className={styles.header}>
                    <Link href='/'>
                        <h1 className={styles.logo}>Too</h1>
                    </Link>
                    <Searchbar user={user} setisSearching={setisSearching} input={input} Search={Search} setSearch={setSearch} searchCloseHandle={searchCloseHandle} />
                    <div>
                        {user.photoURL ?
                            <motion.div className={styles.mainProfile} onClick={modalHandle} whileTap={{ scale: .8 }}>
                                <Image referrerPolicy="no-referrer" unoptimized={true} src={user?.photoURL} alt="test" width="40" height="40" className={styles.profile}></Image>
                            </motion.div>
                            :
                            <motion.div className={styles.mainProfile} onClick={modalHandle} whileTap={{ scale: .8 }}>
                                <Image referrerPolicy="no-referrer" unoptimized={true} src="./profile.jpg" alt="test" width="40" height="40" className={styles.profile}></Image>
                            </motion.div>
                            // :

                            // <><Link href="/auth"><a className={styles.signinBtn}>Sign in</a></Link></>
                        }
                        {showModal && <Sidebar user={user} setshowModal={setshowModal} />}
                    </div>
                </div>
            </div>

        </>
    )
}

