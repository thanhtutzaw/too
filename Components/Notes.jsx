import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiCheck, BiDotsVerticalRounded } from "react-icons/bi";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import styles from "../styles/Notes.module.css";
import EditNote from "./EditNote";
import NoteAction from "./NoteAction";
import { AppContext } from "../context/AppContext";

function Card({
  // selectedId,
  // setselectedId,
  selectMode,
  setselectMode,
  // showAction,
  // setShowAction,
  id,
  title,
  text,
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
  //     // console.log("hey")

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
  const { selectedId, setselectedId, showAction, setShowAction } =
    useContext(AppContext);

  function chooseSelectMode(e) {
    e.stopPropagation();
    console.log("called this ");
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
    function handleEscape() {
      setselectedId([]);
      setselectMode(false);
      setSelect(false);
    }
    window.addEventListener("keyup", handleEscape);
    return () => window.removeEventListener("keyup", handleEscape);
  }, [selectedId, setselectMode, setselectedId]);
  return (
    <>
      {/* {selectedId.length} */}
      <Link href={selectMode ? `/#home` : `/#Note/${id}`}>
        {/* <Link href={`/#home`}> */}
        <div
          role="button"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setactiveNote(id);
              if (activeNote === id) {
                setactiveNote(null);
              }
              e.currentTarget.click();
            }
            if (!activeNote && e.key !== "Escape") return;
            e.preventDefault();
            setactiveNote(null);
            window.location.hash = `#home`;
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (!selectMode) {
              setactiveNote(id);
              if (activeNote !== id) return;
              setactiveNote(null);
            } else {
              if (select) {
                checkRef.current?.click();
                // setselectedId([...selectedId, id]);
              } else {
                uncheckRef.current?.click();
                // setselectedId([...selectedId, id]);
              }
            }
          }}
          style={{
            outline: select ? "1px solid rgb(97, 245, 97)" : "",
          }}
          className={cardActive}
        >
          {showAction === id && (
            <NoteAction
              setactiveNote={setactiveNote}
              chooseSelectMode={chooseSelectMode}
              setselectMode={setselectMode}
              setselectedId={setselectedId}
              // showAction={showAction}
              // setShowAction={setShowAction}
            />
          )}
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
                      // setselectedId(id)
                      setSelect(!select);
                      setselectedId(selectedId.filter((t) => t !== id));
                      // setselectedId(selectedId.map((t) => t !== id));
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
          <p style={{ filter: showAction === id ? "blur(2px)" : "" }}>{text}</p>
        </div>
      </Link>
    </>
  );
}
export default function Notes(props) {
  const { notes, isSearching } = props;

  const [totalHeight, settotalHeight] = useState(0);

  const [activeNote, setactiveNote] = useState();
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
    // console.log(arr)

    console.log(totalHeight);
  }, [totalHeight]);

  // // return elements
  // // const container = useRef(null);
  // if (typeof window !== "undefined") {
  //   var elem = document.querySelectorAll(".cardContainer")[0];
  //   // console.log(elem);
  //   // var elem = container.current;

  //   // var elem = document.querySelectorAll('.cardContainer')
  //   // var iso = new isotope(elem, {
  //   //     itemSelector: '#card',
  //   //     layoutMode: 'masonry'
  //   // });
  // }
  const editNote = notes?.find((note) => note.id == activeNote);
  const [titleInput, settitleInput] = useState("");
  const [textInput, settextInput] = useState("");
  const confirmModalRef = useRef(null);
  const exitWithoutSaving =
    titleInput !== editNote?.title || textInput !== editNote?.text;
  const { setShowAction } = useContext(AppContext);
  useEffect(() => {
    if (!activeNote) {
      window.location.hash = "home";
      confirmModalRef.current?.close();
    }

    window.onpopstate = () => {
      if (exitWithoutSaving) {
        if (editNote) {
          window.location.hash = `#Note/${editNote?.id}`;
        } else {
          window.location.hash = `home`;
        }
        confirmModalRef.current?.close();
        confirmModalRef?.current.showModal();
        // window.location.hash = `home`;
      } else {
        window.location.hash = `home`;
        setactiveNote("");
        setShowAction("");
      }
    };
    // console.log(exitWithoutSaving);
    // if (exitWithoutSaving) {
    //   // confirmModalRef.current.showModal();
    // } else {
    //   console.log("back key in Notes.jsx");
    //   // confirmModalRef.current.close();
    //   setactiveNote(null);
    //   setactiveNote("");
    // }
  }, [editNote, activeNote, exitWithoutSaving, setactiveNote, setShowAction]);

  return (
    <>
      <div
        // onClick={(e) => {
        // const target = e.currentTarget.dataset.id = editNote;
        // if (e.currentTarget && target) {
        //     // target.style.border = "3px solid red"
        //     console.log(target)
        // }
        // console.log(e.currentTarget.dataset.id = editNote)
        // }}
        // ref={container}

        // style={{ pointerEvents: isSearching ? "none" : "auto" }}
        className={`${styles.cardContainer} ${
          activeNote ? styles.animateNotes : ""
        }`}
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
        {/* {showAction && <NoteAction setShowAction={setShowAction} />} */}
        {/* </div> */}

        {/* <EditNote activeNote={activeNote} setactiveNote={setactiveNote} editnote={editNote} /> */}

        {/* {editNote && (
                <div>
                    <p>{editNote.title}</p>
                    <p>{editNote.text}</p>
                </div>
            )} */}
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
        exitWithoutSaving={exitWithoutSaving}
      />

      {
        // <motion.div
        //     layoutid={`card-${editNote.id}`}
        //     id="card" className={styles.viewContent}>
        //     {/* <a id="card" style={{ width: width + 'px', transform: `translate(${width + 16 * index / index}px,${width + 16 * index}px)` }} key={id} className={styles.card}> */}
        //     <motion.div layoutid={`title-${editNote.id}`} className={styles.titleView}>
        //         {editNote.title}
        //     </motion.div>
        //     <motion.div layoutid={`text-${editNote.id}`} className={styles.textView}>
        //         <p>{editNote.text}</p>
        //     </motion.div>
        // </motion.div>
      }
    </>
  );
}
