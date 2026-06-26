// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-9c768.firebaseapp.com",
  projectId: "x-next-9c768",
  storageBucket: "x-next-9c768.appspot.com",
  messagingSenderId: "688541679334",
  appId: "1:688541679334:web:f507c292530e1d29f20527"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
