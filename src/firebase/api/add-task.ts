import { firestore } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

interface AddTaskParams {
  listId: string;
  title: string;
  description: string;
}

export const addTask = async ({ listId, title, description }: AddTaskParams) => {
  const newTask = {
    title,
    description,
    completed: false,
    isEditing: false,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(
    collection(firestore, "todoLists", listId, "tasks"),
    newTask
  );

  return { ...newTask, id: docRef.id };
};