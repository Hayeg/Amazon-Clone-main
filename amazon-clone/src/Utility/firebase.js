import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz7aDoiW6Jtj5zYsGMVbDNqxNcdAXdwQo",
  authDomain: "clone-2d8f9.firebaseapp.com",
  projectId: "clone-2d8f9",
  storageBucket: "clone-2d8f9.appspot.com",
  messagingSenderId: "539819297116",
  appId: "1:539819297116:web:331ae2d2335d8094779999"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();