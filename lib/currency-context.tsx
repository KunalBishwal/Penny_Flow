"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

// Set a default context value
const CurrencyContext = createContext<{ currency: string }>({ currency: "$" });

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState("$");

  useEffect(() => {
    const fetchCurrency = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const currencySymbol = data.currency;

        // Normalize supported symbols
        if (currencySymbol === "₹" || currencySymbol === "INR") {
          setCurrency("₹");
        } else if (currencySymbol === "$" || currencySymbol === "USD") {
          setCurrency("$");
        } else {
          setCurrency("$"); 
        }
      }
    };

    fetchCurrency();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
