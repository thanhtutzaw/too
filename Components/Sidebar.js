import Image from 'next/image'
import styles from "../styles/Home.module.css";
import { useAuthContext } from '../context/UserAuthState';
import { MdOutlineDarkMode } from 'react-icons/md'
import { VscSignOut } from 'react-icons/vsc'
import { CgClose } from 'react-icons/cg'
import { motion } from 'framer-motion'
export default function Sidebar({ setshowModal, user }) {
    // const { logout, user } = useAuthContext()
    const modalHandle = () => {
        setshowModal((prevstate) => !prevstate)
    }

    function signoutHandle() {
        return user.signOut(), modalHandle()
    }
    // const logoutHandle = () => {
    //     try {
    //         logout();
    //         // setisSignin(false);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}

            className={styles.card}>
            <div onClick={modalHandle} className={styles.closeBtn}><CgClose /></div>
            <div className={styles.grid}>
                <div>
                    <Image unoptimized={true} src={user?.photoURL} alt={user?.displayName} width="50" height="50" className={styles.profile}></Image>

                </div>

                <div>
                    <div className={styles.name}>
                        {user.displayName}
                    </div>

                    <div className={styles.mail}> {user.email}
                    </div>
                </div>

            </div>

            <div className={styles.tools}>

                <div className={styles.tool}>
                    <div><MdOutlineDarkMode /></div>
                    <div>Appearance</div>
                </div>
                <div onClick={signoutHandle} className={styles.tool}>
                    <div><VscSignOut /></div>
                    <div>Signout</div>
                </div>

            </div>

        </motion.section>
    )
}
