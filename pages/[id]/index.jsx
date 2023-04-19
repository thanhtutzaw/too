import { withAuthUserTokenSSR } from "next-firebase-auth";
import { useRouter } from "next/router";
import React from "react";
import { db } from "../../utils/firebase";
import styles from "../../Components/Notes/Notes.module.css";
import { collection, getDocs } from "firebase/firestore";
// import { notes } from '../../utils/data'
// export const getStaticPaths =async () => {
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

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser }) => {
    let notes = null;
    const id = AuthUser.id;
    const q = collection(db, `users/${id}/notes`);
    const docSnap = await getDocs(q);

    notes = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      props: {
        notes,
      },
    };
  }
);

export default function Note({ notes }) {
  const router = useRouter();
  let { id } = router.query;
  const note = notes.find((note) => note.id == id);

  let height;
  if (typeof window !== "undefined") {
    height = window.innerHeight;
    if (height > 673) {
      height = 57 + " extra px need (full screen)";
    }
  }
  return (
    <>
      {/* <p>Height {height}</p> */}
      {/* <Header /> */}
      {id ? (
        <>
          <div className={styles.viewContainer}>
            {/* <div  className={styles.viewHeader}>
              <div className={styles.backBtn}><BiArrowBack onClick={() => window.history.back()} /></div>
            </div>
            <div className={styles.viewContent}>
              <h3 className={styles.titleView} contentEditable >{note.title}</h3>
            <p className={styles.textView} contentEditable>{note.text}</p>
            </div> */}

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
}
// export default withAuthUser()(Note)
