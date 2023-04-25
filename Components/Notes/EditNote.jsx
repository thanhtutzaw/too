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
import { useRouter } from "next/router";
import { update } from "./update";
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
  const { setShowAction } = useContext(AppContext);
  //   let height;
  //   if (typeof window !== "undefined") {
  //     height = window.innerHeight;
  //     if (height > 673) {
  //       height = 57 + " extra px need (full screen)";
  //     }
  //   }
  const closeEdit = useCallback(() => {
    viewContainerRef.current.style.position = "initial";
    viewContainerRef.current.style.inset = "initial";
    setactiveNote(null);
    setShowAction("");
    window.location.hash = "#home";
  }, [setShowAction, setactiveNote, viewContainerRef]);
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
      }, 500);
    }
    settitleInput(editnote?.title);
    settextInput(editnote?.text);
  }, [activeNote, editnote, settextInput, settitleInput]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submitHandle() {
    // if (!exitWithoutSaving) {
    //   closeEdit();
    //   return;
    // }
    if (exitWithoutSaving) {
      setLoading(true);
      try {
        await updateNote();
        // router.push("/");
        // router.reload();
        router.replace(router.asPath);
        // router.replace("/#home");
        // router.push("/");
        // router.replace("/#hello");
        console.log(router.asPath);
        // closeEdit();
        setactiveNote(null);
        setShowAction("");

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
  return (
    <>
      <dialog id="confirmModal" ref={confirmModalRef}>
        <ConfirmModal
          closeEdit={closeEdit}
          confirmModalRef={confirmModalRef}
          setactiveNote={setactiveNote}
        />
      </dialog>
      <div className={edit}>
        <div className={viewContainer} ref={viewContainerRef}>
          <ViewHeader
            loading={loading}
            exitHandle={exitHandle}
            // exitHandle={() => {
            //   console.log(router.asPath);
            // }}
            submitHandle={submitHandle}
          />
          <Input
            height={`${
              dateString !== "Invalid Date"
                ? "calc(100% - 110px)"
                : "calc(100% - 70px)"
            }`}
            titleInput={titleInput}
            settitleInput={settitleInput}
            titleRef={titleRef}
            note={editnote}
            textInput={textInput}
            settextInput={settextInput}
            textRef={textRef}
          />
          {dateString !== "Invalid Date" && (
            <p className={s.editDate}>
              {`Edited - ${dateString} ${timeString}`}
            </p>
          )}
        </div>
      </div>
    </>
  );
  async function updateNote() {
    await update(auth, editnote, titleInput, textInput);
  }
}
