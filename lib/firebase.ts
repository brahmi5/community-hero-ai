import { initializeApp, getApps } from "firebase/app";
import {
    getFirestore,
} from "firebase/firestore";

import {
    getAuth,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBsA8DYTofbQecBhPZEd3NDOhViWBrwkvE",
    authDomain: "community-hero-ai-brahmi.firebaseapp.com",
    projectId: "community-hero-ai-brahmi",
    storageBucket: "community-hero-ai-brahmi.firebasestorage.app",
    messagingSenderId: "510336893368",
    appId: "1:510336893368:web:c17829ee4179ee8f038f4d",
};

const app =
    getApps().length
        ? getApps()[0]
        : initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
