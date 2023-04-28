import {
  AuthAction,
  useAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import React, { useContext, useState } from "react";
import AddButton from "../Components/AddButton";
import Header from "../Components/Header";
import Notes from "../Components/Notes";
import { AppContext } from "../context/AppContext";
import useEscape from "../hooks/useEscape";
export default function Home({ float, notes }) {
  const [active, setactive] = useState(false);
  const [activeNote, setactiveNote] = useState();

  const user = useAuthUser();
  const { Search } = useContext(AppContext);
  const searchedNotes = notes.filter((note) => {
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
          <Header float={float} user={user} />
          <Notes
            setactiveNote={setactiveNote}
            activeNote={activeNote}
            active={active}
            notes={searchedNotes}
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
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Home);
