import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCiX4dLBohwury7_nvEAmzx0yhs5xWFgtI",
  authDomain: "todo-lists-69c1b.firebaseapp.com",
  projectId: "todo-lists-69c1b",
  storageBucket: "todo-lists-69c1b.appspot.com",  // виправлено: була помилка у storageBucket
  messagingSenderId: "909462282305",
  appId: "1:909462282305:web:063744810266cd3ecc26c0",
  measurementId: "G-9MLR4LPDX2"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Перевірка на наявність ініціалізації
if (!app) {
  console.error("Не вдалося ініціалізувати Firebase!");
}


const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };