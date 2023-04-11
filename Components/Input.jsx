import { motion } from "framer-motion";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import s from "../styles/Notes.module.css";

export default function Input({ setOpenNew }) {
  return (
    <motion.div className={s.viewContainer}>
      <div className={s.viewHeader}>
        <div className={s.backBtn}>
          <BiArrowBack onClick={() => setOpenNew(false)} />
        </div>
      </div>
      <div className={s.viewContent}>
        <h3 role="textbox" className={s.titleView} contentEditable>
          input title
        </h3>
        <p role="textbox" className={s.textView} contentEditable>
          input text
        </p>
      </div>
      {/* <motion.div className={s.titleView} layoutId={`title-${id}`} contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
            {note.title}
          </motion.div>
          <motion.div className={s.textView} layoutId={`title-${id}`} contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
            {note.text}
          </motion.div> */}
    </motion.div>
  );
}
