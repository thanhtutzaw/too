import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { notes } from '../../utils/data'
import styles from "../../styles/Notes.module.css";
import { BiArrowBack } from 'react-icons/bi'
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export default function Note2() {
  // if(id){
  // console.log(id)

  // }
  // else{
  //   console.log('null')
  // }
  const [EditTitle, setEditTitle] = useState();
  const [EditText, setEditText] = useState();
  const [note, setnote] = useState([]);
  // const { title, text } = notes.find(note => id == note.id);
  // const { title, text} = notes.find( note => note.id == id)
 const router = useRouter()
  let { id } = router.query
  id = parseInt(id)
  // console.log(typeof(id))
  // console.log(typeof(id), id)


  // useEffect(() => {
  //   notes.map(note => {
  //     if (id == note.id) {
  //       setnote({ ...note })
  //       setEditTitle(note.title)
  //       setEditText(note.text)
  //       console.log(note)
  //     }

  //   })
  // }, [id]);


  {/* <textarea className={styles.titleInput} type="text" onChange={(e) => { setEditTitle(e.target.value) }} value={EditTitle}></textarea> */}

        {/* <textarea className={styles.textInput} type="text" onChange={(e) => { setEditText(e.target.value) }} value={EditText}></textarea> */}


        {/* <div className={styles.titleLabel}>Title</div> */}
  return (
    <>
      
      <AnimatePresence>
      <motion.div layoutId={id}   className={styles.viewContainer}>

        
          <Link href='/' prefetch>
          <div  className={styles.backBtn}>
            <BiArrowBack />
          </div>
          </Link>
        

        <motion.div layoutId={`title-${id}`}   contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
          note.title
        </motion.div>

        <motion.div layoutId={`text-${id}`} contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
          note.text
        </motion.div>

      </motion.div> 
      </AnimatePresence>

      {/* <textarea  className='textarea'   cols="30"  onChange={(e) => { setEditText(e.target.value) }} value={EditText} ></textarea> */}
      {/* <div>{note.title}</div> */}
      {/* <div>{id}</div>
    <div>{id}</div> */}
    </>

  )
}

