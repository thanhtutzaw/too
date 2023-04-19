import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import s from "../styles/Home.module.css";
import { app, db } from "../utils/firebase";
import AddConfirm from "./AddConfirm";
import Input from "./Notes/Input";
import ViewHeader from "./Notes/ViewHeader";
import uncheckSound from "/public/disable-sound.mp3";
import checkSound from "/public/enable-sound.mp3";

export default function Footer({ activeNote, active, setactive }) {
  const [loading, setloading] = useState(false);
  const [playOn] = useSound(checkSound, { volume: 0.1 });
  const [playOff] = useSound(uncheckSound, { volume: 0.1 });
  const [titleInput, settitleInput] = useState("");
  const [textInput, settextInput] = useState("");
  const addConfirmRef = useRef(null);
  const exitWithoutSaving = titleInput !== "" || textInput !== "";
  useEffect(() => {
    // function handleEscape(e) {
    //   if (e.key === "Escape") {
    //     if (titleInput !== "" || textInput !== "") {
    //       window.location.hash = "#addNote";
    //       return;
    //     }
    //     if (titleInput === "" || textInput === "") {
    //       setactive(false);
    //       window.location.hash = "#home";
    //     }
    //   }
    // }
    // if (active) {
    //   window.addEventListener("keyup", handleEscape);
    // }
    window.onpopstate = async () => {
      // if ((active && titleInput !== "") || textInput !== "") {
      //   window.location.hash = "#home";
      // } else {
      //   window.location.hash = "#addNote";
      // }
      // if (titleInput !== "" || (textInput !== "" && active)) {
      // } else if (titleInput === "" || (textInput === "" && active)) {
      //   setactive(false);
      // }
      // if (
      //   titleInput !== "" ||
      //   (textInput !== "" && window.location.hash === "#home")
      // ) {
      // } else if (window.location.hash === "#addNote") {
      //   setactive(true);
      // }
      // if (
      //   (titleInput === "" || textInput === "") &&
      //   window.location.hash === "#home"
      // ) {
      //   setactive(false);
      // }
      // if (active === true && (titleInput === "" || textInput === "")) {
      //   setactive(false);
      // } else if ((active && titleInput !== "") || textInput !== "") {
      //   // addConfirmRef.current.showModal();
      // }
    };
    // return () => window.removeEventListener("keyup", handleEscape);
  }, [active]);

  useEffect(() => {
    window.onpopstate = (e) => {
      history.pushState(null, document.title, location.href);
      if (active) {
        if (exitWithoutSaving) {
          // window.location.hash = "#addNote";
          // addConfirmRef.current.close();
          addConfirmRef.current.showModal();
          setactive(true);
        } else {
          setactive(false);
        }
      }
    };
  }, [active, exitWithoutSaving, setactive]);
  useEffect(() => {
    active ? playOn() : playOff();
    if (!active) {
      addConfirmRef.current.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  const auth = getAuth(app);

  async function handle() {
    // if (titleInput !== "" || titleInput !== "") {
    if (exitWithoutSaving) {
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
  // const exitHandle = useCallback(
  //   () =>
  //     exitWithoutSaving ? addConfirmRef.current?.showModal() : setactive(false),
  //   [exitWithoutSaving, setactive]
  // );
  // const closeEdit = useCallback(() => {
  //   setactive(false);
  //   window.location.hash = "#home";
  // }, [setactive]);
  // const exitHandle = useCallback(
  //   () =>
  //     exitWithoutSaving ? addConfirmRef.current?.showModal() : closeEdit(),
  //   [closeEdit, addConfirmRef, exitWithoutSaving]
  // );

  useEffect(() => {
    function handleEscape(e) {
      if (e.key !== "Escape") return;
      if (active) {
        console.log("%cEscape (add)", "color:green");
        if (exitWithoutSaving) {
          addConfirmRef.current?.showModal();
        } else {
          setactive(false);
        }
      }
      // if (exitWithoutSaving) {
      //   window.location.hash = "#addNote";

      //   // history.pushState(null, document.title, location.href);
      //   addConfirmRef.current?.close();
      //   addConfirmRef.current?.showModal();
      //   setactive(true);
      // } else {
      //   setactive(false);
      // }
    }

    window.addEventListener("keyup", handleEscape);

    return () => window.removeEventListener("keyup", handleEscape);
  }, [active, exitWithoutSaving, setactive]);
  useEffect(() => {
    if (!activeNote && !active) {
      window.location.hash = "home";
      addConfirmRef.current?.close();
    }
  }, [activeNote, active]);
  // useEffect(() => {
  //   function handleEscape(e) {
  //     if (e.key !== "Escape") return;
  //     // history.pushState(null, document.title, location.hash);
  //     if (active) {
  //       if (exitWithoutSaving && e.key === "Escape") {
  //         window.location.hash = `#addNote`;
  //         // addConfirmRef.current.showModal();
  //         addConfirmRef.current.close();
  //         addConfirmRef.current.showModal();
  //       } else if (!exitWithoutSaving && e.key === "Escape") {
  //         setactive(false);
  //       }
  //     }
  //     // exitHandle();
  //   }
  //   window.addEventListener("keyup", handleEscape);
  //   return () => window.removeEventListener("keyup", handleEscape);
  // }, [active, exitWithoutSaving, setactive]);
  // useEffect(() => {
  //   function handleEscape(e) {
  //     if (e.key !== "Escape") return;
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
    textRef.current.innerText = "";
    settitleInput("");
    settextInput("");
    if (active) {
      titleRef.current.focus();
    }
  }, [titleRef, active]);
  return (
    <>
      <dialog id="confirmModal" ref={addConfirmRef}>
        <AddConfirm addConfirmRef={addConfirmRef} setactive={setactive} />
      </dialog>
      <div className={s.footerContainer}>
        <div className={`${s.addContainer} ${active ? s.active : ""}`}>
          <ViewHeader
            loading={loading}
            exitHandle={handle}
            submitHandle={handle}
          />
          <Input
            titleInput={titleInput}
            settitleInput={settitleInput}
            titleRef={titleRef}
            textInput={textInput}
            settextInput={settextInput}
            textRef={textRef}
          />
        </div>
        <button
          // onKeyDown={(e) => active && e.key === "Escape" && handle}
          style={{ cursor: !active ? "pointer" : "default" }}
          onClick={() => {
            if (!active) {
              window.location.hash = "#addNote";
            }
            handle();
          }}
          className={`${s.addBtn} ${active ? s.active : ""}`}
        >
          <span className={`${s.buttonText} ${active ? s.rotate : ""}`}>+</span>
        </button>
      </div>
    </>
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
