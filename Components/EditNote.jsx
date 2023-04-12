import React, { useCallback, useEffect, useRef, useState } from "react";
import s from "../styles/Notes.module.css";
// import { notes } from '../../utils/data'
import { BiArrowBack } from "react-icons/bi";
import { updateDoc, doc, serverTimestamp, Timestamp } from "firebase/firestore";
import { app, db } from "../utils/firebase";
import { getAuth } from "firebase/auth";
import ConfirmModal from "./ConfirmModal";
// export const getStaticPaths =async () => {
//   let notes = []
//   const q = collection(db, `users/${id}/notes`);
//   const docSnap = await getDocs(q)
//   // console.log(q)
//   notes = docSnap.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data()
//   }))
//   const paths = notes.map(note => {
//     return {
//       params: { id: note.id.toString()  }
//     }
//   })
//   return {
//     paths,
//     fallback: false
//   }

// }

// export const getStaticProps = async (context) => {
//   const id = context.params.id
//   // const notes = context.params.notes
//   let notes = []
//   const note = notes.find(note => note.id == id)
//   return {
//     props: { note },
//     // revalidate: 100
//   }
// }

// export const getServerSideProps = withAuthUserTokenSSR()(
//   async ({ AuthUser }) => {
//     let notes = null;
//     const id = AuthUser.id;
//     const q = collection(db, `users/${id}/notes`);
//     const docSnap = await getDocs(q);

//     notes = docSnap.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return {
//       props: {
//         notes,
//       },
//     };
//   }
// );

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
  // const note = []
  //   const router = useRouter();
  //   let { id } = router.query;
  //   const note = notes.find((note) => note.id == id);

  //   let height;
  //   if (typeof window !== "undefined") {
  //     height = window.innerHeight;
  //     if (height > 673) {
  //       height = 57 + " extra px need (full screen)";
  //     }
  //   }
  // useEffect(() => {
  //   // function handleEscape(e) {
  //   //   if (e.key === "Escape") {
  //   //     // console.log("Escape");
  //   //     setactiveNote("");
  //   //     window.location.hash = "#home";
  //   //   }
  //   // }
  //   if (activeNote) {
  //     // window.addEventListener("keyup", handleEscape);
  //   }
  //   // return () => window.removeEventListener("keyup", handleEscape);
  // }, [activeNote, setactiveNote]);
  const closeEdit = useCallback(() => {
    setactiveNote(null);
    window.location.hash = "#home";
  }, [setactiveNote]);
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        if (exitWithoutSaving) {
          confirmModalRef.current.showModal();
        } else {
          closeEdit();
        }
      }
    }
    window.addEventListener("keyup", handleEscape);
    return () => window.removeEventListener("keyup", handleEscape);
  }, [closeEdit, confirmModalRef, exitWithoutSaving, setactiveNote]);
  // useEffect(() => {
  //   window.onpopstate = () => {
  //     console.log("back");
  //   };
  // }, []);
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
      {/* <p>Height {height}</p> */}
      <div
        style={{
          zIndex: "100000",
          pointerEvents: activeNote ? "auto" : "none",
        }}
        className={s.edit}
      >
        <div
          // tabIndex="1"
          style={{
            zIndex: "100000",
            opacity: activeNote ? "1" : "0",
            visibility: activeNote ? "visible" : "hidden",
          }}
          className={`${s.viewContainer} ${activeNote ? s.animateView : ""}`}
        >
          <div className={s.viewHeader}>
            <div className={"backBtn"}>
              <BiArrowBack
                onClick={() => {
                  exitWithoutSaving
                    ? confirmModalRef.current.showModal()
                    : closeEdit();
                }}
              />
            </div>
            <button
              onClick={() => {
                window.history.back();
                setactiveNote("");
                updateNote();
              }}
              tabIndex="0"
              className="addBtn"
            >
              Update
            </button>
          </div>
          <div className={s.viewContent}>
            <h3
              onInput={() => settitleInput(title.current.innerText)}
              ref={title}
              role="textbox"
              className={s.titleView}
              contentEditable
            >
              {editnote?.title}
            </h3>
            <p
              onInput={() => settextInput(text.current.innerText)}
              ref={text}
              role="textbox"
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
    console.log("just exit");
    if (titleInput !== editnote?.title || textInput !== editnote?.text) {
      const path = `users/${
        auth.currentUser.uid
      }/notes/${editnote?.id.toString()}`;
      const docRef = doc(db, path);
      console.log("do update");
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
