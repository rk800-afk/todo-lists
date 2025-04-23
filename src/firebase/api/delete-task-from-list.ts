import { firestore } from "../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteTask = async (listId: string, taskId: string) => {
  const taskRef = doc(firestore, "todoLists", listId, "tasks", taskId);
  await deleteDoc(taskRef);
};