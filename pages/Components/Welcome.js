import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useAuthContext } from "../../context/UserAuthState";

function Welcome({ user }) {
const [login, setlogin] = useState(false);
  const { googleSignin } = useAuthContext();

  const signInHandle = () => {
    googleSignin()
      .then(res => {
        setlogin(true)

      })
      .catch(err => console.log(err))
  }
  // const router = userRouter()
  // const singnUp = () => {

  // }
  return (
    <>
      <h1 className={styles.title}>
        Welcome to <a href="#">Too</a>
        <br />
        <br />
        {/* <AiOutlineArrowRight /> */}
        {/* <Link href="../../signup"> */}
        {/* {user ? (<></>) : (
          <button onClick={signInHandle} className={styles.btnArrow}>
            <HiOutlineArrowRight className={styles.iconArrow} />
          </button>
        )} */}
        {/* </Link> */}

        {login ? (<></>) : (<button onClick={signInHandle} className={styles.btnArrow}>
          <HiOutlineArrowRight className={styles.iconArrow} />
        </button>)}
      </h1>
    </>
  );
}

export default Welcome;
