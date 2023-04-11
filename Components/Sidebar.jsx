import { motion } from "framer-motion";
import { useAuthUser } from "next-firebase-auth";
import Image from "next/image";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";
import { VscSignOut } from "react-icons/vsc";
import styles from "../styles/Home.module.css";
function Setting(props) {
  const { loading, setDarkMode, DarkMode, signoutHandle } = props;
  const handleDarkMode = () => setDarkMode((prev) => !prev);
  const darkMode = DarkMode ? styles.darkAnimation : styles.darkIcon;
  const lightMode = DarkMode ? styles.lightIcon : styles.lightAnimation;
  return (
    <div className={styles.tools}>
      <button className={styles.tool} onClick={handleDarkMode}>
        <div className={styles.themeContainer}>
          <MdOutlineDarkMode className={darkMode} />
          <MdLightMode className={lightMode} />
        </div>
        Appearance
      </button>
      <button
        disabled={loading}
        onClick={signoutHandle}
        className={styles.tool}
      >
        <VscSignOut />
        {loading ? "Signing out..." : "Signout"}
      </button>
    </div>
  );
}
function AccountHeader(props) {
  const { user } = props;
  return (
    <div className={styles.grid}>
      <Image
        unoptimized={true}
        src={
          user?.photoURL
            ? user.photoURL
            : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        }
        alt={user?.displayName ? user.displayName : "test_user"}
        width="50"
        height="50"
        className={styles.profile}
      ></Image>
      <div className={styles.info}>
        <div className={styles.name}>
          {user.displayName ? user.displayName : "test_user"}
        </div>
        <div className={styles.mail}> {user.email}</div>
      </div>
    </div>
  );
}
export default function Sidebar({ setshowModal }) {
  const user = useAuthUser();
  const [DarkMode, setDarkMode] = useState(false);
  const modalHandle = () => setshowModal((prevstate) => !prevstate);
  const [loading, setLoading] = useState(false);
  const signoutHandle = () => {
    setLoading(true);
    setTimeout(() => {
      user.signOut();
      modalHandle();
      setLoading(false);
    }, 1000);
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={styles.setting}
    >
      <div className={styles.closeBtn}>
        <CgClose onClick={modalHandle} />
      </div>
      {user ? (
        <AccountHeader user={user} />
      ) : (
        <AccountHeader user={"test_user"} />
      )}
      <Setting
        loading={loading}
        DarkMode={DarkMode}
        setDarkMode={setDarkMode}
        signoutHandle={signoutHandle}
      />
    </motion.div>
  );
}
