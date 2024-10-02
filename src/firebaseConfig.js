import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAKuZNdriGvmjmKTJkofABcvGjESIWOaTY",
  authDomain: "crime-7dc13.firebaseapp.com",
  projectId: "crime-7dc13",
  storageBucket: "crime-7dc13.appspot.com",
  messagingSenderId: "1054669743140",
  appId: "1:1054669743140:web:bab27794e3cad5b4f7a4b1",
  measurementId: "G-3353FJEJPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
