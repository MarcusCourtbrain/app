import admin from "firebase-admin";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import locales from "_assets/locales";

dotenv.config(); // This approach ensures it is not bundled when building the app, posing a security risk.

const serviceAccountPath = process.env.FIREBASE_ADMIN_KEY_PATH;

if (!serviceAccountPath) {
  throw new Error("FIREBASE_ADMIN_KEY_PATH is not set in the .env file");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

const db = admin.firestore();
const COLLECTION = "translations";
const LOCALES_DIR = path.resolve(__dirname, "../assets/locales");

async function updateTranslations() {
  console.log("Fetching translations from Firestore...");

  const translationsSnapshot = await db.collection(COLLECTION).get();
  const translations = [];

  for (const doc of translationsSnapshot.docs) {
    const translation = doc.data();
    translation.texts = [];

    const textsSnapshot = await db
      .collection(`${COLLECTION}/${doc.id}/texts`)
      .get();

    for (const textDoc of textsSnapshot.docs) {
      let textData = textDoc.data();
      textData = await resolveReferences(textData);
      translation.texts.push(textData);
    }

    translations.push(translation);
  }

  const prepared = prepareTranslations(translations);

  if (!fs.existsSync(LOCALES_DIR)) {
    fs.mkdirSync(LOCALES_DIR, { recursive: true });
  }

  for (const lang of locales) {
    const filePath = path.join(LOCALES_DIR, `${lang}.json`);
    fs.writeFileSync(filePath, JSON.stringify(prepared[lang] || {}, null, 2));
    console.log(`✅ Written ${filePath}`);
  }
}

async function resolveReferences(data: any) {
  const keys = Object.keys(data);

  for (const key of keys) {
    if (data[key] && data[key]._referencePath) {
      const ref = db.doc(data[key]._referencePath);
      const refDoc = await ref.get();
      data[key] = refDoc.exists ? refDoc.data() : null;
    }
  }

  return data;
}

function prepareTranslations(translations: any) {
  const out: Record<string, Record<string, any>> = {};

  for (const translation of translations) {
    for (const text of translation.texts) {
      for (const lang of locales) {
        if (!out[lang]) out[lang] = {};
        if (!out[lang][translation.namespace])
          out[lang][translation.namespace] = {};

        out[lang][translation.namespace][text.key] = text[lang];
      }
    }
  }

  return out;
}

updateTranslations().catch(console.error);
