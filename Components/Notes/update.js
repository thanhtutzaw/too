import { Timestamp, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export async function update(auth, editnote, titleInput, textInput) {
    const uid = auth.currentUser.uid,
        noteId = editnote?.id.toString();
    const docRef = doc(db, `users/${uid}/notes/${noteId}`);
    const newData = {
        ...editnote,
        title: titleInput,
        text: textInput,
        createdAt: new Timestamp(
            editnote.createdAt.seconds,
            editnote.createdAt.nanoseconds
        ),
        updatedAt: serverTimestamp(),
    };
    await updateDoc(docRef, newData);
}