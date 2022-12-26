import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
// import Header from "./Header";
// import Layout from "../../Components/Layout";
// import Notes from "../../Components/Notes";
// import Home from "../Home";
import styles from "../styles/Notes.module.css";
import Link from "next/link";
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

const EditNote = ({ editnote, setactiveNote }) => {
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
  return (
    <>
      {/* <p>Height {height}</p> */}
      {/* <Header /> */}
      {editnote ? (
        <>
          <div className={styles.viewContainer}>
            <div className={styles.viewHeader}>
              <div className={styles.backBtn}>
                <BiArrowBack
                  onClick={() => {
                    window.history.back();
                    setactiveNote("");
                  }}
                />
              </div>
            </div>
            <div className={styles.viewContent}>
              <h3 className={styles.titleView} contentEditable>
                {editnote.title}
              </h3>
              <p className={styles.textView} contentEditable>
                {editnote.text}
              </p>
            </div>
            {/* <motion.div className={styles.titleView} layoutId={`title-${id}`} contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
            {note.title}
          </motion.div>
          <motion.div className={styles.textView} layoutId={`title-${id}`} contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
            {note.text}
          </motion.div> */}
          </div>
        </>
      ) : null}
    </>
  );
};
// export default withAuthUser()(Note)
export default EditNote;
