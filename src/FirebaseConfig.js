// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "API KEY",
  authDomain: "Auth DOMAIN NAME",
  projectId: "PROJECT ID",
  storageBucket: "STORAGE ID",
  messagingSenderId: "MESSAGING ID",
  appId: "APP ID",
  measurementId: "MEASUREMENT ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDatabase = getFirestore(app);

export default firestoreDatabase;