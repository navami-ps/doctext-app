// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyB5w-H2H-TPnOo4VRVH0YWLhlo_gCnk8E8",
  authDomain: "skill-75ba7.firebaseapp.com",
  projectId: "skill-75ba7",
  storageBucket: "skill-75ba7.appspot.com",
  messagingSenderId: "517997173578",
  appId: "1:517997173578:web:c918747e2cf1aa228bffb3",
  measurementId: "G-GK9MK8753K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
