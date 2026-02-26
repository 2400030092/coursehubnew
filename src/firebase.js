import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCyNs5KKnTmC1n3OSRu5yVVhnaeJlhlprg",
    authDomain: "coursehub-c131c.firebaseapp.com",
    projectId: "coursehub-c131c",
    storageBucket: "coursehub-c131c.appspot.com",
    messagingSenderId: "763021145064",
    appId: "1:763021145064:web:2e69794bc9a1eea030aa5d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
