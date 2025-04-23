import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

export async function updateTodoListTitle(listId: string, newTitle: string) {
  const docRef = doc(firestore, "todoLists", listId);
  await updateDoc(docRef, { title: newTitle });
}