// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA90_Or5CFmjQCOr4Mbp3jD8CsfIEJPJ0M",
  authDomain: "brand-stuck.firebaseapp.com",
  projectId: "brand-stuck",
  storageBucket: "brand-stuck.firebasestorage.app",
  messagingSenderId: "646737733241",
  appId: "1:646737733241:web:baab8a96f520b213afd6a8",
  measurementId: "G-B5TEQPXZTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };