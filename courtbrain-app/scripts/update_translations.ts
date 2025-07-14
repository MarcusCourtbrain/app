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
const TRANSLATIONS_COLLECTION = "translations";
const LOCALES_DIRECTORY = path.resolve(__dirname, "../assets/locales");

async function updateTranslations() {
  console.log("📥 Fetching translations from Firestore...");

  const translationsSnapshot = await db
    .collection(TRANSLATIONS_COLLECTION)
    .get();
  const translations: any[] = [];

  for (const translationDoc of translationsSnapshot.docs) {
    const translationData = translationDoc.data();
    translationData.texts = [];

    const textsSnapshot = await db
      .collection(`${TRANSLATIONS_COLLECTION}/${translationDoc.id}/texts`)
      .get();

    for (const textDoc of textsSnapshot.docs) {
      let textData = textDoc.data();
      textData = await resolveReferences(textData);
      translationData.texts.push(textData);
    }

    translations.push(translationData);
  }

  const structuredTranslations = structureTranslations(translations);

  ensureLocalesDirectoryExists();

  for (const language of locales) {
    const filePath = path.join(LOCALES_DIRECTORY, `${language}.json`);
    fs.writeFileSync(
      filePath,
      JSON.stringify(structuredTranslations[language] || {}, null, 2)
    );
    console.log(`✅ Wrote translations for '${language}' to ${filePath}`);
  }
}

async function resolveReferences(record: any) {
  for (const key of Object.keys(record)) {
    if (record[key] && record[key]._referencePath) {
      const refDoc = await db.doc(record[key]._referencePath).get();
      record[key] = refDoc.exists ? refDoc.data() : null;
    }
  }
  return record;
}

function structureTranslations(translations: any[]) {
  const output: Record<string, Record<string, any>> = {};

  for (const translation of translations) {
    for (const textEntry of translation.texts) {
      for (const language of locales) {
        if (!output[language]) output[language] = {};
        if (!output[language][translation.namespace]) {
          output[language][translation.namespace] = {};
        }

        output[language][translation.namespace][textEntry.key] =
          textEntry[language];
      }
    }
  }

  return output;
}

function ensureLocalesDirectoryExists() {
  if (!fs.existsSync(LOCALES_DIRECTORY)) {
    fs.mkdirSync(LOCALES_DIRECTORY, { recursive: true });
    console.log(`📁 Created locales directory at ${LOCALES_DIRECTORY}`);
  }
}

updateTranslations()
  .then(() => console.log("🎉 Translation update completed."))
  .catch((err) => console.error("❌ Failed to update translations:", err));
