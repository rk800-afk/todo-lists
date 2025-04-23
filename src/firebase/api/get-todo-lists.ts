import { collection, getDocs } from "firebase/firestore"
import { firestore } from "../firebaseConfig"

export const getTodoListsById = async (userId: string) => {
  const listsRef = collection(firestore, "todoLists")
  const docs = await getDocs(listsRef)
  const lists = docs.docs
    .filter(doc => doc.data().ownerId === userId) 
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  return lists;
}
