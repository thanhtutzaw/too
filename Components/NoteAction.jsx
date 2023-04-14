import { getAuth } from "firebase/auth";
import { deleteDoc, doc, writeBatch } from "firebase/firestore";
import { motion } from "framer-motion";
import { useContext } from "react";
import { BiCheckCircle, BiTrash } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { AppContext } from "../context/AppContext";
import s from "../styles/Notes.module.css";
import { app, db } from "../utils/firebase";

export default function NoteAction({ chooseSelectMode }) {
  const { selectLength, showAction, setShowAction, selectedId } =
    useContext(AppContext);
  const modalHandle = (e) => {
    e.stopPropagation();
    setShowAction("");
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
  const auth = getAuth(app);
  async function deleteNote() {
    if (!db) {
      alert("Firestore database is not available");
      throw new Error("Firestore database is not available");
    }
    if (!auth.currentUser) {
      alert("User is not authenticated");
      throw new Error("User is not authenticated");
    }
    // todoRef.current?.scrollIntoView({ behavior: 'smooth' });
    // const batch = writeBatch(db);
    // const chunkSize = 10;
    // for (let i = 0; i < selectLength; i += chunkSize) {
    //   const chunk = selectedId.slice(i, i + chunkSize);
    //   // console.log(chunk)
    //   const uid = auth.currentUser.uid;
    //   for (let j = 0; j < chunk.length; j++) {
    //     const docRef = doc(db, `users/${uid}/notes/${chunk[j]}`);
    //     // batch.delete(docRef);
    //   }
    // }
    const uid = auth.currentUser.uid,
      noteId = showAction.toString();
    const docRef = doc(db, `users/${uid}/notes/${noteId}`);
    await deleteDoc(docRef);
    window.location.reload(); 
    // try {
    //   await batch.commit();
    //   console.info("%cDeleted !", "color: green");
    //   // setTimeout(async () => {
    //   //   // setisPrevent(false);
    //   //   // setcancelDelete(true);
    //   //   // setopenDeleteToast(false);
    //   //   console.log("close Delete Toast");
    //   // }, 1500);
    // } catch (error) {
    //   console.log(error);
    //   // alert("Delete Error ! \n" + error.code.toUpperCase());
    // }
    // alert(showAction);
    // setShowAction("");
  }
  // export function deleteNote() {
  //   alert("hey");
  // }

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
      <button
        className={s.deletBtn}
        onClick={async (e) => {
          e.stopPropagation();
          try {
            await deleteNote();
          } catch (error) {
            alert(error.message);
          }
          setShowAction("");
        }}
      >
        <BiTrash />
        Delete
      </button>
    </motion.div>
  );
}
