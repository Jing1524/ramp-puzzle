# Ramp Take-Home Challenge

This repository documents my approach to the Ramp frontend take-home puzzle.  
It is structured in two parts:

- **Part 1 — Puzzle Decoding:** Solving the initial DOM/CTF-style puzzle and extracting the token.  
- **Part 2 — Daily Calendar:** Building a React/TypeScript daily calendar that uses the decoded token.

---

## Part 1 — Puzzle Decoding

### Goal
Identify and decode the hidden string provided in the challenge, producing a usable token/URL.

### Steps
1. **Inspection:** Determined the string was Base64 (or Base64URL).
2. **Padding/Validation:** Ensured proper padding (`=`) to make length divisible by 4 (Base64 length must be a multiple of 4. If it isn’t, append = until it is.)
3. **Decoding:** Used environment tools:
   - **Browser:** `atob("string")`
   - **Node.js:** `Buffer.from("string", "base64").toString("utf8")` (the tool that i chose in the helper)
   - **Python:** `base64.b64decode("string")`

4. ### How to run
```bash
# Install dev dependencies if needed
npm install --save-dev ts-node typescript

# Run the decoder
npx ts-node decode.ts

5: ### Solution Output
Decoded string:
# (output below — included here for completeness)
https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/ramp-challenge-instructions/

