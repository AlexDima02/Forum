// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzSsdNAYU7DXSfOf4IXFRXrGaZ6-Yo2_k",
  authDomain: "forum-app-71305.firebaseapp.com",
  projectId: "forum-app-71305",
  storageBucket: "forum-app-71305.appspot.com",
  messagingSenderId: "923421493281",
  appId: "1:923421493281:web:43e66132f9438310b8fb60",
  measurementId: "G-GW737WSK8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;