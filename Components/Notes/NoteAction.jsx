import { getAuth } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { BiCheckCircle, BiEdit, BiTrash } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { AppContext } from "../../context/AppContext";
import { app, db } from "../../utils/firebase";
import s from "./Notes.module.css";

export default function NoteAction({ chooseSelectMode }) {
  const { showAction, setShowAction } = useContext(AppContext);
  const [loading, setloading] = useState(false);
  const modalHandle = (e) => {
    e.stopPropagation();
    setShowAction("");
  };
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
    const uid = auth.currentUser.uid,
      noteId = showAction.toString();
    const docRef = doc(db, `users/${uid}/notes/${noteId}`);
    await deleteDoc(docRef);
    window.location.reload();
  }
  return (
    <motion.div
      style={{
        cursor: loading ? "wait" : "initial",
        pointerEvents: loading ? "none" : "initial",
      }}
      initial={{ opacity: 0, rotateX: 60 }}
      animate={{ opacity: 1, rotateX: 0 }}
      exit={{ opacity: 0, rotateX: 90 }}
      transition={{ duration: 0.2 }}
      className={s.action}
    >
      <button onClick={modalHandle}>
        <CgClose />
        Close
      </button>
      <button>
        <BiEdit />
        Edit
      </button>
      <button onClick={chooseSelectMode}>
        <BiCheckCircle />
        Select
      </button>
      <button
        disabled={loading}
        className={s.deletBtn}
        onClick={async (e) => {
          e.stopPropagation();
          setloading(true);
          try {
            await deleteNote();
          } catch (error) {
            setloading(false);
            alert(error.message);
          }
        }}
      >
        <BiTrash />
        {loading ? "Deleting" : "Delete"}
      </button>
    </motion.div>
  );
}
