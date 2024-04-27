import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chitchat-c3419.firebaseapp.com",
  projectId: "chitchat-c3419",
  storageBucket: "chitchat-c3419.appspot.com",
  messagingSenderId: "216000609749",
  appId: "1:216000609749:web:b52d28e96d216609ca515c"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth()
export const db =getFirestore()
export const storage=getStorage()