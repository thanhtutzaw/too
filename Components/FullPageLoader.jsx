import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.scss";

const FullPageLoader = () => {
  return (
    <>
      <div className={styles.loginWrapper}>
        <div className={styles.logo} style={{ opacity: "0" }}>
          <Image width={150} height={150} alt="logo" src={"/logo.svg"} />
        </div>

        <h1>
          Welcome to <Link href="https://github.com/thanhtutzaw/too">Too</Link>
        </h1>

        <div>
          <div style={{ height: "80px" }}></div>
          <span style={{ opacity: "0", visibility: "hidden" }}>or</span>
        </div>
        <button
          style={{ opacity: "0", visibility: "hidden" }}
          className={styles.loginBtn}
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
          <span>{"Sign in as testUser"}</span>
        </button>
      </div>
    </>
  );
};

export default FullPageLoader;
