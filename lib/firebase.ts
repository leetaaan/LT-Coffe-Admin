import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASUFv5b9eW2cQTdIAEsYT5b7WaK_FahfY",
  authDomain: "food-app-d6c4e.firebaseapp.com",
  projectId: "food-app-d6c4e",
  storageBucket: "food-app-d6c4e.appspot.com",
  messagingSenderId: "406041558048",
  appId: "1:406041558048:web:39454bd9ab8dedd39b5045",
  measurementId: "G-7L21CSFD6B"
};
console.log(firebaseConfig);


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
