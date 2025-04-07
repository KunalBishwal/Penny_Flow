// lib/currency.ts
export function getCurrencySymbol(currencyCode: string) {
    const symbols: Record<string, string> = {
      USD: "$",
      INR: "₹",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      AUD: "A$",
      CAD: "C$",
    };
    return symbols[currencyCode] || currencyCode;
  }
  