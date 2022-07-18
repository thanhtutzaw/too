// import React, { useEffect, useState } from "react";
// import styles from "../../styles/Home.module.css";
// import { HiOutlineArrowRight } from "react-icons/hi";
// import { useAuthContext } from "../context/UserAuthState";

// export default function Welcome() {
// const [login, setlogin] = useState(true);
//   const { googleSignin } = useAuthContext();

//   useEffect(() => {
//     if(login === null) return;
  
//     let disposed = false;

    
//       // const provider = new GoogleAuthProvider();
//       //  signInWithPopup(auth, provider)
//       // .then( (res) => {
//       //   console.log(res)
//       // })
//       // .catch( (err) => {
//       //   console.log("error")
//       //   // if(!disposed){
//       //   //   setlogin(null)
//       //   // }
//       // })
    

//     // switch( login){
       
//     // }
//     return () => disposed = true;

//   }, [login])
  

//   const signInHandle = () => {
//     googleSignin()
//       .then(res => {
//         // setlogin(true)
//         // console.log("set to true")

//       })
//       .catch(err => console.log(err))
//   }

//   return (
//     <section className={styles.welcome}>
//       <h1 className={styles.title}>
//         Welcome to <a href="#">Too</a>
//         <br />
//         <br />
//         {/* <AiOutlineArrowRight /> */}
//         {/* <Link href="../../signup"> */}
//         {/* {user ? (<></>) : (
//           <button onClick={signInHandle} className={styles.btnArrow}>
//             <HiOutlineArrowRight className={styles.iconArrow} />
//           </button>
//         )} */}
//         {/* </Link> */}

//        <button onClick={signInHandle} className={styles.btnArrow}>
//           <HiOutlineArrowRight className={styles.iconArrow} />
//         </button>
//       </h1>
//     </section>
//   );
// }

