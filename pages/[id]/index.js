import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import { useRouter } from 'next/router'
import React from 'react'
import Header from '../../Components/Header'
import Layout from '../../Components/Layout'
import Notes from '../../Components/Notes'
import Home from '../Home'
import styles from "../../styles/Notes.module.css";
import Link from 'next/link'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { notes } from '../../utils/data'


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
    revalidate: 200
  }
}
function NewHeader() {

}

// const user = useAuthUser()
const Note = ({ note }) => {
  // const AuthUser = useAuthUser()
  // const router = useRouter()
  // let { id } = router.query
  // id = parseInt(id)
  return (
    <>
      <LayoutGroup>
        <Home />
        {/* <Header /> */}
        <AnimatePresence>
          {/* <p className={styles.viewContainer}>{id}</p> */}
          {/* <Link scroll={false} href='/' ><a className={styles.viewContainer}>{id}</a></Link> */}
          <div onClick={()=>window.history.back()}className={styles.viewContainer}>
            <p>{note.title}</p>
            <p>{note.text}</p>
          </div>

        </AnimatePresence>
      </LayoutGroup>
    </>

  )
}
Note.getLayout = function getLayout(page) {
  return (
    <Layout>
      {/* <Home user={user}/> */}
      {page}
      <Notes />
    </Layout>

  )
}
export default Note