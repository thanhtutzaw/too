import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Card } from "./Card";
import EditNote from "./EditNote";
import styles from "./Notes.module.css";

export default function Notes(props) {
  const { active, notes, isSearching } = props;
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

    console.log(totalHeight);
  }, [totalHeight]);

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
  const confirmModalRef = useRef(null);
  const { setShowAction } = useContext(AppContext);
  const [titleInput, settitleInput] = useState("");
  const [textInput, settextInput] = useState("");
  const editNote = notes?.find((note) => note.id == activeNote);
  const exitWithoutSaving =
    titleInput !== editNote?.title || textInput !== editNote?.text;
  useEffect(() => {
    window.onpopstate = () => {
      history.pushState(null, document.title, location.hash);

      if (activeNote) {
        if (exitWithoutSaving) {
          // alert("edit can't leave");
          // if (editNote) {
          //   // window.location.hash = `#Note/${editNote?.id}`;
          // } else {
          //   // window.location.hash = "home";
          // }
          if (editNote) {
            window.location.hash = `#Note/${editNote?.id}`;
          }
          confirmModalRef.current?.close();
          confirmModalRef?.current.showModal();
        } else {
          // alert("edit can leave");
          // window.location.hash = "home";
          setactiveNote("");
          setShowAction("");
        }
      }
    };
  }, [editNote, activeNote, exitWithoutSaving, setShowAction]);
  useEffect(() => {
    if (!activeNote && !active) {
      window.location.hash = "home";
      // console.log("changed to home");
      confirmModalRef.current?.close();
    }
  }, [activeNote, active]);
  return (
    <>
      <div
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