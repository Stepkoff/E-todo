import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCyV5pbGdwAQksXuOsIfcvNztFEdO-mT2M",
  authDomain: "newtodo-446e6.firebaseapp.com",
  projectId: "newtodo-446e6",
  storageBucket: "newtodo-446e6.appspot.com",
  messagingSenderId: "765914661796",
  appId: "1:765914661796:web:621aec8f9bc028f2a07731"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseStorage = getStorage();
export const firebaseDB = getFirestore();