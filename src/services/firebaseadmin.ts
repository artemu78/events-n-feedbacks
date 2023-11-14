// utils/firebaseAdmin.js
import { getApps } from 'firebase/app';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp(config());
}

export async function customInitApp() {
  if (admin.apps.length <= 0) {
    const newApp = await admin.initializeApp(config());
    return newApp;
  } else {
    return getApps()[0];
  }
}

function config() {
  const localConfig = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };
  return {
    credential: admin.credential.cert(localConfig),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  };
}

export const database = admin.database();
export default admin;
