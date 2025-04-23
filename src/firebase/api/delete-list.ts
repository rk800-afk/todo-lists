import { firestore } from "../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteListFromFirestore = async (listId: string) => {
  const listRef = doc(firestore, "todoLists", listId);
  await deleteDoc(listRef);
};