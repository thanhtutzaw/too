import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { notes } from '../../utils/data'
import styles from "../../styles/Notes.module.css";
import {BiArrowBack} from 'react-icons/bi'
import Link from 'next/link';

export default function Note() {
  const [EditTitle, setEditTitle] = useState();
  const [EditText, setEditText] = useState();
  const [note, setnote] = useState([]);
  const router = useRouter()
  const { id } = router.query


  useEffect(() => {
    notes.map(note => {
      if (id == note.id) {
        setnote({ ...note })
        setEditTitle(note.title)
        setEditText(note.text)
        console.log(note)
      }

    })
  }, [id]);



  return (
    <>
      <div className={styles.viewContainer}>
        {/* <textarea className={styles.titleInput} type="text" onChange={(e) => { setEditTitle(e.target.value) }} value={EditTitle}></textarea> */}

        {/* <textarea className={styles.textInput} type="text" onChange={(e) => { setEditText(e.target.value) }} value={EditText}></textarea> */}


        {/* <div className={styles.titleLabel}>Title</div> */}
        <Link href='/' >
        <div className={styles.backBtn}>
          <BiArrowBack  />
        </div>
        </Link>

        <div contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
          {note.title}
        </div>
        <div contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
          {note.text}
        </div>

        {/* <textarea  className='textarea'   cols="30"  onChange={(e) => { setEditText(e.target.value) }} value={EditText} ></textarea> */}


      </div>
      {/* <div>{note.title}</div> */}
      {/* <div>{id}</div>
    <div>{id}</div> */}
    </>
  )
}

