import { withAuthUser } from "next-firebase-auth";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Too</title>
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  );
}

export default withAuthUser({})(Layout);
