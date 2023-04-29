import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "../../context/AppContext";
import { app } from "../../utils/firebase";
import ConfirmModal from "../Modal/ConfirmModal";
import Input from "../Input";
import s from "./Notes.module.css";
import ViewHeader from "../Header/ViewHeader";
import { update } from "./update";
import useEscape from "../../hooks/useEscape";
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
  viewContainerRef,
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
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { setShowAction } = useContext(AppContext);

  const closeEdit = useCallback(() => {
    viewContainerRef.current.style.position = "initial";
    viewContainerRef.current.style.inset = "initial";
    setactiveNote(null);
    setShowAction("");
  }, [setShowAction, setactiveNote, viewContainerRef]);
  const exitHandle = useCallback(
    () =>
      exitWithoutSaving ? confirmModalRef.current?.showModal() : closeEdit(),
    [closeEdit, confirmModalRef, exitWithoutSaving]
  );
  useEscape(() => {
    if (!activeNote) return;
    exitHandle();
    console.log("%cEscape (editNote)", "color:green");
  });
  useEffect(() => {
    if (activeNote || editnote) {
      setTimeout(() => {
        titleRef.current.focus();
      }, 500);
    }
    settitleInput(editnote?.title);
    settextInput(editnote?.text);
  }, [activeNote, editnote, settextInput, settitleInput]);

  async function submitHandle() {
    if (exitWithoutSaving) {
      setLoading(true);
      try {
        await update(auth, editnote, titleInput, textInput);
        closeEdit();
        setLoading(false);
        confirmModalRef.current.close();
      } catch (error) {
        setLoading(false);
        alert(`Update Failed ! ${error.message}`);
      }
    } else {
      closeEdit();
    }
  }
  const edit = `${s.edit} ${activeNote ? s.active : ""} ${
    loading ? s.loading : ""
  }`;
  const viewContainer = `${s.viewContainer} ${activeNote ? s.active : ""} ${
    loading ? s.loading : ""
  }`;
  const updatedAt = new Timestamp(
    editnote?.updatedAt.seconds,
    editnote?.updatedAt.nanoseconds
  ).toDate();
  const dateString = updatedAt.toDateString();
  const timeString = updatedAt.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const validDate = dateString !== "Invalid Date";
  return (
    <>
      <dialog id="confirmModal" ref={confirmModalRef}>
        <ConfirmModal
          closeEdit={closeEdit}
          setactiveNote={setactiveNote}
          confirmModalRef={confirmModalRef}
        />
      </dialog>
      <div className={edit}>
        <div className={viewContainer} ref={viewContainerRef}>
          <ViewHeader
            loading={loading}
            exitHandle={exitHandle}
            submitHandle={submitHandle}
          />
          <Input
            height={`${validDate ? "calc(100% - 110px)" : "calc(100% - 70px)"}`}
            note={editnote}
            textRef={textRef}
            titleRef={titleRef}
            textInput={textInput}
            titleInput={titleInput}
            settextInput={settextInput}
            settitleInput={settitleInput}
          />
          {validDate && (
            <p className={s.editDate}>
              {`Edited - ${dateString} ${timeString}`}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
