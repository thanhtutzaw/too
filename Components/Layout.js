import React from 'react'
import Head from 'next/head'
import styles from "../styles/Home.module.css";
import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import Note from '../pages/[id]';
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
                {/* </div> */}
            </main>
        </>
    )
}
// export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser({})(Layout)
