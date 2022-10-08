import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import React, { useState } from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Note from './[id]'

export default function Home({float}) {
  const [showModal, setshowModal] = useState(false);
  

    const user = useAuthUser()
    return (
      <>
      <Header float={float} user={user} />
    {/* <Note /> */}
      {/* <button onClick={()=>{setshowModal(prev => !prev)}} style={{position:'fixed', zIndex:'1000'}}>hey</button> */}
      {/* {showModal && <Sidebar user={user} setshowModal={setshowModal} />} */}
    </>

  )
}
export const getServerSideProps = withAuthUserTokenSSR()()



