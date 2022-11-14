import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAqiYmXkm_fDhvVICxEF_JPcNvn1zKQpPs",
    authDomain: "too-dc752.firebaseapp.com",
    projectId: "too-dc752",
    storageBucket: "too-dc752.appspot.com",
    messagingSenderId: "190703670735",
    appId: "1:190703670735:web:ee69e434991f2c5304aeba",
    measurementId: "G-HLWGM0RSC2"
    // apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // // messagingSenderId: process.env.REACT_APP_MESSAGING_SEDNER_ID,
};

const apps = getApps()
    
let app
if (!apps.length) {
    app = initializeApp(firebaseConfig);
}
export const db = getFirestore(app)
export default app;