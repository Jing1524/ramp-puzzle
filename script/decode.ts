// decode.ts
/**
 * Simple helper to decode the Base64 string.
 * Run with:  npx ts-node decode.ts
 */

const encoded =
  "aHR0cHM6Ly90bnM0bHBnbXppaXlwbnh4emVsNXNzNW55dTBuZnRvbC5sYW1iZGEtdXJsLnVzLWVhc3QtMS5vbi5hd3MvcmFtcC1jaGFsbGVuZ2UtaW5zdHJ1Y3Rpb25zLw";

// Pad the string to a length divisible by 4
const padded = encoded + "=".repeat((4 - (encoded.length % 4)) % 4);

// Decode (works in Node.js)
const decoded = Buffer.from(padded, "base64").toString("utf8");

console.log("Decoded string:");
console.log(decoded);
