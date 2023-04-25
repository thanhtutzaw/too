import { getAuth } from "firebase/auth";
import { doc, writeBatch } from "firebase/firestore";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { GrClose } from "react-icons/gr";
import { AppContext } from "../../context/AppContext";
import styles from "../../styles/Home.module.css";
import app, { db } from "../../utils/firebase";
export default function SelectModal() {
  const { clearSelect, selectLength, selectedId, setShowAction } =
    useContext(AppContext);
  const [loading, setloading] = useState(false);
  // const controlTabkey = !openDeleteModal ? 1 : -1;
  // const mountAnimation = selecting ? mountStyle : unmountStyle;
  const auth = getAuth(app);
  async function deleteMultipleNotes() {
    if (!db) {
      alert("Firestore database is not available");
      throw new Error("Firestore database is not available");
    }
    if (!auth.currentUser) {
      alert("User is not authenticated");
      throw new Error("User is not authenticated");
    }
    const batch = writeBatch(db);
    const chunkSize = 10;
    for (let i = 0; i < selectedId.length; i += chunkSize) {
      const chunk = selectedId.slice(i, i + chunkSize);
      const uid = auth.currentUser.uid;
      for (let j = 0; j < chunk.length; j++) {
        const docRef = doc(db, `users/${uid}/notes/${chunk[j]}`);
        console.log(docRef);
        batch.delete(docRef);
      }
    }
    await batch.commit();
  }
  const router = useRouter();
  return (
    // <div style={mountAnimation} className={`selectModal `}>
    <motion.div
      style={{
        cursor: loading ? "wait" : "initial",
        // pointerEvents: loading ? "none" : "initial",
      }}
      initial={{ opacity: 0, rotateX: 60 }}
      animate={{ opacity: 1, rotateX: 0 }}
      exit={{ opacity: 0, rotateX: 90 }}
      transition={{ duration: 0.2 }}
      className={styles.selectModal}
    >
      <div className={styles.left}>
        <div
          style={{ pointerEvents: loading ? "none" : "initial" }}
          className={styles.close}
        >
          <GrClose onClick={() => clearSelect()} />
        </div>
        <p>{selectLength}</p>
      </div>
      <button
        style={{ pointerEvents: loading ? "none" : "initial" }}
        disabled={loading}
        onClick={async (e) => {
          e.stopPropagation();
          setloading(true);
          try {
            await deleteMultipleNotes();
            router.replace(router.asPath);
            setloading(false);
            clearSelect();
            console.log("%c Deleted !", "color:green");
          } catch (error) {
            setloading(false);
            alert(error.message);
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
