import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { AppContext } from "../../context/AppContext";
import { Card } from "./Card";
import EditNote from "./EditNote";
import styles from "./Notes.module.css";
import uncheckSound from "/public/disable-sound.mp3";
import checkSound from "/public/enable-sound.mp3";

export default function Notes(props) {
  const { active, activeNote, setactiveNote, notes } = props;
  const [totalHeight, settotalHeight] = useState(0);
  const [selectMode, setselectMode] = useState(false);

  useEffect(() => {
    let elements = document.querySelectorAll("#card");

    let height;
    let totalHeight = 0;
    elements?.forEach((ele) => {
      height = getComputedStyle(ele).height;
      // settotalHeight(totalHeight += parseInt(height))
      for (let i = 0; i < elements?.length; i++) {
        let arr = [];
        //  height += height
      }
    });
    // totalHeight += parseInt(height)
    // let arr =[]
    // let newarr = arr.push(height)
    // arr.concat(newarr)

    // console.log(totalHeight);
  }, [totalHeight]);

  // if (typeof window !== "undefined") {
  //   var elem = document.querySelectorAll(".cardContainer")[0];
  //   // var elem = container.current;
  //   // var elem = document.querySelectorAll('.cardContainer')
  //   // var iso = new isotope(elem, {
  //   //     itemSelector: '#card',
  //   //     layoutMode: 'masonry'
  //   // });
  // }
  const confirmModalRef = useRef(null);
  const { setShowAction, allItems, setselectedId, selectedId, clearSelect } =
    useContext(AppContext);
  const [titleInput, settitleInput] = useState("");
  const [textInput, settextInput] = useState("");
  const [playOn] = useSound(checkSound, { volume: 0.1 });
  const [playOff] = useSound(uncheckSound, { volume: 0.1 });
  const editNote = notes?.find((note) => note.id == activeNote);
  const exitWithoutSaving =
    titleInput !== editNote?.title || textInput !== editNote?.text;
  const viewContainerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    window.onpopstate = () => {
      history.pushState(null, document.title, location.hash);
      if (!activeNote) return;
      if (exitWithoutSaving) {
        console.log("back (exit without save)");
        confirmModalRef.current?.close();
        confirmModalRef?.current.showModal();
      } else {
        console.log("back (just close)");
        setactiveNote("");
        setShowAction("");
        viewContainerRef.current.style.position = "initial";
        viewContainerRef.current.style.inset = "initial";
      }
    };
  }, [activeNote, exitWithoutSaving, setShowAction, setactiveNote]);
  useEffect(() => {
    if (!activeNote && exitWithoutSaving) {
      router.replace("/", undefined, { scroll: false });
    } else if (activeNote) {
      history.pushState(null, document.title, location.hash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNote, exitWithoutSaving, editNote]);
  useEffect(() => {
    if (!activeNote && !active) {
      confirmModalRef.current?.close();
    }
    if (activeNote) {
      setTimeout(() => {
        viewContainerRef.current.style.position = "fixed";
        viewContainerRef.current.style.inset = "0";
      }, 400);
      // }, 350);
    } else {
    }
  }, [activeNote, active]);
  useEffect(() => {
    editNote ? playOn() : playOff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editNote]);
  function selectAll() {
    const items = allItems();
    setselectedId(items);
  }
  return (
    <>
      <button
        tabIndex={-1}
        onClick={() => (selectedId.length > 1 ? clearSelect() : selectAll())}
        className={`${styles.selectAll} ${selectMode ? styles.selecting : ""}`}
      >
        <p>{selectedId.length > 1 ? "Deselect All" : "Select All"}</p>
      </button>
      <div
        className={`${styles.cardContainer} ${
          activeNote ? styles.animateNotes : ""
        }${selectMode ? styles.selecting : ""}`}
      >
        {/* <div  style={{height:`${totalHeight + 190}px`}} > */}
        {notes?.map((note, index) => (
          <Card
            selectMode={selectMode}
            setselectMode={setselectMode}
            activeNote={activeNote}
            setactiveNote={setactiveNote}
            index={index}
            key={note.id}
            {...note}
          />
        ))}
      </div>
      <EditNote
        editnote={editNote}
        textInput={textInput}
        activeNote={activeNote}
        titleInput={titleInput}
        settextInput={settextInput}
        settitleInput={settitleInput}
        setactiveNote={setactiveNote}
        confirmModalRef={confirmModalRef}
        viewContainerRef={viewContainerRef}
        exitWithoutSaving={exitWithoutSaving}
      />
    </>
  );
}
