import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Layout from "../Components/Layout.jsx";
import AppProvider from "../context/AppContext.jsx";
import { db, postToJSON } from "../utils/firebase.js";
import Home from "./Home.jsx";
const Index = (props) => {
  const { notes } = props;
  return (
    <AppProvider>
      <Home notes={notes} />
    </AppProvider>
  );
};
Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res }) => {
    let notes = null;
    const id = AuthUser.id;
    // do ssr fetching stuff and pass props to Home page

    // const db = getFirebaseAdmin().firestore() //don't use this because of version problem
    // import { db } from "../utils/firebase";// import db from firebasejs like traditional
    const q = query(
      collection(db, `users/${id}/notes`),
      orderBy("createdAt", "desc")
    );
    const docSnap = await getDocs(q);
    notes = docSnap.docs.map((doc) => postToJSON(doc));
    return {
      props: {
        notes,
      },
    };
  }
);

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth",
})(Index);
