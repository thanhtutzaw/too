import { motion } from "framer-motion";
import { BiCheckCircle, BiCheckShield, BiTrash } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import s from "../styles/Notes.module.css";
export default function NoteAction({
  // setselectMode,
  // setselectedId,
  showModal,
  setShowModal,
  chooseSelectMode,
}) {
  const modalHandle = (e) => {
    e.stopPropagation();
    setShowModal("");
  };
  //   const [loading, setLoading] = useState(false);
  //   const signoutHandle = () => {
  //     setLoading(true);
  //     setTimeout(() => {
  //       user.signOut();
  //       modalHandle();
  //       setLoading(false);
  //     }, 1000);
  //   };
  function deletNote(e) {
    e.stopPropagation();
    alert(showModal);
    setShowModal("");
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={s.action}
    >
      {/* <div className={styles.closeBtn}> */}
      <button onClick={modalHandle}>
        <CgClose />
        Close
      </button>
      <button onClick={chooseSelectMode}>
        <BiCheckCircle />
        Select
      </button>
      <button className={s.deletBtn} onClick={deletNote}>
        <BiTrash />
        Delete
      </button>
    </motion.div>
  );
}
