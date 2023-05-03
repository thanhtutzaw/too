import { motion } from "framer-motion";
import { useAuthUser } from "next-firebase-auth";
import Image from "next/image";
import { useContext, useState } from "react";
import { CgClose } from "react-icons/cg";
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";
import { VscSignOut } from "react-icons/vsc";
import { AppContext } from "../../context/AppContext";
import styles from "../../styles/Home.module.css";
function Setting(props) {
  const { loading, signoutHandle, modalHandle } = props;
  const { theme, setTheme } = useContext(AppContext);
  const handleDarkMode = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setTimeout(() => {
      modalHandle();
    }, 340);
  };
  const lightMode = `${styles.lightIcon} ${
    theme === "light" ? "" : styles.active
  }`;
  const darkMode = `${styles.darkIcon} ${
    theme !== "light" ? "" : styles.active
  }`;
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
        src={
          user?.photoURL
            ? user.photoURL
            : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        }
        alt={user?.displayName ? user.displayName : "test_user"}
        width="50"
        height="50"
        className={styles.profile}
      />
      <div className={styles.info}>
        <div className={styles.name}>
          {user.displayName ? user.displayName : "test_user"}
        </div>
        <div className={styles.mail}> {user.email}</div>
      </div>
    </div>
  );
}
export default function Sidebar({ setshowModal, theme, setTheme }) {
  const user = useAuthUser();
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
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
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
        modalHandle={modalHandle}
        theme={theme}
        setTheme={setTheme}
        loading={loading}
        signoutHandle={signoutHandle}
      />
    </motion.div>
  );
}
