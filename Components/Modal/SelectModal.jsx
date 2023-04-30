import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { GrClose } from "react-icons/gr";
import { AppContext } from "../../context/AppContext";
import styles from "../../styles/Home.module.css";
import { deleteNote } from "../Notes/delete";
export default function SelectModal() {
  const { clearSelect, selectLength, setShowAction, selectedId } =
    useContext(AppContext);

  const [loading, setloading] = useState(false);

  const router = useRouter();
  const cursor = loading ? "wait" : "initial";
  return (
    <motion.div
      style={{ cursor }}
      className={styles.selectModal}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0, rotateX: 90 }}
      animate={{ opacity: 1, rotateX: 0 }}
      initial={{ opacity: 0, rotateX: 60 }}
    >
      <div className={styles.left}>
        <div
          style={{ pointerEvents: loading ? "none" : "initial" }}
          className={styles.close}
        >
          <GrClose onClick={() => clearSelect()} />
        </div>
        <p>{selectLength} Selected</p>
      </div>
      <button
        style={{ pointerEvents: loading ? "none" : "initial" }}
        disabled={loading}
        onClick={async (e) => {
          e.stopPropagation();
          setloading(true);
          try {
            await deleteNote(selectedId);
            router.replace(router.asPath);
            setloading(false);
            clearSelect();
            console.log("%c Deleted !", "color:green");
          } catch (error) {
            setloading(false);
            alert(`Delete Failed ! ${error.message}`);
          }
          setShowAction("");
        }}
        className={styles.delete}
      >
        {loading ? "Deleting" : "Delete"}
      </button>
    </motion.div>
  );
}
