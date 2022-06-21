import {onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
// import Link from "next/link";

import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useAuthContext } from "../context/UserAuthState";
import styles from "../styles/Home.module.css";
import Welcome from "./Components/Welcome";
// import {AiOutlineArrowRight} from 'react-icons/ai'
export default function Home() {
  // const router = useRouter();
  const { logout } = useAuthContext();

  const [user, setuser] = useState(() => auth.currentUser || undefined);
  const loadingUser = user === undefined;


  const logoutHandle = () => {
    try {
      logout();
      // setisSignin(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(setuser)
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     setisSignin(true);
    //     console.log(user);
    //   } else {
    //     setisSignin(false);
    //     console.log("no user in home");
    //   }
    // });
  }, []);
  if(loadingUser) return null;
  return (
    // <UserAuthState>
    <div className={styles.container}>
      <Head>
        <title>Too</title>
        <meta name="description" content="for you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {user ? (
          <>
            <img src={user.photoURL} className={styles.profile}/>
            {user.email}
            <button onClick={logoutHandle}>Logout</button>
          </>
        ) : (
          <Welcome />
        )}

        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
    // </UserAuthState>
  );
}
