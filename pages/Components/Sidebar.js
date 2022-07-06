import React from 'react'
import { useAuthContext } from '../../context/UserAuthState';
import styles from "../../styles/Home.module.css";
import Image from 'next/image'
import {MdOutlineDarkMode} from 'react-icons/md'
import {VscSignOut} from 'react-icons/vsc'
import {CgClose} from 'react-icons/cg'

function Sidebar({setshowModal}) {
    const { logout, user } = useAuthContext()
    const modalHandle = () => {
        setshowModal( (prevstate ) => !prevstate)
    }
    const logoutHandle = () => {
        try {
            logout();
            // setisSignin(false);
        } catch (err) {
            console.error(err);
        }
    };
    return (
            <section className={styles.card}>
                <div onClick={modalHandle} className={styles.closeBtn}><CgClose/></div>
                <div className={styles.grid}>
                    <div>
                        <Image unoptimized={true} src={user?.photoURL} alt={user?.displayName} width="50" height="50" className={styles.profile}></Image>

                    </div>

                    <div>
                        <div className={styles.name}>
                            {user?.displayName}
                        </div>

                        <div className={styles.mail}>{user?.email}
                        </div>
                    </div>

                </div>

                <div className={styles.tools}>

                    <div className={styles.tool}>
                        <div><MdOutlineDarkMode /></div>
                        <div>Appearance</div>
                    </div>
                    <div onClick={logoutHandle} className={styles.tool}>
                        <div><VscSignOut/></div>
                        <div>Signout</div>
                    </div>

                </div>

            </section>
    )
}

export default Sidebar