

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbL9GzWvHa9SMz6mE2CWobI9QDVQFbuJ4",
  authDomain: "trendio-358f0.firebaseapp.com",
  projectId: "trendio-358f0",
  storageBucket: "trendio-358f0.appspot.com",
  messagingSenderId: "544735272463",
  appId: "1:544735272463:web:f3094fba70a745b8f3cd7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage =getStorage(app);


export default app;