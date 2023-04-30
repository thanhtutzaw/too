import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BiCheckCircle, BiEdit, BiTrash } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { AppContext } from "../../context/AppContext";
import s from "./Notes.module.css";
import { deleteNote } from "./delete";

export default function NoteAction({ chooseSelectMode }) {
  const { showAction, setShowAction } = useContext(AppContext);
  const [loading, setloading] = useState(false);
  const modalHandle = (e) => {
    e.stopPropagation();
    setShowAction("");
  };
  const noteId = showAction.toString();
  const router = useRouter();
  const dropdown = `${s.action} ${loading ? s.loading : ""}`;
  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 60 }}
      animate={{ opacity: 1, rotateX: 0 }}
      exit={{ opacity: 0, rotateX: 90 }}
      transition={{ duration: 0.2 }}
      className={dropdown}
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
            await deleteNote(noteId);
            router.replace(router.asPath);
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
