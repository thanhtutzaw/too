import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer';
import Header from '../Components/Header'
import Input from '../Components/Input';
import Notes from "../Components/Notes";
// import Sidebar from '../Components/Sidebar'
// import Note from './[id]'


// export async function getServerSideProps(context) {
//   console.log(context)
//   return{
//     props:{
//       id
//     }
//   }
// }

//   const q1 = collectionGroup(`users/UAGs84NckgaJI44tjokqFfVKt912/notes`);
//   notes = (await getDocs(q1)).docs.map((doc) => doc.data())
//   const user = useAuthUser()


// const q2 = query(collection(db, "users/" + user.id + "/notes"), orderBy("timeStamp", "desc"));
// console.log(q2)

// const docSnap = (await getDocs(q))
// notes = docSnap.docs.map(doc => {
//   return {
//     id: doc.id,
//     ...doc.data()
//   }
// })

// onSnapshot(q, (snapshot) => {
//     notes = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//     }))
// });

//   return {
//     props: { notes, q }
//   }
// }
export default function Home({ float, notes }) {
  const [OpenNew, setOpenNew] = useState(false);
  const [isSearching, setisSearching] = useState(false);

  const user = useAuthUser()
  useEffect(() => {
    if (user) {
      console.log(`${user.displayName} in Home`)
    }
  }, [user]);
  return (
    <>
      {/* {OpenNew === false ?  <Input setOpenNew={setOpenNew} /> : null} */}
      {
        (user.photoURL || user.email) ?
          <>
            <Header float={float} user={user} setisSearching={setisSearching} />
            <Notes notes={notes} isSearching={isSearching} />
            <Footer setOpenNew={setOpenNew} />
            {/* <p>{id}</p> */}
            {/* {notes.map(note => (
          <p key={note.id}>{note.title}</p>
        ))} */}
          </>
          :
          null
      }
    </>
  )
}
export const getServerSideProps = withAuthUserTokenSSR()(Home)

// export const getServerSideProps = withAuthUserTokenSSR()( ({AuthUser}) => {
//   // const id = AuthUser.id;
//   const id = 123;
//   // let notes = null;

//   // const q = "hey";
//   return{
//     props:{
//       id
//     }
//   }
// })