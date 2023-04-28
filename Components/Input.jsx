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
    </motion.div>
  );
}
