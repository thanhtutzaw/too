import { useAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import React, { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Notes from "../Components/Notes";
// export async function getServerSideProps(context) {
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
  const [active, setactive] = useState(false);
  const [isSearching, setisSearching] = useState(false);
  const user = useAuthUser();
  return (
    <>
      {/* {OpenNew === false ?  <Input setOpenNew={setOpenNew} /> : null} */}
      {user.photoURL || user.email ? (
        <>
          {/* <p style={{zIndex:'10000000'}}>{q}</p> */}
          <Header float={float} user={user} setisSearching={setisSearching} />
          <Notes active={active} notes={notes} isSearching={isSearching} />
          <Footer active={active} setactive={setactive} user={user} />
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
