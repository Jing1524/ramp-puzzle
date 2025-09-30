# Ramp Take-Home Challenge

This repository documents my approach to the Ramp frontend take-home puzzle.  
It is structured in two parts:

- **Part 1 — Puzzle Decoding:** Solving the initial Base64/DOM-style puzzle and extracting the token.  
- **Part 2 — React Flag App:** Building the required React app using the decoded token.

---

## Part 1 — Puzzle Decoding

### Goal
Decode the hidden string provided in the challenge into a usable token/URL.

### Steps
1. **Inspection:** Determined the string was Base64 (or Base64URL).  
2. **Padding/Validation:** Ensured proper padding (`=`) so the length is divisible by 4.  
3. **Decoding:** Tried multiple approaches:
   - **Browser:** `atob("string")`  
   - **Node.js:** `Buffer.from("string", "base64").toString("utf8")`  
   - **Python:** `base64.b64decode("string")`  
   - For reproducibility, I wrote a small helper script at [`/scripts/decode.ts`]

### Solution Output
Decoded string:
#### (output below — included here for completeness)
https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/ramp-challenge-instructions/


## Part 2 — React Flag App

# Ramp Challenge
### Goal
Use the decoded token from Part 1 to retrieve a flag from Ramp’s challenge endpoint and render it in a React application according to the given requirements.

### Requirements (summarized)
- Make an HTTP request to the provided URL.  
- Show a `"Loading..."` state during fetch.  
- Render the returned flag string:
  - As a list, where each character is a `<li>` element.  
  - With a typewriter effect (1/2 second delay per character).  
  - The animation runs once, after loading finishes.  
- Only use React and browser APIs — no external libraries for fetching or animation.  


### My Implementation
- Built a small Typewriter component to progressively reveal characters.
- Added a loading state with a short delay before rendering so that "Loading..." doesn’t flicker on very fast requests (a common UX polish).
- Included basic error handling for failed requests.
- Used an AbortController in useEffect cleanup to avoid setting state after unmount (under React 18 Strict Mode).
- Kept styling minimal to focus on functionality.
- Left a comment in the source with the DOM extraction one-liner (see top of app.tsx)

### Bonus — DOM Extraction Script
```js
const url = [...document.querySelectorAll(
  "section[data-id^='92'] article[data-class$='45'] div[data-tag*='78'] b.ref"
)]
  .map(el => el.getAttribute("value"))
  .join("");

console.log(url);
copy?.(url); // optional, copies to clipboard in DevTools
```


