import { Timestamp } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiCheck, BiDotsVerticalRounded } from "react-icons/bi";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { AppContext } from "../../context/AppContext";
import useEscape from "../../hooks/useEscape";
import { Highlight } from "./Highlight";
import NoteAction from "./NoteAction";
import styles from "./Notes.module.css";

export function Card({
  selectMode,
  setselectMode,
  id,
  title,
  text,
  createdAt,
  setactiveNote,
  activeNote,
}) {
  // function getStyle(elem) {
  //     if (typeof window !== 'undefined') {
  //         var style = getComputedStyle(elem);
  //         if (!style) {
  //             logError('Style returned ' + style +
  //                 '. Are you running this code in a hidden iframe on Firefox? ' +
  //                 'See https://bit.ly/getsizebug1');
  //         }
  //         return style;
  //     }
  // }
  // let elements
  // if (typeof window !== 'undefined') {
  //     elements = document.querySelectorAll('#card')
  //     var elem = document.querySelectorAll('.cardContainer')
  //     // var iso = new Isotope(elem, {
  //     //     // options
  //     //     itemSelector: '.card',
  //     //     layoutMode: 'masonry'
  //     // });
  // }
  // elements?.forEach((ele) => {
  //     const style = getStyle(ele);
  //     // ele.style.color = 'red !important'
  //     // console.log(style.width)
  //     // ele.style.color = 'red'
  // })
  // let width = 150

  const [select, setSelect] = useState(false);
  const {
    notes,
    Search,
    selectedId,
    setselectedId,
    showAction,
    setShowAction,
  } = useContext(AppContext);

  function chooseSelectMode(e) {
    e.stopPropagation();
    setselectMode(true);
    setselectedId([...selectedId, showAction]);
    setSelect(true);
    setShowAction("");
  }
  const checkRef = useRef(null);
  const uncheckRef = useRef(null);
  useEffect(() => {
    if (selectedId?.length === 0) {
      setselectMode(false);
      setSelect(false);
    }
    // if (selectedId === id) {
    //   setSelect(true);
    // }
  }, [selectedId?.length, setselectMode]);
  // useEffect(() => {
  //   if (selectedId === id) {
  //     setSelect(true);
  //   }
  // }, [id, selectedId]);
  useEscape(() => {
    if (!selectMode) return;
    setSelect(false);
    setselectedId([]);
    setselectMode(false);
  });
  const date = new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate();
  const dateString = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const isSelecting = select && selectedId.length !== 0;
  useEffect(() => {
    if (selectedId.length === 0) {
      setSelect(false);
    }
    if (selectedId.length === notes.length) {
      setSelect(true);
    }
  }, [notes.length, selectedId]);
  function handleSelect(e) {
    e.stopPropagation();
    setSelect((prev) => !prev);
    if (isSelecting) {
      if (selectedId.length === 1) {
        setselectMode(false);
      }
      setselectedId(selectedId.filter((t) => t !== id));
    } else {
      setselectedId([...selectedId, id]);
    }
  }
  // const todoClass = `todo ${todo?.completed ? "checked" : ""} `;
  const cardActive = `${styles.card} ${
    activeNote === id ? styles.active : ""
  }  ${select ? styles.selected : ""} ${
    activeNote === id ? styles.positioned : ""
  }`;
  return (
    <>
      <div
        aria-label={title}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setactiveNote(id);
            if (activeNote === id) {
              setactiveNote(null);
            }
            e.currentTarget.click();
          }
          if (e.key !== "Escape") return;
          e.preventDefault();
          setactiveNote(null);
        }}
        onClick={(e) => {
          !selectMode && (window.location.hash = `#Note/${id}`);
          e.stopPropagation();
          if (!selectMode) {
            setactiveNote(id);
            if (activeNote !== id) return;
            setactiveNote(null);
          } else {
            select ? checkRef.current?.click() : uncheckRef.current?.click();
          }
        }}
        style={
          {
            // outline: select ? "2px solid var(--bright-green)" : "0",
            // borderRadius: select ? "141px 10% 25% 10px" : "13px",
            // outline: select
            //   ? "2px solid var(--bright-green)"
            //   : "1px solid var(--card-border)",
            // borderRadius: select ? "141px 10% 25% 10px" : "13px",
            // borderRadius: select ? "141px" : "3px",
          }
        }
        className={cardActive}
      >
        <AnimatePresence>
          {showAction === id && (
            <NoteAction
              setactiveNote={setactiveNote}
              chooseSelectMode={chooseSelectMode}
              setselectMode={setselectMode}
              setselectedId={setselectedId}
            />
          )}
        </AnimatePresence>
        {/* <a id="card" style={{ width: width + 'px', transform: `translate(${width + 16 * index / index}px,${width + 16 * index}px)` }} key={id} className={styles.card}> */}
        <div
          style={{ filter: showAction === id ? "blur(2px)" : "unset" }}
          className={styles.header}
        >
          <div className={styles.cardTitle}>
            <Highlight highlight={title} query={Search} />
          </div>
          {!selectMode ? (
            <button
              tabIndex={-1}
              aria-expanded={showAction !== ""}
              aria-label="note dropdown options"
              onClick={(e) => {
                e.stopPropagation();
                setShowAction(id);
              }}
              className={styles.dot}
            >
              <BiDotsVerticalRounded />
            </button>
          ) : (
            <>
              {isSelecting ? (
                <button
                  aria-label="select note"
                  ref={checkRef}
                  role="checkbox"
                  tabIndex={-1}
                  aria-checked={true}
                  onClick={handleSelect}
                  className={styles.check}
                >
                  <BiCheck />
                </button>
              ) : (
                <button
                  aria-label="deselect note"
                  ref={uncheckRef}
                  role="checkbox"
                  tabIndex={-1}
                  aria-checked={false}
                  onClick={handleSelect}
                  className={styles.uncheck}
                >
                  <RiCheckboxBlankCircleLine />
                </button>
              )}
            </>
          )}
        </div>
        <p style={{ filter: showAction === id ? "blur(2px)" : "unset" }}>
          <Highlight highlight={text} query={Search} />
        </p>
        <p
          className={styles.date}
          style={{ filter: showAction === id ? "blur(2px)" : "unset" }}
        >
          {dateString}
        </p>
      </div>
    </>
  );
}
