import React from 'react'
import Head from 'next/head'
// import '../styles/globals.css'
import styles from "../styles/Home.module.css";
function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Too</title>
                <meta name="Too" content="for you" />
                <link rel="icon" href="D:\React\Next\too\public\favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.container}>
                    {children}
                </div></main>
        </>
    )
}

export default Layout