import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCQstl99oLeagxFbZJe4BQo2Ygin3xzYvI",
  authDomain: "user-authentication-968e7.firebaseapp.com",
  databaseURL: "https://user-authentication-968e7-default-rtdb.firebaseio.com",
  projectId: "user-authentication-968e7",
  storageBucket: "user-authentication-968e7.firebasestorage.app",
  messagingSenderId: "368662173665",
  appId: "1:368662173665:web:9110454eed4b1dafba64a0",
  measurementId: "G-JEKNG4ZVDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Initialize Firestore

export { auth, db }; // ✅ Export both auth and db
