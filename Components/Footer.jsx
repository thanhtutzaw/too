import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import useSound from "use-sound";
import s from "../styles/Home.module.css";
import { app, db } from "../utils/firebase";
import uncheckSound from "/public/disable-sound.mp3";
import checkSound from "/public/enable-sound.mp3";

export default function Footer({ active, setactive }) {
  const [loading, setloading] = useState(false);
  const [playOn] = useSound(checkSound, { volume: 0.1 });
  const [playOff] = useSound(uncheckSound, { volume: 0.1 });
  const [titleInput, settitleInput] = useState("");
  const [textInput, settextInput] = useState("");

  useEffect(() => {
    if (active === true) {
      window.location.hash = "#addNote";
    } else {
      window.location.hash = "home";
    }
    function handleEscape(e) {
      if (e.key === "Escape") {
        if (titleInput !== "" || textInput !== "") {
          window.location.hash = "#addNote";
          return;
        }
        if (titleInput === "" || textInput === "") {
          setactive(false);
          window.location.hash = "#home";
        }
      }
    }
    if (active) {
      window.addEventListener("keyup", handleEscape);
    }
    // window.onpopstate = async () => {
    //   if (window.location.hash === "#home") {
    //     setactive(false);
    //   } else if (window.location.hash === "#addNote") {
    //     setactive(true);
    //   }
    // };
    return () => window.removeEventListener("keyup", handleEscape);
  }, [active, titleInput, textInput, setactive]);
  useEffect(() => {
    active ? playOn() : playOff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  const auth = getAuth(app);

  async function handle() {
    console.log("calling handle");
    // if (active) {
    //   window.location.hash = "#addNote";
    // } else {
    //   window.location.hash = "#home";
    // }
    console.log("hey handle");
    if (titleInput !== "" || titleInput !== "") {
      setloading(true);
      try {
        await addNotes();
      } catch (error) {
        setloading(false);
        alert(`Creat Note Failed! ${error.message}`);
      }
    } else {
      setactive((prev) => !prev);
    }
  }
  // useEffect(() => {
  //   function handleEscape(e) {
  //     if (e.key !== "Escape") return;
  //     console.log("add note");
  //   }
  //   if (titleInput !== "" || titleInput !== "") {
  //     window.addEventListener("keyup", handleEscape);
  //   } else {
  //     // setactive((prev) => !prev);
  //   }
  //   return () => window.removeEventListener("keyup", handleEscape);
  // }, [textInput, titleInput]);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  useEffect(() => {
    titleRef.current.innerText = "";
    textRef.current.textContent = "";
    settitleInput("");
    settextInput("");
    if (active) {
      titleRef.current.focus();
    }
  }, [titleRef, active]);
  return (
    <div className={s.footerContainer}>
      <div className={`${s.addContainer} ${active ? s.active : ""}`}>
        <div className={s.viewHeader}>
          <div
            className="backBtn"
            style={{ pointerEvents: loading ? "none" : "initial" }}
          >
            <BiArrowBack onClick={handle} />
          </div>
          <button
            disabled={loading}
            tabIndex="0"
            className="addBtn"
            onClick={handle}
          >
            {loading ? "Saving..." : "Save"}
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
            onInput={() => settitleInput(titleRef.current.innerText)}
            ref={titleRef}
            role="input"
            style={{ outline: "none" }}
            className={s.titleView}
            contentEditable
          />
          <span
            style={{
              opacity: textInput !== "" ? "0" : ".5",
            }}
            className={s.textSpan}
          >
            Text
          </span>
          <p
            onInput={() => settextInput(textRef.current.innerText)}
            ref={textRef}
            style={{ outline: "none" }}
            className={s.textView}
            contentEditable
          />
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
        // onClick={() => !active && handle()}
        onClick={handle}
        className={`${s.addBtn} ${active ? s.active : ""}`}
      >
        <span
          // onClick={() => active && handle()}
          onClick={() => {
            // setactive(false);
            // window.location.hash = "#addNote";
          }}
          className={`${s.buttonText} ${active ? s.rotate : ""}`}
        >
          +
        </span>
      </button>
    </div>
  );

  async function addNotes() {
    const q = collection(db, `users/${auth.currentUser.uid}/notes`);
    const data = {
      title: titleInput,
      text: textInput,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await addDoc(q, data);
    window.location.reload();
  }
}
