import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { Participant } from '../../features/todo/types';

/**
 * Додає учасника до списку, якщо користувач з таким email існує
 */
export const addParticipant = async (listId: string, email: string) => {
  try {
    // 1. Знаходимо користувача за email
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error("User with such email not found.");
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // 2. Додаємо його в participants
    const participantRef = doc(firestore, "todoLists", listId, "participants", userDoc.id);
    const newParticipant: Participant = {
        id: userDoc.id,
      userId: userDoc.id,
      email: userData.email,
      role: "viewer", // за замовчуванням роль "member"
    };

    await setDoc(participantRef, newParticipant);
    return { success: true, participant: newParticipant };
  } catch (error: any) {
    console.error("Помилка додавання учасника:", error);
    return { success: false, error: error.message };
  }
};
