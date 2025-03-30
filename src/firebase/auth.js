import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCTX9uhd3diaaMB07-7tNNXVR-ABWtuRuE",
    authDomain: "mental-health-app-74a17.firebaseapp.com",
    projectId: "mental-health-app-74a17",
    storageBucket: "mental-health-app-74a17.appspot.com", 
    messagingSenderId: "187934314419",
    appId: "1:187934314419:web:5729e8a59177eb642cc5c6",
    measurementId: "G-2B191YRWEC"
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
