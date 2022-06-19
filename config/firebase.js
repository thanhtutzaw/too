// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqiYmXkm_fDhvVICxEF_JPcNvn1zKQpPs",
  authDomain: "too-dc752.firebaseapp.com",
  projectId: "too-dc752",
  storageBucket: "too-dc752.appspot.com",
  messagingSenderId: "190703670735",
  appId: "1:190703670735:web:ee69e434991f2c5304aeba",
  measurementId: "G-HLWGM0RSC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const analytics = getAnalytics(app);