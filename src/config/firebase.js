import { initializeApp } from "firebase/app"; 
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
 
const firebaseConfig = {
  apiKey: "AIzaSyC5QVA0V-fOs-kxrxL5hL2RLdKsrKJcOaA",
  authDomain: "fir-course-b3a8e.firebaseapp.com",
  projectId: "fir-course-b3a8e",
  storageBucket: "fir-course-b3a8e.appspot.com",
  messagingSenderId: "142048595903",
  appId: "1:142048595903:web:ebe60efb96ceb0caf71b0a",
  measurementId: "G-YE5SYR3JKS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);