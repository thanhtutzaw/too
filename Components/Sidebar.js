import { motion } from 'framer-motion';
import { useAuthUser } from 'next-firebase-auth';
import Image from 'next/image';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { MdLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { VscSignOut } from 'react-icons/vsc';
import styles from "../styles/Home.module.css";
export default function Sidebar({ setshowModal }) {
    const [DarkMode, setDarkMode] = useState(false);
    const user = useAuthUser()
    const modalHandle = () => {
        setshowModal((prevstate) => !prevstate)
    }
    function signoutHandle() {
        return user.signOut(), modalHandle()
    }
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={styles.setting}>
            <div onClick={modalHandle} className={styles.closeBtn}><CgClose /></div>
            <div className={styles.grid}>
                <Image unoptimized={true} src={user?.photoURL} alt={user?.displayName} width="50" height="50" className={styles.profile}></Image>
                <div className={styles.info}>
                    <div className={styles.name}>
                        {user.displayName}
                    </div>
                    <div className={styles.mail}> {user.email}
                    </div>
                </div>
            </div>
            <div className={styles.tools}>
                <button className={styles.tool} onClick={() => { setDarkMode(prev => !prev) }}>
                    <div className={styles.themeContainer}><MdOutlineDarkMode className={DarkMode ? styles.darkAnimation : styles.darkIcon} />
                        <MdLightMode className={DarkMode ? styles.lightIcon : styles.lightAnimation} /></div>
                    Appearance
                </button>
                <button onClick={signoutHandle} className={styles.tool}>
                    <VscSignOut />
                    Signout
                </button>
            </div>
        </motion.div>
    )
}