// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJYzdm1Ax-d7vGTmoNkRciGFijBkUX0Hc",
  authDomain: "car-hub-ae8ec.firebaseapp.com",
  projectId: "car-hub-ae8ec",
  storageBucket: "car-hub-ae8ec.firebasestorage.app",
  messagingSenderId: "54266093729",
  appId: "1:54266093729:web:703f94d46da069e25610e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
