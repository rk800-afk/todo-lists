import { doc, collection, writeBatch, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

interface CreateTodoListWithAdminProps{
  title: string, 
  owner: { id: string, email: string}
}

export const createTodoListWithAdmin = async ({ title, owner }: CreateTodoListWithAdminProps) => {
  const batch = writeBatch(firestore);

  const todoListRef = doc(collection(firestore, "todoLists"));

  batch.set(todoListRef, {
    title,
    ownerId: owner.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const participantRef = doc(collection(todoListRef, "participants"));

  batch.set(participantRef, {
    userId: owner.id,
    email: owner.email,
    role: "admin",
  });

  await batch.commit();

  return todoListRef.id;
};