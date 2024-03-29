import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FullPageLoader from "../Components/FullPageLoader";
import Layout from "../Components/Layout.jsx";
import GoogleLogin from "../Components/Login/GoogleLogin";
import styles from "../styles/Home.module.css";

const Auth = () => {
  const router = useRouter();
  const email = "testuser@gmail.com",
    password = "111111";
  const auth = getAuth();
  function signin(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .catch((error) => {
        console.log(error);
        alert(`signInWithEmailAndPassword Failed! ${error.message}`);
      });
  }
  useEffect(() => {
    router.prefetch("/");
  }, [router]);
  const [emailLoading, setemailLoading] = useState(false);
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.logo}>
        <Image width={150} height={150} alt="logo" src={"/logo.svg"} />
      </div>
      
      <h1>
        Welcome to <Link href="https://github.com/thanhtutzaw/too">Too</Link>
      </h1>

      {/* <div className={styles.button}> */}
      <div
        className={styles.googleLogin}
        style={{
          // height: "50px",
          animation: "fadeIn 1s ease-in-out",
          opacity: emailLoading ? "0" : "1",
          pointerEvents: emailLoading ? "none" : "initial",
          transition: "all .3s ease-in-out",
        }}
      >
        <GoogleLogin />
        <span style={{ animation: "fadeIn 1s ease-in-out", opacity: ".5" }}>
          or
        </span>
      </div>
      <button
        style={{ animation: "fadeIn 1s ease-in-out" }}
        disabled={emailLoading}
        className={styles.loginBtn}
        onClick={() => {
          setemailLoading(true);
          setTimeout(() => {
            signin(email, password);
          }, 1000);
        }}
      >
        <span>
          <Image
            className={styles.profile}
            alt="testuser profile"
            width="25"
            height="25"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          />
        </span>
        <span>{emailLoading ? "Signing in..." : "Sign in as testUser"}</span>
      </button>
      {/* </div> */}
    </div>
  );
};
Auth.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenAuthedBeforeRedirect: AuthAction.RETURN_NULL,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: FullPageLoader,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
