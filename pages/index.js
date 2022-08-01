// import global from "../styles/global.css";
import { memo, useState } from "react";
import { useAuthContext } from "../context/UserAuthState";
import styles from "../styles/Home.module.css";
// import Dashboard from "../Components/Dashboard";
// import Welcome from "./Components/Welcome";
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth"
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import SsrAuthRequired from "./ssr-auth-required";
import Link from "next/link";
import { SiAddthis } from 'react-icons/si'
import { AnimatePresence, AnimateSharedLayout, LayoutGroup, motion } from "framer-motion";
import Notes from "../Components/Notes";
import Note from "./[id]";
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useRouter } from "next/router";
import Layout from "../Components/Layout";
import Head from "next/head";
import Home from "./Home";
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
const Index = () => {
  const AuthUser = useAuthUser()
  const router = useRouter()
  // const {id} = router.query
  console.log(router.asPath)
  const { id } = router.query
  
  // const router = useRouter()
  // const { id } = router.query || '/'
  //     if(!id){
  //       id = '/'
  //     }
  // let data = {

  //  const data =    "-----BEGIN PRIVATE KEY-----\nA\nB\nC\nF\n-----END PRIVATE KEY-----\n"

  // }
  // console.log("data is json ",typeof (data))
  // console.log("output of json object ",data)
  // console.log("its value is ",typeof(data.private_key))
  // console.log("",data.private_key)
  // console.log("changed to string \n",JSON.stringify(data))
  // const test = process.env.TEST_DATA
  // const local = process.env.NEXT_PUBLIC_TEST_DATA_LOCAL
  // const localJson = JSON.parse(local)
  // const toJson = JSON.parse(test)
  // console.log(typeof(test) , test)
  // console.log(typeof(local) , local)
  // console.log(typeof(localJson) , localJson)
  // console.log(typeof(process.env.FIREBASE_PRIVATE_KEY) , process.env.FIREBASE_PRIVATE_KEY)
  // console.log(typeof(toJson) , toJson)

  //  this line 

  // const privateKey= `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnODYBeEVbijXo\nnQdlBwOnMfPIEbpDpTDYNcLgUteq8F1YUJJRYUD4utFQNULXhIzJNQscjBJWMdfG\nVvLBdEyJGmdINP5mZGvM9DeoMDfdd2J5rkq3wE8KN+o3x57xFXIaXIlqrFgWYW12\nleogPUNL+3ZpfjzTjFdiubXJOqh6AF1guJz1CEHCQtXAWon1b+NlWTA5w/q5VDN8\ndf7mIVKe5fOopw31pI/d8M4fW/ZlS5A1rtQA3dNgLV9vAsn1qYMQDk5n0t9Kf0QX\nQ35I6zJqV19swWSvUqxBjyPjUrzvLypquhjQaeLx43E49+IAmdJlKaTfEWY21Q6w\nXMi81o3hAgMBAAECggEAESYZm8L60e11o9pexMSYYlAkIRN4V7GcNcAlsR2t0nD+\nEa2Jo+Dmadu21ZPwu+tzCLtw3UecJczMxSFrmd1UcAcOKoCMynFoAMfW4V+4ivTQ\nW4w9S2TkdjbPxVKqgSzi28M7sH3mNr1dHXk4XoAJ48PxG9Z/ZG6TE6PZ+b4TQxeV\nx3dLkdp7XKPJWkESK4QUA/OcAZ+LClNSY2cmmBuCAZdhb/mUg6ImSfIghHiTzaoM\nC4UGJEEhmG24IeoxWp02jGo9SRBIjUA+d3ksh+HfjYuZx53RqBKkA4yl8jsU0XlO\nebwpzichwoZeUxJVpAreODNmb2ryEO/pdnRrJZPHxQKBgQDne/mH+ITw1h+MSH6U\n06eNUYedS1UjHCQ+/cveksizYk5C8EyUtzi4gdpnnoyn1b2NSLtXMxo7ImEnC5WX\nLP9Jnoy6jxdZtQTt/GdQhYBRU3ISWw4e8nP2jrDKyRe7YK7NpZujU6womM+13HbQ\n7/FRpkM0mcDHpJXc0p6EJ0Z6bwKBgQC47eKUgS1NORx4IFnxEnYK4zFLbatXXxZo\naW2aIE1hmp723hl5Y1fFYLf1bjftsJWGsaSd7lu662+kKGAV19dQ9XTd9RZrDZ7C\nv0SyRlqi8wwtmVB+6hIqXB0GTON5cQPs+bwD0OIlFoebKK1gM2oj6zZ6hhc888HJ\n5+EsUkLkrwKBgDrQMd8NEmHKVWukA502hWyPWWBqgnAQN1lVzFV5f8qr4Gx7d0mV\nn7CpNV98VgpScP2TjB2kmzaJDpwIAnLNePMweFrx/iHJrz30Eh/QO4DuLZ5iSh0s\nxq/PIzXyj7gI4YDYYcnGeYg7AxMWt41wWSTAlHSp1+Qhef4H+URkYjC7AoGACXYa\nRpDJWY8Xdsno8B2KronrJrnIr2KtCdCDDASlEN5RTb4VPZGolu+Y2dS2xdFoBQkn\nq/Da/pg3EQYDzHpLiNfWD9kPOZDr03jnsdtJndajg925MZUWMtadoYnjhX4TvlcU\nmHliaJVbgMO3Axn+TzIkimY74CF0g7j6W0MmKv8CgYEApyzpC6pE2CPELhG+nLWt\nTxBf0NjB1B5sNl7DNn3Oqa/njCRk4geXBxx9gcivLM5GExQx8dGAu6Ff9et6kWKt\n4o5ae6z5OzdUCtQOrMQLoXdTiFGuVPOzR3BQRfmmke7WWKpQUbA6MlsUEnuADIYf\naGlqb3Qx196U7idFgi5EUzE=\n-----END PRIVATE KEY-----\n`
  // const buff = Buffer.from(privateKey).toString('base64');
  // console.log(buff);
  // console.log(id , typeof(id))
  
  // if (AuthUser) {
  //   console.log(AuthUser.email)
  // }

  return (

    <>
    {/* <HeaderMemo /> */}
    
      {/* <AnimateSharedLayout type="crossfade"> */}
      <Home/>

      {AuthUser.displayName && <Notes />}

      {/* {AuthUser.displayName ? (
        <> */}

      {/* <Note /> */}
      {/* {!id && <Note />} */}

      {/* </>
      ) : null} */}
      {/* <Router>
        <Route path={["/:id" , "/"]} component={Store} />
    </Router> */}
      {/* <Link href='/ssr-auth-required'>SSR required</Link> */}


      {/* </AnimateSharedLayout> */}

      {/* <div className={styles.bottomNav}>
        <SiAddthis className={styles.addBtn} />
      </div> */}



    </>


  );
}
Index.getLayout = function getLayout(page) {
  // const AuthUser = useAuthUser()
  return (
    <Layout>
      {page}
    </Layout>
  )
}


export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Index)

