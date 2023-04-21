import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
// import s from "../../styles/Home.module.css";
import s from "./index.module.css";
import { app, db } from "../../utils/firebase";
import AddConfirm from "./AddConfirm";
import Input from "../Notes/Input";
import ViewHeader from "../Notes/ViewHeader";
import uncheckSound from "/public/disable-sound.mp3";
import checkSound from "/public/enable-sound.mp3";

export default function AddButton({ activeNote, active, setactive }) {
  const [loading, setloading] = useState(false);
  const [playOn] = useSound(checkSound, { volume: 0.1 });
  const [playOff] = useSound(uncheckSound, { volume: 0.1 });
  const [titleInput, settitleInput] = useState("");
  const [textInput, settextInput] = useState("");
  const addConfirmRef = useRef(null);
  const exitWithoutSaving = titleInput !== "" || textInput !== "";
  useEffect(() => {
    window.onpopstate = (e) => {
      history.pushState(null, document.title, location.href);
      if (active) {
        if (exitWithoutSaving) {
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
  const exitHandle = useCallback(
    () =>
      exitWithoutSaving ? addConfirmRef.current?.showModal() : setactive(false),
    [exitWithoutSaving, setactive]
  );
  async function submitHandle() {
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
  const titleRef = useRef(null);
  const textRef = useRef(null);
  useEffect(() => {
    titleRef.current.innerText = "";
    textRef.current.innerText = "";
    settitleInput("");
    settextInput("");
    if (active) {
      setTimeout(() => {
        titleRef.current.focus();
      }, 200);
    }
  }, [titleRef, active]);
  return (
    <>
      <dialog id="confirmModal" ref={addConfirmRef}>
        <AddConfirm addConfirmRef={addConfirmRef} setactive={setactive} />
      </dialog>
      <div className={s.container}>
        <div className={`${s.InputContainer} ${active ? s.active : ""}`}>
          <ViewHeader
            loading={loading}
            exitHandle={exitHandle}
            submitHandle={submitHandle}
          >
            {loading ? "Saving" : "Save"}
          </ViewHeader>
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
          style={{ cursor: !active ? "pointer" : "default" }}
          onClick={() => {
            if (!active) {
              window.location.hash = "#addNote";
            }
            submitHandle();
          }}
          className={`${s.addBtn} ${active ? s.active : ""}`}
        >
          <span className={`${s.plusIcon} ${active ? s.rotate : ""}`}>+</span>
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
