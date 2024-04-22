
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAcR_4YBtXoOcQeixPUQOtY5zDJtL8037M",
  authDomain: "leoautomoveis-3f53a.firebaseapp.com",
  projectId: "leoautomoveis-3f53a",
  storageBucket: "leoautomoveis-3f53a.appspot.com",
  messagingSenderId: "287127655152",
  appId: "1:287127655152:web:59e6c10621c27a08d2a835"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };