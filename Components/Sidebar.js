import { motion } from 'framer-motion';
import { useAuthUser } from 'next-firebase-auth';
import Image from 'next/image';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { MdLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { VscSignOut } from 'react-icons/vsc';
import styles from "../styles/Home.module.css";

function Setting(props) {
    // const {DarkMode , setDarkMode} = props;
    return (<div className={styles.tools}>
        <button className={styles.tool} onClick={() => {
            props.setDarkMode(prev => !prev);
        }}>
            <div className={styles.themeContainer}><MdOutlineDarkMode className={props.DarkMode ? styles.darkAnimation : styles.darkIcon} />
                <MdLightMode className={props.DarkMode ? styles.lightIcon : styles.lightAnimation} /></div>
            Appearance
        </button>
        <button onClick={props.signoutHandle} className={styles.tool}>
            <VscSignOut />
            Signout
        </button>
    </div>);
}
function AccountHeader(props) {
    return (<div className={styles.grid}>
        <Image unoptimized={true} src={props.user?.photoURL ? props.user.photoURL : './profile.jpg'} alt={props.user?.displayName ? props.user.displayName :'test_user'} width="50" height="50" className={styles.profile}></Image>
        <div className={styles.info}>
            <div className={styles.name}>
                {props.user.displayName ? props.user.displayName :'test_user'}
            </div>
            <div className={styles.mail}> {props.user.email}
            </div>
        </div>
    </div>);
}


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
            <div className={styles.closeBtn}>
                <CgClose onClick={modalHandle} />
            </div>
            {user ?
            <AccountHeader user={user} />
            :
            <AccountHeader user={"test_user"} />
}
            <Setting DarkMode={DarkMode} setDarkMode={setDarkMode} signoutHandle={signoutHandle} />
        </motion.div>
    )
}