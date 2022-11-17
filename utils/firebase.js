import { getApps, initializeApp } from "firebase/app";


import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const apps = getApps()

let app
if (!apps.length) {
    app = initializeApp(firebaseConfig);
}
export const db = getFirestore(app)
export default app;