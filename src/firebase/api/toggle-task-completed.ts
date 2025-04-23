import { firestore } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const toggleTaskCompleted = async (
  listId: string,
  taskId: string,
  completed: boolean
) => {
  const taskRef = doc(firestore, "todoLists", listId, "tasks", taskId);
  await updateDoc(taskRef, { completed });
};