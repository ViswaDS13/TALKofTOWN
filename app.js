// This is SDK handle for FireBase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5x5aib61iGtI_REZNNvS-_ClA-g6OEFY",
  authDomain: "chat-project-talkoftown.firebaseapp.com",
  projectId: "chat-project-talkoftown",
  storageBucket: "chat-project-talkoftown.firebasestorage.app",
  messagingSenderId: "833443503115",
  appId: "1:833443503115:web:03302535248c646b30fb0e",
  measurementId: "G-HS4TSFR6D0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);