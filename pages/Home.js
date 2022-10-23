import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import { useRouter } from 'next/router';
import React from 'react'
import Header from '../Components/Header'
import Notes from "../Components/Notes";
// import Sidebar from '../Components/Sidebar'
// import Note from './[id]'

function Home({ float }) {

  const user = useAuthUser()
  const router = useRouter()

  return (
    <>
      {
        user.photoURL &&
        <>
          <Header float={float} user={user} />
          <Notes />
        </>
      }
    </>
  )
}
export default Home
export const getServerSideProps = withAuthUserTokenSSR()()



