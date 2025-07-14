import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_ADMIN_KEY_PATH;

if (!serviceAccountPath) {
  throw new Error("FIREBASE_ADMIN_KEY_PATH is not set in the .env file");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

export const db = admin.firestore();
export default admin;
