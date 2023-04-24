import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};
const apps = getApps();
let app
if (!apps.length) {
    app = initializeApp(firebaseConfig);
}
export const db = getFirestore(app)
export default app;
export function postToJSON(doc) {
    const data = doc.data();
    if (data?.updatedAt === "Invalid Date") {
        return {
            ...data,
            id: doc.id,
            // Gotcha! firestore timestamp NOT serializable to JSON. 
            //Must convert to milliseconds
            createdAt: data?.createdAt?.toJSON() || 0,
        };

    } else {
        return {
            ...data,
            id: doc.id,
            // Gotcha! firestore timestamp NOT serializable to JSON. 
            //Must convert to milliseconds
            createdAt: data?.createdAt?.toJSON() || 0,
            updatedAt: data?.updatedAt?.toJSON() || 0,
        };
    }
}
