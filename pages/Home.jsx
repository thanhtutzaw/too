import {
  AuthAction,
  useAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import React, { useContext } from "react";
import AddButton from "../Components/AddButton";
import Header from "../Components/Header";
import Notes from "../Components/Notes";
import { AppContext } from "../context/AppContext";
export default function Home() {
  const user = useAuthUser();
  const { Search, notes } = useContext(AppContext);

  const searchedNotes = notes?.filter((note) => {
    if (Search) {
      return (
        note.title
          .toLowerCase()
          .replace(/ /g, "")
          .includes(Search.toLowerCase().replace(/ /g, "")) ||
        note.title.toLowerCase().includes(Search.toLowerCase()) ||
        note.text.toLowerCase().includes(Search.toLowerCase()) ||
        note.text
          .toLowerCase()
          .replace(/ /g, "")
          .includes(Search.toLowerCase().replace(/ /g, ""))
      );
    } else {
      return { ...notes };
    }
  });

  return (
    <>
      {user.photoURL || user.email ? (
        <>
          <Header user={user} />
          <Notes notes={searchedNotes} />
          <AddButton user={user} />
        </>
      ) : null}
    </>
  );
}
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Home);
