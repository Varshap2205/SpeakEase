import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCTX9uhd3diaaMB07-7tNNXVR-ABWtuRuE",
  authDomain: "mental-health-app-74a17.firebaseapp.com",
  projectId: "mental-health-app-74a17",
  storageBucket: "mental-health-app-74a17.appspot.com",  // ✅ Fixed storageBucket URL
  messagingSenderId: "187934314419",
  appId: "1:187934314419:web:000964b5afda62c62cc5c6",
  measurementId: "G-M2LBT7XZQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Initialize Firestore

export { auth, db }; // ✅ Export both auth and db
