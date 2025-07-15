import { auth, db } from "@/firebase";
import { UserRole } from "_constants/UserRole";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function appleAuth(): Promise<void> {
  console.log("Apple Auth not implemented yet.");
}

export async function googleSignIn(): Promise<void> {
  console.log("Google Sign-In not implemented yet.");
}

export async function facebookSignIn(): Promise<void> {
  console.log("Facebook Sign-In not implemented yet.");
}

export async function checkIfEmailExists(email: string): Promise<boolean> {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0;
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  }
}

export async function registerWithEmail(
  name: string,
  email: string,
  password: string,
  newsletterOptIn: boolean,
  isCompany: boolean
): Promise<void> {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const userId = userCredential.user.uid;

  await setDoc(doc(db, "users", userId), {
    name,
    email,
    newsletterOptIn,
    role: isCompany ? UserRole.Company : UserRole.User,
    createdAt: serverTimestamp(),
  });

  console.log("✅ User registered successfully");
}

export async function loginWithEmail(
  email: string,
  password: string
): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
  console.log("✅ User logged in successfully");
}
