import { getAuth } from "firebase/auth";
import { Timestamp, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import s from "../styles/Notes.module.css";
import { app, db } from "../utils/firebase";
import ConfirmModal from "./ConfirmModal";
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
  //   let height;
  //   if (typeof window !== "undefined") {
  //     height = window.innerHeight;
  //     if (height > 673) {
  //       height = 57 + " extra px need (full screen)";
  //     }
  //   }
  const closeEdit = useCallback(() => {
    setactiveNote(null);
    window.location.hash = "#home";
  }, [setactiveNote]);
  useEffect(() => {
    function handleEscape(e) {
      if (e.key !== "Escape") return;
      exitWithoutSaving ? confirmModalRef.current.showAction() : closeEdit();
    }
    window.addEventListener("keyup", handleEscape);
    return () => window.removeEventListener("keyup", handleEscape);
  }, [closeEdit, confirmModalRef, exitWithoutSaving, setactiveNote]);
  const title = useRef(null);
  const text = useRef(null);

  useEffect(() => {
    if (activeNote || editnote) {
      title.current.focus();
    }
    settitleInput(editnote?.title);
    settextInput(editnote?.text);
  }, [activeNote, editnote, settextInput, settitleInput]);

  return (
    <>
      <dialog id="confirmModal" ref={confirmModalRef}>
        <ConfirmModal
          confirmModalRef={confirmModalRef}
          setactiveNote={setactiveNote}
        />
      </dialog>
      <div
        style={{
          pointerEvents: activeNote ? "auto" : "none",
        }}
        className={s.edit}
      >
        <div
          style={{
            opacity: activeNote ? "1" : "0",
            visibility: activeNote ? "visible" : "hidden",
          }}
          className={`${s.viewContainer} ${activeNote ? s.animateView : ""}`}
        >
          <div className={s.viewHeader}>
            <div className={"backBtn"}>
              <BiArrowBack
                onClick={() =>
                  exitWithoutSaving
                    ? confirmModalRef.current.showAction()
                    : closeEdit()
                }
              />
            </div>
            <button
              onClick={async () => {
                try {
                  await updateNote();
                  setactiveNote("");
                } catch (error) {
                  alert(error.message);
                }
              }}
              tabIndex="0"
              className="addBtn"
            >
              Update
            </button>
          </div>
          <div className={s.viewContent}>
            <span
              style={{
                opacity: titleInput !== "" ? "0" : ".5",
              }}
              className={s.titleSpan}
            >
              Title
            </span>
            <h3
              onInput={() => settitleInput(title.current.innerText)}
              ref={title}
              role="input"
              style={{ outline: "none" }}
              contentEditable
            >
              {editnote?.title}
            </h3>
            <span
              style={{
                opacity: textInput !== "" ? "0" : ".5",
              }}
              className={s.textSpan}
            >
              Text
            </span>
            <p
              onInput={() => settextInput(text.current.innerText)}
              ref={text}
              className={s.textView}
              contentEditable
            >
              {editnote?.text}
            </p>
          </div>
          {/* <motion.div className={s.titleView} layoutId={`title-${id}`} contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
            {note.title}
          </motion.div>
          <motion.div className={s.textView} layoutId={`title-${id}`} contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
            {note.text}
          </motion.div> */}
        </div>
      </div>
    </>
  );
  async function updateNote() {
    if (exitWithoutSaving) {
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
}
