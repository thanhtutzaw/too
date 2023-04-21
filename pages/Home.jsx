import { useAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import React, { useState } from "react";
import AddButton from "../Components/AddButton";
import Header from "../Components/Header";
import Notes from "../Components/Notes";
export default function Home({ float, notes }) {
  const [active, setactive] = useState(false);
  const [activeNote, setactiveNote] = useState();

  const [isSearching, setisSearching] = useState(false);
  const user = useAuthUser();
  return (
    <>
      {/* {OpenNew === false ?  <Input setOpenNew={setOpenNew} /> : null} */}
      {user.photoURL || user.email ? (
        <>
          <Header float={float} user={user} setisSearching={setisSearching} />
          <Notes
            setactiveNote={setactiveNote}
            activeNote={activeNote}
            active={active}
            notes={notes}
            isSearching={isSearching}
          />
          <AddButton
            activeNote={activeNote}
            active={active}
            setactive={setactive}
            user={user}
          />
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
