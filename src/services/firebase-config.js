// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzlFxBcBvEve-9H5J_fG_-C3WrJOiwQ-0",
  authDomain: "events-n-feedbacks.firebaseapp.com",
  projectId: "events-n-feedbacks",
  storageBucket: "events-n-feedbacks.appspot.com",
  messagingSenderId: "835301874641",
  appId: "1:835301874641:web:4daf0b0d71da09a4ec9ef0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);