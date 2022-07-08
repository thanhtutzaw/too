import styles from "../../styles/Home.module.css";
import Image from 'next/image'
import profile from '../../public/profile.jpg'
import { useAuthContext } from '../../context/UserAuthState';

export default function Header({setshowModal, src}) {
    const {user} = useAuthContext()

    const modalHandle = () => {
        setshowModal( (prevstate ) => !prevstate)
    }
    return (
        <div className={styles.profile}>
            <div><h1>Too</h1></div>
            <input className={styles.searchBar} type="text" />
            <div className={styles.mainProfile} onClick={modalHandle}>

            {!user && <Image unoptimized={true} src={profile} alt={user?.displayName} width="40" height="40" className={styles.profile}></Image>}
            {user && <Image unoptimized={true} src={user?.photoURL} alt={user?.displayName} width="40" height="40" className={styles.profile}></Image>}
            
            </div>
        </div>
    )
}

