// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi6Lq1wzKDoe0bcPDKALlO1Cvi3uJmCv8",
  authDomain: "codereports-56d7a.firebaseapp.com",
  projectId: "codereports-56d7a",
  storageBucket: "codereports-56d7a.appspot.com",
  messagingSenderId: "691573071680",
  appId: "1:691573071680:web:af7b8d1ca68ccf9b23e4a5",
  measurementId: "G-NYGVKH6G0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
