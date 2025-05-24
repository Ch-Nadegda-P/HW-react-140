import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqDsTjVvLi1xe76ac7QCi-zeiQf_ao8cI",
  authDomain: "my-to-do-a2e27.firebaseapp.com",
  projectId: "my-to-do-a2e27",
  storageBucket: "my-to-do-a2e27.appspot.com",
  messagingSenderId: "311563060896",
  appId: "1:311563060896:web:a68f9cfabc0d2b664f6bc5",
  measurementId: "G-LGC49NRKN1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
