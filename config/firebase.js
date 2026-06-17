import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { settings } from "./settings.js";

const app = initializeApp(settings.firebase);
const db = getFirestore(app);

export { db };
