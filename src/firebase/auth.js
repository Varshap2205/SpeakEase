import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

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
const provider = new GoogleAuthProvider();

export const signUpWithEmail = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch((error) => { throw error; });
};

export const signInWithEmail = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch((error) => { throw error; });
};

export const signInWithGoogle = async () => {
  return signInWithPopup(auth, provider)
    .then((result) => result.user)
    .catch((error) => { throw error; });
};

export const logout = async () => {
  return signOut(auth);
};
