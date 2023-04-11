// import global from "../styles/global.css";
// import Dashboard from "../Components/Dashboard";
// import Welcome from "./Components/Welcome";
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { AuthAction, useAuthUser, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../Components/Layout.jsx";
import { db, postToJSON } from "../utils/firebase";
// import { db } from "firebase-admin";
import { getFirebaseAdmin } from "next-firebase-auth";
import Home from "./Home";
import Input from '../Components/Input';

// import admin from "../utils/admin";
// import { getApp } from "firebase-admin/app";
// import { firestore } from "firebase-admin";
// import { getApp } from "firebase-admin/app";

const MyLoader = () => <div>Loading...</div>
// import initAuth from "../utils/initAuth";

// initAuth()
// function Store({ match }) {
//   let { id } = match.params

//   return (
//     <>
//       <Notes selectedId={id} />

//       <AnimatePresence>
//         <Note />
//       </AnimatePresence>

//     </>
//   )

// }
// const Store = () => {
//   // let { id } = match.params;
//   // console.log(typeof(id) , id)
//   return (
//     <>
//       <Notes />
//       {/* {id && <Note />} */}
//     </>
//   )

// }
// const HeaderMemo = memo(
//   () => {
// return (
//   <Header />
// )

//   }
// )
const Index = (props) => {
  const { notes } = props;
  // console.log(typeof(toJson) , toJson)

  // const buff = Buffer.from(privateKey).toString('base64');
  // console.log(buff);
  // console.log(id , typeof(id))


  // const user = useAuthUser()
  // const router = useRouter()
  // useEffect(() => {
  //   if(user.photoURL){
  //     router.push('/')
  //   }else{
  //     router.push('/auth')
  //   }
  // }, [user]);


  const router = useRouter()
  const user = useAuthUser()
  // const [notes, setnotes] = useState();
  useEffect(() => {
    router.prefetch('/auth')

    // let notes = null;
    // const id = AuthUser.id;
    // const q = collection(db, `users/${user.id}/notes`);
    // const docSnap = getDocs(q)
    // console.log(docSnap)
    // setnotes(docSnap.docs.map(doc => ({
    //   id: doc.id, 
    //   ...doc.data()
    // })) )

    // if (!user.photoURL) {
    //   console.log("user needs signin")
    //   router.push('/auth')
    // } else {
    //   console.log(`${user.displayName} in index`)
    // }
  }, [user]);

  // const notes = []
  // const id = user.id;
  // if(OpenNew !== true){
  // return(
  //   <Input setOpenNew={setOpenNew} />
  // )
  // }
  return (
    <Home notes={notes} />
  );
}
Index.getLayout = function getLayout(page) {

  return (
    <Layout>
      {page}
    </Layout>
  )
}


// export const getServerSideProps = withAuthUserTokenSSR()()

export const getServerSideProps = withAuthUserTokenSSR()(async ({ AuthUser, req, res }) => {

  let notes = null;
  const id = AuthUser.id;



  // do ssr fetching stuff and pass props to Home page

  // const db = getFirebaseAdmin().firestore() //don't use this because of version problem
  // import { db } from "../utils/firebase";// import db from firebasejs like traditional
  // const app = getApp()

  // const db = getFirebaseAdmin().firestore()
  // const admin = getFirebaseAdmin()
  // const db = getApp()
  // const app = getFirebaseAdmin().firestore()
  // const db = getFirestore(app)
  // console.log(db)
  // const db = admin.firestore()
  // const q = collection(db,`users/${id}/notes`);

  //here
  const q = query(collection(db, `users/${id}/notes`), orderBy('createdAt', 'desc'))
  // , orderBy('createdAt', 'desc')
  const docSnap = await getDocs(q)

  notes = docSnap.docs.map(doc => postToJSON(doc))
  // notes = docSnap.docs.map(doc => ({
  //     id:doc.id,
  //     ...doc.data()
  // }))
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=10 '
  // )
  return {
    props: {
      notes
    },
    // revalidate: 10,
  }
})



export default withAuthUser(
  {
    // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,

    // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    // authPageURL: '/auth',

    // whenAuthedBeforeRedirect: AuthAction.REDIRECT_TO_APP,

    // whenAuthed: AuthAction.REDIRECT_TO_APP,


    // whenAuthedBeforeRedirect: AuthAction.RETURN_NULL,
    // whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
    // whenUnauthedAfterInit: AuthAction.RENDER,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    authPageURL: '/auth',
  }
)(Index)