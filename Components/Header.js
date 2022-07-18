import styles from "../styles/Home.module.css";
import Image from 'next/image'
import profile from '../public/profile.jpg'
import Link from "next/link";
import Sidebar from "./Sidebar";
// import { useAuthContext } from '../../context/UserAuthState';

export default function Header({ showModal,setshowModal, user }) {

    // const {user} = useAuthContext()


    const modalHandle = () => {
        setshowModal((prevstate) => !prevstate)
    }
    return (
        <div className={styles.profile}>
            <div><h1>Too</h1></div>
            <input disabled={user ? '' : 'disable'} className={styles.searchBar} type="text" />



            {/* {<h2>{user?.uid}</h2>} */}
            {/* 
            {!user && <Image unoptimized={true} src={profile} alt={user?.displayName} width="40" height="40" className={styles.profile}></Image>} */}
            {/* {user && JSON.stringify(user)} */}
            {user.photoURL ? 
            // <>{user.displayName}</>
            <div className={styles.mainProfile} onClick={modalHandle}>
                {/* {user.displayName} */}
                <Image referrerPolicy="no-referrer" unoptimized={true} src={user?.photoURL} alt="test" width="40" height="40" className={styles.profile}></Image>
                
                {/* {showModal ? <Sidebar user={user} setshowModal={setshowModal} /> : null} */}
                </div> 
            
            : 
            
            
            
            <><Link  href="/auth"><a className={styles.signinBtn}>Sign in</a></Link></>}
            {/* {console.log(user.photoURL)} */}


            
        </div>

    )
}


// Header.getServerSideProps = async () => {
//     console.log("server stuff")
//   }
