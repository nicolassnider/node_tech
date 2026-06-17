import { db } from "../config/firebase.js";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export class ProductModel {
  constructor() {
    this.collectionName = "products";
  }

  async fetchAllProducts() {
    console.info(`[DB] Consultando todos los productos en la colección ${this.collectionName}`);
    const snapshot = await getDocs(collection(db, this.collectionName));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async fetchProductById(id) {
    console.info(`[DB] Buscando producto con ID: ${id}`);
    const docRef = doc(db, this.collectionName, id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return { id: snapshot.id, ...snapshot.data() };
  }

  async insertProduct(data) {
    console.info(`[DB] Insertando nuevo producto`);
    const docRef = await addDoc(collection(db, this.collectionName), data);
    return { id: docRef.id, ...data };
  }

  async removeProduct(id) {
    console.info(`[DB] Eliminando producto con ID: ${id}`);
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }
}

