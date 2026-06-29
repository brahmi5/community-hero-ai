import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../serviceAccount/firebase-key.json";

const app =
    getApps().length > 0
        ? getApps()[0]
        : initializeApp({
            credential: cert(serviceAccount as any),
        });

export const adminDb = getFirestore(app);