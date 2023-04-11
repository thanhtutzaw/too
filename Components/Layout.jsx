import { withAuthUser } from "next-firebase-auth";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Too</title>
        <meta name="Too" content="for you" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* <div className={styles.container}> */}
        {/* <Header /> */}
        {/* <Note /> */}
        {children}
        {/* { OpenNew && <Input setOpenNew={setOpenNew} />} */}
        {/* </div> */}
      </main>
    </>
  );
}
// export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser({})(Layout);
