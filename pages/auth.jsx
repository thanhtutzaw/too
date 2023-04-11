import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FirebaseAuth from "../Components/FirebaseAuth";
import Layout from "../Components/Layout.jsx";
import styles from "../styles/Home.module.css";
import FullPageLoader from "../Components/FullPageLoader";

const Auth = () => {
  const router = useRouter();
  const email = "testuser@gmail.com",
    password = "111111";
  const auth = getAuth();
  function signin(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // router.push('/')
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    router.prefetch("/");
  }, []);
  const [emailLoading, setemailLoading] = useState(false);
  // const [googleLoading, setgoogleLoading] = useState(false);
  return (
    <>
      <div className={styles.loginWrapper}>
        <h1>
          Welcome to <Link href="https://github.com/thanhtutzaw/too">Too</Link>
        </h1>
        <FirebaseAuth />
        <span style={{ opacity: ".5" }}>or</span>
        <button
          disabled={emailLoading}
          className={styles.loginBtn}
          onClick={() => {
            setemailLoading(true);
            setTimeout(() => {
              signin(email, password);
            }, 1000);
          }}
        >
          {emailLoading ? "Welcome TestUser" : "Sign in as testUser"}
        </button>
        {/* <EmailAuth /> */}
      </div>
    </>
  );
};
Auth.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenAuthedBeforeRedirect: AuthAction.RETURN_NULL,
  // appPageURL:'/',
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: FullPageLoader,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
