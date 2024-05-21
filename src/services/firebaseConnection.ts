
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDfFnKVI5ZyJf7Vo7wQ6nNjRqN1-c78yP0",
  authDomain: "leo-automoveis.firebaseapp.com",
  projectId: "leo-automoveis",
  storageBucket: "leo-automoveis.appspot.com",
  messagingSenderId: "639895502545",
  appId: "1:639895502545:web:82fc24166ad00ff8110ff0",
  measurementId: "G-0YPHRD3MF5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };