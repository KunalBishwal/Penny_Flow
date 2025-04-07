import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Create a user document if it doesn't exist.
 */
export async function createUserIfNotExists(userId: string) {
  const userRef = doc(db, "users", userId);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) {
    await setDoc(userRef, {
      budget: 0,
      currency: "USD ($)",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}

/**
 * Get user settings (e.g., budget and currency).
 */
export async function getUserSettings(userId: string) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    throw new Error("User settings not found");
  } catch (error) {
    throw new Error("Failed to fetch user settings: " + (error as Error).message);
  }
}

/**
 * Add a new expense for a user.
 */
export async function addExpense(userId: string, expenseData: any) {
  try {
    await createUserIfNotExists(userId);
    const docRef = await addDoc(collection(db, "users", userId, "expenses"), {
      ...expenseData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    throw new Error("Failed to add expense: " + (error as Error).message);
  }
}

/**
 * Get all expenses for a user.
 */
export async function getExpenses(userId: string) {
  try {
    const expensesRef = collection(db, "users", userId, "expenses");
    const q = query(expensesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const expenses: any[] = [];
    querySnapshot.forEach((doc) => {
      expenses.push({ id: doc.id, ...doc.data() });
    });
    return expenses;
  } catch (error) {
    throw new Error("Failed to fetch expenses: " + (error as Error).message);
  }
}

/**
 * Update the user's monthly budget and currency.
 */
export async function updateBudget(userId: string, budgetData: { budget: number; currency: string }) {
  try {
    await createUserIfNotExists(userId);
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      budget: budgetData.budget,
      currency: budgetData.currency,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error("Failed to update budget: " + (error as Error).message);
  }
}
