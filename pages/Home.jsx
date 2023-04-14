import { useAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import React, { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header.jsx";
import Notes from "../Components/Notes.jsx";
import useSelect from "../hooks/useSelect";
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
  const [isSearching, setisSearching] = useState(false);
  const user = useAuthUser();
  const { selectedId, setselectedId } = useSelect();

  return (
    <>
      {/* {OpenNew === false ?  <Input setOpenNew={setOpenNew} /> : null} */}
      {user.photoURL || user.email ? (
        <>
          {/* <p style={{zIndex:'10000000'}}>{q}</p> */}
          <Header
            selectedId={selectedId}
            setselectedId={setselectedId}
            float={float}
            user={user}
            setisSearching={setisSearching}
          />
          <Notes
            selectedId={selectedId}
            setselectedId={setselectedId}
            notes={notes}
            isSearching={isSearching}
          />
          <Footer user={user} />
        </>
      ) : null}
    </>
  );
}
export const getServerSideProps = withAuthUserTokenSSR()(Home);
// export const getServerSideProps = withAuthUserTokenSSR()( ({AuthUser}) => {
//   // const id = AuthUser.id;
//   const id = 123;
//   return{
//     props:{
//       id
//     }
//   }
// })
