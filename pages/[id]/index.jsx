import { useRouter } from "next/router";
import React from "react";
import styles from "../../Components/Notes/Notes.module.css";
export default function Note() {
  const router = useRouter();
  let { id } = router.query;

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
