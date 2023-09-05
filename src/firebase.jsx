import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCgC7jXcedxkLuKPA63zm-zFo0LkFj-qIs",
    authDomain: "todo-app-5c765.firebaseapp.com",
    projectId: "todo-app-5c765",
    storageBucket: "todo-app-5c765.appspot.com",
    messagingSenderId: "149892841410",
    appId: "1:149892841410:web:1b4a0d22cb9d08e64ea05b",
    measurementId: "G-G4VBSD5HKM"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {collection, addDoc, getDocs, doc, deleteDoc, updateDoc, db, app}
