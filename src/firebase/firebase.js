////FIREBASE
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyACQQSzUOOHaK5KP-6XkaT6wF77poTDhJ4",
    authDomain: "superchat-410a6.firebaseapp.com",
    projectId: "superchat-410a6",
    storageBucket: "superchat-410a6.appspot.com",
    messagingSenderId: "451646621516",
    appId: "1:451646621516:web:e6750b5bd457afe79831e9",
    measurementId: "G-711V3XTXW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;