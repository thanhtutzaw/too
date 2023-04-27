import { AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiCheck, BiDotsVerticalRounded } from "react-icons/bi";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { AppContext } from "../../context/AppContext";
import NoteAction from "./NoteAction";
import styles from "./Notes.module.css";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";

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
  const cardActive = `${styles.card} ${
    activeNote === id ? styles.active : ""
  } ${activeNote === id ? styles.positioned : ""}`;
  const [select, setSelect] = useState(false);
  const { Search, selectedId, setselectedId, showAction, setShowAction } =
    useContext(AppContext);

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
    if (selectedId.length === 0) {
      setselectMode(false);
      setSelect(false);
    }
    function handleEscape(e) {
      if (!(e.key === "Escape" && selectMode)) return;
      setselectedId([]);
      setselectMode(false);
      setSelect(false);
    }
    window.addEventListener("keyup", handleEscape);
    return () => window.removeEventListener("keyup", handleEscape);
  }, [selectMode, selectedId, setselectMode, setselectedId]);
  const date = new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate();
  const dateString = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const router = useRouter();
  const index = text.toLowerCase().indexOf(Search?.toLowerCase());
  // if (index === -1) {
  //   return <div></div>;
  // }
  const searchIndex = text.toLowerCase().indexOf(Search?.toLowerCase());
  const before = text.slice(0, searchIndex);
  const match = text.slice(searchIndex, searchIndex + Search?.length);
  const after = text.slice(searchIndex + Search?.length);
  // if (index !== -1) return;

  return (
    <>
      <div
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
          //   router.replace("/", undefined, {
          //       scroll: false,
          //     })
          e.stopPropagation();
          if (!selectMode) {
            setactiveNote(id);
            if (activeNote !== id) return;
            setactiveNote(null);
          } else {
            select ? checkRef.current?.click() : uncheckRef.current?.click();
          }
        }}
        style={{
          outline: select ? "1px solid var(--bright-green)" : "",
        }}
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
          style={{ filter: showAction === id ? "blur(2px)" : "" }}
          className={styles.header}
        >
          <div className={styles.cardTitle}>{title}</div>
          {!selectMode ? (
            <button
              tabIndex={-1}
              aria-expanded={showAction}
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
              {select ? (
                <button
                  ref={checkRef}
                  role="checkbox"
                  tabIndex={-1}
                  aria-checked={true}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelect(!select);
                    setselectedId(selectedId.filter((t) => t !== id));
                    if (selectedId.length === 1) {
                      setselectMode(false);
                    }
                  }}
                  className={styles.check}
                >
                  <BiCheck />
                </button>
              ) : (
                <button
                  ref={uncheckRef}
                  role="checkbox"
                  tabIndex={-1}
                  aria-checked={false}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelect(!select);
                    setselectedId([...selectedId, id]);
                  }}
                  className={styles.uncheck}
                >
                  <RiCheckboxBlankCircleLine />
                </button>
              )}
            </>
          )}
        </div>
        <p style={{ filter: showAction === id ? "blur(2px)" : "unset" }}>
          {/* {text?.split(Search)} */}
          {/* {text?.split(Search)} */}
          {/* {text.substring(Search?.length )} */}

          {/* {text.substring(0, Search?.length - text.length)}
          {text.toLowerCase().includes(Search) && <mark>{Search}</mark>}
          {text?.split(Search)} */}

          {index !== -1 ? (
            <>
              {before}
              <mark>{match}</mark>
              {after}
            </>
          ) : (
            text
          )}
        </p>

        <p
          className={styles.date}
          style={{ filter: showAction === id ? "blur(2px)" : "unset" }}
        >
          {dateString}
        </p>
        {/* <span style={{ color: "rgb(8, 166, 60)" }}>{dateString}</span> */}
      </div>
    </>
  );
}
