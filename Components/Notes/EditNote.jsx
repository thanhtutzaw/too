import { getAuth } from "firebase/auth";
import { Timestamp, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "../../context/AppContext";
import { app, db } from "../../utils/firebase";
import ConfirmModal from "../Modal/ConfirmModal";
import Input from "./Input";
import s from "./Notes.module.css";
import ViewHeader from "./ViewHeader";
// export const getStaticPaths =async () => { // my ssg old code
//   let notes = []
//   const q = collection(db, `users/${id}/notes`);
//   const docSnap = await getDocs(q)
//   notes = docSnap.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data()
//   }))
//   const paths = notes.map(note => {
//     return {
//       params: { id: note.id.toString()  }
//     }
//   })
export default function EditNote({
  confirmModalRef,
  exitWithoutSaving,
  titleInput,
  settitleInput,
  textInput,
  settextInput,
  editnote,
  setactiveNote,
  activeNote,
}) {
  const auth = getAuth(app);
  const { setShowAction } = useContext(AppContext);
  //   let height;
  //   if (typeof window !== "undefined") {
  //     height = window.innerHeight;
  //     if (height > 673) {
  //       height = 57 + " extra px need (full screen)";
  //     }
  //   }
  const closeEdit = useCallback(() => {
    setactiveNote(null);
    setShowAction("");
    window.location.hash = "#home";
  }, [setShowAction, setactiveNote]);
  const exitHandle = useCallback(
    () =>
      exitWithoutSaving ? confirmModalRef.current?.showModal() : closeEdit(),
    [closeEdit, confirmModalRef, exitWithoutSaving]
  );

  useEffect(() => {
    function handleEscape(e) {
      if (e.key !== "Escape") return;
      if (activeNote) {
        console.log("%cEscape (editNote)", "color:green");
        exitHandle();
      }
    }
    window.addEventListener("keyup", handleEscape);
    return () => window.removeEventListener("keyup", handleEscape);
  }, [activeNote, exitHandle]);

  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (activeNote || editnote) {
      setTimeout(() => {
        titleRef.current.focus();
      }, 1000);
    }
    settitleInput(editnote?.title);
    settextInput(editnote?.text);
  }, [activeNote, editnote, settextInput, settitleInput]);
  const [loading, setLoading] = useState(false);
  const submitHandle = async () => {
    if (!exitWithoutSaving) {
      closeEdit();
      return;
    }
    setLoading(true);
    try {
      await updateNote();
      closeEdit();
      confirmModalRef.current.close();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(`Update Failed ! ${error.message}`);
    }
  };
  const edit = `${s.edit} ${activeNote ? s.active : ""} ${
    loading ? s.loading : ""
  }`;
  const viewContainer = `${s.viewContainer} ${activeNote ? s.active : ""} ${
    loading ? s.loading : ""
  }`;
  return (
    <>
      <dialog id="confirmModal" ref={confirmModalRef}>
        <ConfirmModal
          confirmModalRef={confirmModalRef}
          setactiveNote={setactiveNote}
        />
      </dialog>
      <div className={edit}>
        <div className={viewContainer}>
          <ViewHeader
            loading={loading}
            exitHandle={exitHandle}
            submitHandle={submitHandle}
          />
          <Input
            titleInput={titleInput}
            settitleInput={settitleInput}
            titleRef={titleRef}
            note={editnote}
            textInput={textInput}
            settextInput={settextInput}
            textRef={textRef}
          />
          {/* <motion.div className={s.titleView} layoutId={`title-${id}`}  aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
          </motion.div>
          <motion.div className={s.textView} layoutId={`title-${id}`}  aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
          </motion.div> */}
        </div>
      </div>
    </>
  );
  async function updateNote() {
    const uid = auth.currentUser.uid,
      noteId = editnote?.id.toString();
    const docRef = doc(db, `users/${uid}/notes/${noteId}`);
    const newData = {
      ...editnote,
      title: titleInput,
      text: textInput,
      createdAt: new Timestamp(
        editnote.createdAt.seconds,
        editnote.createdAt.nanoseconds
      ),
      updatedAt: serverTimestamp(),
    };
    await updateDoc(docRef, newData);
    window.location.reload();
  }
}
