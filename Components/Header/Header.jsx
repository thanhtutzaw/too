import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useContext, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { AppContext } from "../../context/AppContext";
import styles from "../../styles/Home.module.css";
import SelectModal from "../Modal/SelectModal";
import Sidebar from "./Sidebar";
function Searchbar(props) {
  return (
    <div className={styles.searchBar}>
      <input
        onBlur={() => props.setisSearching(false)}
        onFocus={() => props.setisSearching(true)}
        onChange={(e) => props.setSearch(e.target.value)}
        ref={props.input}
        value={props.Search}
        className={styles.searchInput}
        disabled={props.user ? "" : "disable"}
        type="text"
        placeholder="Search"
      />
      <CgClose
        onClick={props.searchCloseHandle}
        className={
          props.Search ? styles.searchCloseBtn : styles.searchCloseBtnHide
        }
      />
    </div>
  );
}
export default function Header({ user, setisSearching }) {
  const input = useRef(null);
  const [showModal, setshowModal] = useState(false);
  const [Search, setSearch] = useState();
  const searchCloseHandle = () => {
    setSearch("");
    input.current.focus();
  };
  const { selectLength, showAction, setShowAction } = useContext(AppContext);

  const modalHandle = useCallback(() => {
    setshowModal((prevstate) => !prevstate);
    if (showAction) {
      setShowAction("");
    }
  }, [setShowAction, showAction]);
  const testUserPicture =
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
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
    <header>
      <AnimatePresence>
        {selectLength > 0 ? (
          <SelectModal />
        ) : (
          <motion.div
            // initial={{ opacity: 0, rotateX: 60 }}
            // animate={{ opacity: 1, rotateX: 0 }}
            // transition={{ duration: 0.1 }}
            className={styles.headerContainer}
          >
            <Link href="/">
              <h1 className={styles.logo}>Too</h1>
            </Link>
            <Searchbar
              user={user}
              setisSearching={setisSearching}
              input={input}
              Search={Search}
              setSearch={setSearch}
              searchCloseHandle={searchCloseHandle}
            />
            <div>
              <motion.div
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " " || e.key === "Escape") &&
                  modalHandle()
                }
                role="button"
                tabIndex={4}
                className={styles.mainProfile}
                onClick={modalHandle}
                whileTap={{ scale: 0.8 }}
              >
                <Image
                  referrerPolicy="no-referrer"
                  unoptimized={!user.photoURL}
                  src={user.photoURL ? user.photoURL : testUserPicture}
                  alt={""}
                  width="40"
                  height="40"
                  className={styles.profile}
                />
              </motion.div>

              <AnimatePresence>
                {showModal && (
                  <Sidebar user={user} setshowModal={setshowModal} />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* <button onClick={() => setselectedId([])}>Clear</button> */}
    </header>
  );
}
