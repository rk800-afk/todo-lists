import { firestore } from "../firebaseConfig";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

interface UpdateTaskParams {
  listId: string;
  taskId: string;
  title: string;
  description: string;
}

export const updateTask = async ({
  listId,
  taskId,
  title,
  description,
}: UpdateTaskParams) => {
  const taskRef = doc(firestore, "todoLists", listId, "tasks", taskId);

  await updateDoc(taskRef, {
    title,
    description,
    updatedAt: serverTimestamp(),
  });

  return {
    id: taskId,
    title,
    description,
    isEditing: false,
  };
};
