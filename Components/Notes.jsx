import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Notes.module.css";
import Link from "next/link";
// import firebase from 'firebase/compat/app';
// import { useAuthUser } from "next-firebase-auth";
import EditNote from "./EditNote";
// import isotope from 'isotope-layout';

function Card({ id, title, text, index, setactiveNote, activeNote }) {
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
  //     // console.log(elem)
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

  function handleStyle(e) {
    // console.log(e.currentTarget)
    //   e.currentTarget.style.color = "red !important";
  }
  // const [animate, setanimate] = useState(false);

  return (
    <>
      <Link href={`/#Note/${id}`}>
        <div
          role="button"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              // e.stopPropagation();
              // e.preventDefault();
              setactiveNote(id);
              if (activeNote === id) {
                setactiveNote(null);
              }
              e.currentTarget.click();
              // window.location.hash = `#Note/${id}`;
            }
            if (activeNote && e.key === "Escape") {
              console.log("I am escape key");
              e.preventDefault();
              setactiveNote(null);
              window.location.hash = `#home`;
            }
          }}
          // layoutid={`card-${id}`}
          // style={{ zIndex: activeNote === id ? '2' : '0', transform: activeNote === id ? 'translate(0%,0%) scale(1)' : 'none' }}
          // data-id={id}
          // onKeyDown={(e) => {if (e.key === 'Escape') { setactiveNote(prev => !prev) } }}
          // onKeyDown={(e) => {
          //     // if(e.key === "Escape"){
          //     //   setactiveNote(null)
          //     // }
          // }}
          onClick={(e) => {
            e.stopPropagation();
            //   handleStyle(e);
            // if(activeNote){
            //     e.currentTarget.style.transform = 'translate(-54%, -50%) scale(2.2)'
            // }
            setactiveNote(id);
            if (activeNote === id) {
              setactiveNote(null);
            }
            // if (activeNote || window.location.hash === activeNote) {
            // setactiveNote(null);
            // window.location.hash = "#home"
            // }
            // e.currentTarget.style.transform = "translate(-54%, -50%) scale(2.2)";
          }}
          // id="card"
          // key={id}
          className={`${styles.card} ${
            activeNote === id ? styles.active : ""
          } ${activeNote === id ? styles.positioned : ""}`}
        >
          {/* <a id="card" style={{ width: width + 'px', transform: `translate(${width + 16 * index / index}px,${width + 16 * index}px)` }} key={id} className={styles.card}> */}
          <div
            //   layoutid={`title-${id}`}
            className={styles.cardTitle}
          >
            {/* <div
            //   layoutid={`title-${id}`}
            className={styles.cardTitle}
            contentEditable={activeNote === id ? true : false}
          > */}
            {title}
          </div>

          <div
            // layoutid={`text-${id}`}
            className={styles.cardText}
          >
            <p>{text}</p>
            {/* <p contentEditable={activeNote ? true : false}>{text}</p> */}
          </div>
        </div>
      </Link>

      {/* {editNote && (
                  <div>
                      <p>{title}</p>
                      <p>{text}</p>
                  </div>
              )} */}
    </>
  );
}
export default function Notes(props) {
  const { activeNote, setactiveNote, notes, isSearching } = props;
  const [totalHeight, settotalHeight] = useState(0);
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
  useEffect(() => {
    // if (!activeNote && !exitWithoutSaving) {
    if (!activeNote) {
      window.location.hash = "home";
      confirmModalRef.current?.close();
    }

    window.onpopstate = () => {
      // setactiveNote("");
      if (exitWithoutSaving) {
        if (editNote) {
          window.location.hash = `#Note/${editNote?.id}`;
        } else {
          window.location.hash = `home`;
        }
        confirmModalRef.current?.close();
        confirmModalRef?.current?.showModal();
        // window.location.hash = `home`;
      } else {
        window.location.hash = `home`;
        setactiveNote("");

        // window.location.hash = "home";
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
  }, [editNote, activeNote, exitWithoutSaving]);
  return (
    <>
      <div
        // onClick={(e) => {
        // e.stopPropagation()
        // const target = e.currentTarget.dataset.id = editNote;
        // if (e.currentTarget && target) {
        //     // target.style.border = "3px solid red"
        //     console.log(target)
        // }
        // e.stopPropagation()
        // e.preventDefault()
        // console.log(e.currentTarget.dataset.id = editNote)
        // console.log(target)
        // }}
        // ref={container}

        // style={{ pointerEvents: isSearching ? "none" : "auto" }}
        className={`${styles.cardContainer} ${
          activeNote ? styles.animateNotes : ""
        }`}
      >
        {/* <div> */}
        {/* <div  style={{height:`${totalHeight + 190}px`}} > */}
        {notes?.map((note, index) => (
          <Card
            activeNote={activeNote}
            setactiveNote={setactiveNote}
            index={index}
            key={note.id}
            {...note}
          />
        ))}
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
        confirmModalRef={confirmModalRef}
        exitWithoutSaving={exitWithoutSaving}
        titleInput={titleInput}
        settitleInput={settitleInput}
        textInput={textInput}
        settextInput={settextInput}
        activeNote={activeNote}
        setactiveNote={setactiveNote}
        editnote={editNote}
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
