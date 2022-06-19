import React from "react";
import styles from "../../styles/Home.module.css";
import { HiOutlineArrowRight } from "react-icons/hi";
import Link from "next/link";

function Welcome() {
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
        <Link href="../../signup">
          <button className={styles.btnArrow}>
            <HiOutlineArrowRight className={styles.iconArrow} />
          </button>
        </Link>
      </h1>
    </>
  );
}

export default Welcome;
