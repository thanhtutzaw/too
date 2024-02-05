import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useSound from "use-sound";
import useEscape from "../../hooks/useEscape";
import ViewHeader from "../Header/ViewHeader";
import Input from "../Input";
import AddConfirm from "./AddConfirm";
import { addNote } from "./addNote";
import s from "./index.module.css";
import uncheckSound from "/public/disable-sound.mp3";
import checkSound from "/public/enable-sound.mp3";
import { AppContext } from "../../context/AppContext";
import app from "../../utils/firebase";

export default function AddButton() {
  const [loading, setloading] = useState(false);
  const [playOn] = useSound(checkSound, { volume: 0.1 });
  const [playOff] = useSound(uncheckSound, { volume: 0.1 });
  const [titleInput, settitleInput] = useState("");
  const [textInput, settextInput] = useState("");
  const addConfirmRef = useRef(null);
  const exitWithoutSaving = titleInput !== "" || textInput !== "";
  const { activeNote, active, setactive } = useContext(AppContext);
  useEffect(() => {
    window.onpopstate = () => {
      history.pushState(null, document.title, location.href);
      if (!active) return;
      exitWithoutSaving ? addConfirmRef.current.showModal() : setactive(false);
    };
    if (!active && !exitWithoutSaving) {
      router.replace("/", undefined, { scroll: false });
    } else if (active) {
      history.pushState(null, document.title, location.hash);
    }
    if (!active) {
      addConfirmRef.current?.close();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, exitWithoutSaving, setactive]);
  useEscape(() => {
    if (!active) return;
    exitWithoutSaving ? addConfirmRef.current?.showModal() : setactive(false);
    console.log("%cEscape (add)", "color:green");
  });
  useEffect(() => {
    active ? playOn() : playOff();
    if (!active) {
      router.prefetch("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  const auth = getAuth(app);
  const exitHandle = useCallback(
    () =>
      exitWithoutSaving ? addConfirmRef.current?.showModal() : setactive(false),
    [exitWithoutSaving, setactive]
  );
  const router = useRouter();

  async function addHandle() {
    if (exitWithoutSaving) {
      setloading(true);
      try {
        await addNote(auth, titleInput, textInput);
        setactive(false);
        setloading(false);
        document.body.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        setloading(false);
        alert(`Creat Note Failed! ${error.message}`);
      } finally {
        console.log("finally");
        router.replace(router.asPath);
      }
    } else {
      setactive((prev) => !prev);
    }
  }
  useEffect(() => {
    if (!(activeNote || active)) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [active, activeNote]);
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
      }, 500);
      // }, 1150);
    }
  }, [active, titleRef]);
  const container = `${s.container} ${loading ? s.loading : ""}`;
  const InputContainer = `${s.InputContainer} ${active ? s.active : ""} ${
    loading ? s.loading : ""
  }`;
  const addBtn = `${s.addBtn} ${active ? s.active : ""}`;
  return (
    <>
      <dialog id="confirmModal" ref={addConfirmRef}>
        <AddConfirm addConfirmRef={addConfirmRef} setactive={setactive} />
      </dialog>
      <div className={container}>
        <div className={InputContainer}>
          <ViewHeader
            loading={loading}
            exitHandle={exitHandle}
            submitHandle={addHandle}
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
          onClick={() => {
            if (active) return;
            window.location.hash = "#addNote";
            setactive(true);
          }}
          className={addBtn}
        >
          <span className={`${s.plusIcon} ${active ? s.rotate : ""}`}>+</span>
        </button>
      </div>
    </>
  );
}
