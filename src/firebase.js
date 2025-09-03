// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBu-U4S9duI2qwByg3v_kKBxVuqqBg_U6E",
  authDomain: "ccaapp-65b39.firebaseapp.com",
  projectId: "ccaapp-65b39",
  storageBucket: "ccaapp-65b39.firebasestorage.app",
  messagingSenderId: "479705142803",
  appId: "1:479705142803:web:d0a2855043d3f64b8a91e6",
  measurementId: "G-F7BFC2SB2W"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);
