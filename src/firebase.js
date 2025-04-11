// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ You missed importing this earlier

const firebaseConfig = {
  apiKey: "AIzaSyDoeoIXNMVEdqnAJIz1yw3MMAlwn0fLD5U",
  authDomain: "fir-todo-app-badab.firebaseapp.com",
  databaseURL: "https://fir-todo-app-badab-default-rtdb.firebaseio.com",
  projectId: "fir-todo-app-badab",
  storageBucket: "fir-todo-app-badab.firebasestorage.app",
  messagingSenderId: "675834622464",
  appId: "1:675834622464:web:660012c136973005d5dee5",
  measurementId: "G-JYSYMS2EXJ"
};

// ✅ Initialize only once
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // ✅ Firestore setup

// ✅ Export only once
export { app, auth, provider, db };
