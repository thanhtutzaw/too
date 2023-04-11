import React, { useEffect, useRef } from "react";
// import Header from "./Header";
// import Layout from "../../Components/Layout";
// import Notes from "../../Components/Notes";
// import Home from "../Home";
import s from "../styles/Notes.module.css";
// import { motion } from "framer-motion";
// import { notes } from '../../utils/data'
import { BiArrowBack } from "react-icons/bi";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../utils/firebase";
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

export default function EditNote({ editnote, setactiveNote, activeNote }) {
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
  const editRef = useRef(null);
  useEffect(() => {
    // const target = editRef.current;
    // console.log(target);
    function handleEscape(e) {
      if (e.key === "Escape") {
        // console.log("Escape");
        setactiveNote("");
        window.location.hash = "#home";
      }
    }
    if (activeNote) {
      // window.addEventListener("keyup", handleEscape);
    }
    // return () => window.removeEventListener("keyup", handleEscape);
  }, [activeNote, setactiveNote]);
  const title = useRef(null);
  useEffect(() => {
    //  title.current.innerText = "";
    //  text.current.textContent = "";
    //  settitleInput("");
    //  settextInput("");
    if (activeNote) {
      title.current.focus();
    }
  }, [activeNote]);
  return (
    <>
      {/* <p>Height {height}</p> */}
      {/* <Header /> */}
      <div
        style={{
          zIndex: "100000",
          pointerEvents: activeNote ? "auto" : "none",
          // visibility: activeNote ? "visible" : "hidden",
        }}
        className={s.edit}
      >
        <div
          // ref={editRef}
          // tabIndex="1"
          style={{
            zIndex: "100000",
            opacity: activeNote ? "1" : "0",
            visibility: activeNote ? "visible" : "hidden",
          }}
          className={`${s.viewContainer} ${activeNote ? s.animateView : ""}`}
          // layoutid={`card-${editnote.id}`}

          //  onKeyDown={(e)=>{
          //    if (e.key === "Escape") {
          //     console.log(e.key + "in edit")
          //      setactiveNote(null);
          //      window.location.hash = `#home`;
          //    }
          //  }}
          // onKeyDown={(e)=>{
          //   alert('ehy')
          // }}
        >
          <div className={s.viewHeader}>
            <div className={"backBtn"}>
              <BiArrowBack
                onClick={() => {
                  window.history.back();
                  setactiveNote("");
                }}
              />
            </div>
            <button
              onClick={() => {
                window.history.back();
                setactiveNote("");
              }}
              tabIndex="0"
              className="addBtn"
            >
              Save
            </button>
          </div>
          <div className={s.viewContent}>
            <h3
              ref={title}
              role="textbox"
              className={s.titleView}
              contentEditable
            >
              {editnote?.title}
            </h3>
            <p role="textbox" className={s.textView} contentEditable>
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
}
// export default withAuthUser()(Note)
