import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../utils/firebase";

export async function addNote(auth, titleInput, textInput) {
  const q = collection(db, `users/${auth.currentUser.uid}/notes`);
  const data = {
    title: titleInput,
    text: textInput,
    createdAt: serverTimestamp(),
    updatedAt: "Invalid Date",
  };
  await addDoc(q, data);
  window.location.reload();
}
