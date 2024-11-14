// src/config/firebase.js

// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyB6EpNkKwtVLg5znjJEuFYh76yJLfou2C8",
  authDomain: "login-auth-b7964.firebaseapp.com",
  projectId: "login-auth-b7964",
  storageBucket: "login-auth-b7964.firebasestorage.app",
  messagingSenderId: "670884552934",
  appId: "1:670884552934:web:519462e3ed178aff101b27"
};

// Initialize Firebase with the provided config
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth
export const auth = getAuth(app);  // Correctly initialize auth
export const db = getFirestore(app);  // Correctly initialize Firestore

export default app;
