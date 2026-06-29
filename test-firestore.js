const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./serviceAccount/firebase-key.json");

const app = initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id,
});

const db = getFirestore(app);

(async () => {
    try {
        console.log("Project:", serviceAccount.project_id);

        await db.collection("reports").add({
            test: true,
            createdAt: new Date(),
        });

        console.log("SUCCESS");
    } catch (e) {
        console.error(e);
    }
})();