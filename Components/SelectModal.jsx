import { AppContext } from "../context/AppContext";
import { useContext, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import styles from "../styles/Home.module.css";
import { doc, writeBatch } from "firebase/firestore";
import app, { db } from "../utils/firebase";
import { getAuth } from "firebase/auth";
export default function SelectModal() {
  // const mountStyle = {
  //   animation: "selectMount 200ms ease-in",
  // };
  // const unmountStyle = {
  //   animation: "selectUnmount 250ms ease-out",
  // };
  const { clearSelect, selectLength, selectedId, setShowAction } =
    useContext(AppContext);
  // useEffect(() => {
  //   function handleEscape(e) {
  //     if (e.key === "Escape") {
  //       if (exitWithoutSaving) {
  //         console.log("confirm update");
  //         editModalRef.current?.showAction();
  //         confirmModalRef.current?.showAction();
  //       }
  //       if (selectedId.length > 1 || !exitWithoutSaving) {
  //         console.log(e.key + " (closing selectModal)");
  //         clearSelect();
  //         setisPrevent(false);
  //         setDeleteModalMounted(false);
  //         setopenDeleteModal(false);
  //       }
  //     }
  //   }
  //   window.addEventListener("keyup", handleEscape);
  //   return () => {
  //     window.removeEventListener("keyup", handleEscape);
  //   };
  // }, [exitWithoutSaving]);

  // const controlTabkey = !openDeleteModal ? 1 : -1;
  // const mountAnimation = selecting ? mountStyle : unmountStyle;
  const auth = getAuth(app);
  async function deleteMultipleNote() {
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
    for (let i = 0; i < selectLength; i += chunkSize) {
      const chunk = selectedId.slice(i, i + chunkSize);
      // console.log(chunk)
      const uid = auth.currentUser.uid;
      for (let j = 0; j < chunk.length; j++) {
        const docRef = doc(db, `users/${uid}/notes/${chunk[j]}`);
        batch.delete(docRef);
      }
    }
    batch.commit();
    window.location.reload();
  }
  return (
    // <div style={mountAnimation} className={`selectModal `}>
    <div className={styles.selectModal}>
      <div className={styles.left}>
        <GrClose className={styles.close} onClick={() => clearSelect()} />
        <p>{selectLength}</p>
      </div>
      <button
        // tabIndex={controlTabkey}
        // style={{ pointerEvents: deleteloading ? "none" : "initial" }}
        // disabled={deleteloading}
        onClick={async (e) => {
          e.stopPropagation();
          try {
            await deleteMultipleNote();
          } catch (error) {
            alert(error.message);
          }
          setShowAction("");
        }}
        className={styles.delete}
      >
        Delete
      </button>
    </div>
  );
}
