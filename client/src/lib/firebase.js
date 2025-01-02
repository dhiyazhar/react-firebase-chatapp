import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "reactchat-ccc89.firebaseapp.com",
    projectId: "reactchat-ccc89",
    storageBucket: "reactchat-ccc89.firebasestorage.app",
    messagingSenderId: "847262441791",
    appId: "1:847262441791:web:bc09b011bf81bf66b1338a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
