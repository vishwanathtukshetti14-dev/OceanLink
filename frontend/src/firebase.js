import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWJC--jUEKE-R1eAp9q5xmU6iQOgmkegc",
  authDomain: "oceanlink-shipping.firebaseapp.com",
  projectId: "oceanlink-shipping",
  storageBucket: "oceanlink-shipping.firebasestorage.app",
  messagingSenderId: "400073788714",
  appId: "1:400073788714:web:5c6a1cfcf320bd33bba253",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();