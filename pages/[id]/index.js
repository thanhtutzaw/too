import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import { useRouter } from 'next/router'
import React from 'react'
import Header from '../../Components/Header'
import Layout from '../../Components/Layout'
import Notes from '../../Components/Notes'
import Home from '../Home'
import styles from "../../styles/Notes.module.css";
import Link from 'next/link'
import { motion } from 'framer-motion'
import { notes } from '../../utils/data'
import { BiArrowBack } from 'react-icons/bi'


export const getStaticPaths = async () => {
  const paths = notes.map(note => {
    return {
      params: { id: note.id.toString() }
    }
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const note = notes.find(note => note.id == id)
  return {
    props: { note },
    revalidate: 100
  }
}
function NewHeader() {

}

// const user = useAuthUser()
const Note = ({ note }) => {
  // const AuthUser = useAuthUser()
  const router = useRouter()
  let { id } = router.query
  // id = parseInt(id)
  return (
    <>
      {/* <Header /> */}
      {id &&
        <> <div className={styles.viewContainer}>
          
            <div onClick={()=>window.history.back()} className={styles.backBtn}>
              <BiArrowBack />
            </div>
          
          <motion.div layoutId={`title-${id}`} contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
            {note.title}
          </motion.div>
          <motion.div layoutId={`title-${id}`} contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
            {note.text}
          </motion.div>

        </div>
        </>
      }
    </>

  )
}
Note.getLayout = function getLayout(page) {
  return (
    <Layout>
      {/* <Home user={user}/> */}
      {/* <Home /> */}

      {page}
      {/* <Notes /> */}
    </Layout>

  )
}
export default Note