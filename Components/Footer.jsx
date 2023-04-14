import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import useSound from "use-sound";
import s from "../styles/Home.module.css";
import { app, db } from "../utils/firebase";
import uncheckSound from "/public/disable-sound.mp3";
import checkSound from "/public/enable-sound.mp3";

export default function Footer({ user }) {
  const [active, setactive] = useState(false);
  const [playOn] = useSound(checkSound, { volume: 0.1 });
  const [playOff] = useSound(uncheckSound, { volume: 0.1 });
  useEffect(() => {
    if (active == true) {
      window.location.hash = "#addNote";
    } else {
      window.location.hash = "home";
    }
    function handleEscape(e) {
      if (e.key === "Escape") {
        setactive(false);
        window.location.hash = "#home";
      }
    }
    if (active) {
      window.addEventListener("keyup", handleEscape);
    }
    window.onpopstate = async () => {
      if (window.location.hash === "#home") {
        setactive(false);
      } else if (window.location.hash === "#addNote") {
        setactive(true);
      }
    };
    active ? playOn() : playOff();
    return () => window.removeEventListener("keyup", handleEscape);
  }, [active]);
  const auth = getAuth(app);

  async function handle() {
    setactive((prev) => !prev);
    await addNotes();
  }
  const title = useRef(null);
  const text = useRef(null);
  const [titleInput, settitleInput] = useState("");
  const [textInput, settextInput] = useState("");
  useEffect(() => {
    title.current.innerText = "";
    text.current.textContent = "";
    settitleInput("");
    settextInput("");
    if (active) {
      title.current.focus();
    }
  }, [title, active]);
  return (
    <div className={s.footerContainer}>
      <div className={`${s.addContainer} ${active ? s.active : ""}`}>
        <div className={s.viewHeader}>
          <div className="backBtn">
            <BiArrowBack onClick={handle} />
          </div>
          <button tabIndex="0" className="addBtn" onClick={handle}>
            Save
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
            className={s.titleView}
            contentEditable
          ></h3>
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
            style={{ outline: "none" }}
            className={s.textView}
            contentEditable
          >
            {/* {" "} */}
          </p>
        </div>
        {/* <motion.div className={styles.titleView} layoutId={`title-${id}`} contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
            {note.title}
          </motion.div>
          <motion.div className={styles.textView} layoutId={`title-${id}`} contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
            {note.text}
          </motion.div> */}
      </div>
      <button
        onKeyDown={(e) => active && e.key === "Escape" && handle}
        style={{ cursor: !active ? "pointer" : "default" }}
        onClick={() => !active && handle()}
        className={`${s.addBtn} ${active ? s.active : ""}`}
      >
        <span
          onClick={() => active && handle()}
          className={`${s.buttonText} ${active ? s.rotate : ""}`}
        >
          +
        </span>
      </button>
    </div>
  );

  async function addNotes() {
    if (titleInput !== "" || titleInput !== "") {
      const q = collection(db, `users/${auth.currentUser.uid}/notes`);
      await addDoc(q, {
        // title:"titleInput",
        // text:"textInput",
        title: titleInput,
        text: textInput,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      window.location.reload();
    }
  }
}
