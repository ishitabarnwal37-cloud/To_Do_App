// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0bhWu6h-y_Tanar3B5tuvvGyWpETg3XY",
  authDomain: "todoapp-b7a0d.firebaseapp.com",
  databaseURL : "https://todoapp-b7a0d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todoapp-b7a0d",
  storageBucket: "todoapp-b7a0d.firebasestorage.app",
  messagingSenderId: "366869002141",
  appId: "1:366869002141:web:467cadaaa3466463722174",
  measurementId: "G-59J2N1GCQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)