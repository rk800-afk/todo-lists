import { collection, getDocs } from 'firebase/firestore';
import {Participant} from '../../features/todo/types'
import { firestore } from '../firebaseConfig';

export const getParticipants = async (listId: string) => {
    try {
      const participantsRef = collection(firestore, "todoLists", listId, "participants");
      const snapshot = await getDocs(participantsRef);
      const participantsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Participant[];

      return participantsData;
    } catch (err) {
      console.error("Failed to fetch participants:", err);
    }
  };
  