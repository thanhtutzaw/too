import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import React from 'react'
import Header from '../Components/Header'
import Note from './[id]'

export default function Home({float}) {
    const user = useAuthUser()
  return (
    <>
    <Header float={float} user={user} />
    {/* <Note /> */}
    </>

  )
}
export const getServerSideProps = withAuthUserTokenSSR()()
// export const getServerSideProps = withAuthUserTokenSSR()()

// export default withAuthUser()(Home)
