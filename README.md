# Ramp Take-Home Challenge

This repository documents my approach to the Ramp frontend take-home puzzle.  
It is structured in two parts:

- **Part 1 — Puzzle Decoding:** Solving the initial DOM/CTF-style puzzle and extracting the token.  
- **Part 2 — CTF + Typewriter Puzzle:** Building the required React app using the decoded token.

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


## Part 2 — Daily Calendar Challenge

### Goal
Use the decoded token from Part 1 to retrieve a flag from Ramp’s challenge endpoint and render it in a React application according to the given requirements.

### Requirements (summarized)
- Make an HTTP request to the provided URL.  
- Show a `"Loading..."` state during fetch.  
- Render the returned flag string:
  - As a list, where each character is a `<li>` element.  
  - With a typewriter effect (½-second delay per character).  
  - The animation runs once, after loading finishes.  
- Only use React and browser APIs — no external libraries for fetching or animation.  


### My Implementation
- Wrote a small utility to parse events and assign them to columns using an interval-partitioning algorithm.  
- Built a `useTypewriter` hook to reveal characters progressively.  
- Added accessibility features (keyboard navigation + ARIA roles).  
- Kept the styling minimal to focus on functionality.  

### How to Run
```bash
npm install
npm run dev


