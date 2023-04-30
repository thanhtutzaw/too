import { deleteDoc, doc, writeBatch } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { getAuth } from "firebase/auth";
import app from "../../utils/firebase";

export async function deleteNote(id) {
    const auth = getAuth(app);
    if (!db) {
        alert("Firestore database is not available");
        throw new Error("Firestore database is not available");
    }
    if (!auth.currentUser) {
        alert("User is not authenticated");
        throw new Error("User is not authenticated");
    }
    const uid = auth.currentUser.uid;
    const batch = writeBatch(db);
    const chunkSize = 10;
    const isArray = Array.isArray(id)
    if (!isArray) {
        const docRef = doc(db, `users/${uid}/notes/${id}`);
        await deleteDoc(docRef);
        return;
    }
    for (let i = 0; i < id.length; i += chunkSize) {
        const chunk = id.slice(i, i + chunkSize);
        for (let j = 0; j < chunk.length; j++) {
            const docRef = doc(db, `users/${uid}/notes/${chunk[j]}`);
            console.log(docRef);
            batch.delete(docRef);
        }
    }
    await batch.commit();
}