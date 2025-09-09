export default function debugLog(...args) {
  const stack = new Error().stack.split("\n")[2]; // caller line
  const match = stack.match(/\((.*):(\d+):(\d+)\)/);
  
  if (match) {
    const file = match[1].split("/").slice(-2).join("/"); // last 2 parts of path
    const line = match[2];
    const col = match[3];
    console.log(`[${file}:${line}:${col}]`, ...args);
  } else {
    console.log(...args);
  }
}
