import React from 'react'
import FirebaseAuth from '../Components/FirebaseAuth'
import {withAuthUser , AuthAction} from 'next-firebase-auth'
import styles from "../styles/Home.module.css";

const  Auth = () =>{
  return (
    <div className={styles.container}>

        <section className={styles.main}>
    <h3>Welcome to Too</h3>
    <FirebaseAuth />
    </section>
    </div>
  )
}

// export default withAuthUser({

//     whenAuthed:AuthAction.REDIRECT_TO_APP ,

//     whenUnauthedBeforeInit:AuthAction.RETURN_NULL ,
//     whenUnauthedAfterInit:AuthAction.RENDER ,
// })(Auth)

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth)
