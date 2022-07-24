import React from 'react'
import FirebaseAuth from '../Components/FirebaseAuth'
import {withAuthUser , AuthAction} from 'next-firebase-auth'
import styles from "../styles/Home.module.css";

const  Auth = () =>{
  return (

    <>
    <h3>Welcome to Too</h3>
    <FirebaseAuth />
    </>
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
