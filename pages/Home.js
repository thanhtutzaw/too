import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Header from '../Components/Header'
import Notes from "../Components/Notes";
// import Sidebar from '../Components/Sidebar'
// import Note from './[id]'

export default function Home({float}) {
  // const [showModal, setshowModal] = useState(false);
  

    const user = useAuthUser()
    const router = useRouter()
    useEffect(() => {
      // if(user){
      //   router.push('/auth')
      // }
      if(user){
        // alert('user' ,typeof(user) ,user.length)
      }
    }, []);
    return (
      <>
      <Header float={float} user={user} />
        {user.photoURL && <Notes />}

    {/* <Note /> */}
      {/* <button onClick={()=>{setshowModal(prev => !prev)}} style={{position:'fixed', zIndex:'1000'}}>hey</button> */}
      {/* {showModal && <Sidebar user={user} setshowModal={setshowModal} />} */}
    </>

  )
}
export const getServerSideProps = withAuthUserTokenSSR()()



