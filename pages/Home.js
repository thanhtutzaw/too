import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import { useRouter } from 'next/router';
import React from 'react'
import Header from '../Components/Header'
import Notes from "../Components/Notes";
// import Sidebar from '../Components/Sidebar'
// import Note from './[id]'

export default function Home({ float }) {

  const user = useAuthUser()
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

export const getServerSideProps = withAuthUserTokenSSR()()



