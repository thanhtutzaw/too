import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import styles from "../styles/Home.module.css";
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
export default function Header({ selectedId,setselectedId, user, setisSearching }) {
  const input = useRef(null);
  const [showModal, setshowModal] = useState(false);
  const [Search, setSearch] = useState();
  const searchCloseHandle = () => {
    setSearch("");
    input.current.focus();
  };
  const modalHandle = useCallback(() => {
    setshowModal((prevstate) => !prevstate);
  }, []);
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
      {selectedId.length}
      <button onClick={() => setselectedId([])}>Clear</button>
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
        {
          user.photoURL ? (
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
                unoptimized={true}
                src={user?.photoURL}
                alt={""}
                width="40"
                height="40"
                className={styles.profile}
              />
            </motion.div>
          ) : (
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
                unoptimized={true}
                src={testUserPicture}
                alt="testUser Profile"
                width="40"
                height="40"
                className={styles.profile}
              />
            </motion.div>
          )
          //<Link href="/auth">Sign in</Link>
        }
        {showModal && <Sidebar user={user} setshowModal={setshowModal} />}
      </div>
    </header>
  );
}
