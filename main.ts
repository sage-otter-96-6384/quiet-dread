// Two Days of Quiet Dread — make.fun entry.
// Writes one code review comment to entry.txt: a single line that approves
// a pull request while carrying quiet existential dread.
//
// The comment: "LGTM. Tests pass, the logic is sound, and I have never been
// less sure what any of this is for." — it approves, and the dread is in
// the second half: everything works, and none of it means anything.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "LGTM. Tests pass, the logic is sound, and I have never been less sure what any of this is for.";
const MAX_CHARS = 140;

function checkEntry(entry: string): void {
  if (entry.length === 0 || entry.length > MAX_CHARS) {
    throw new Error(`entry must be 1 to ${MAX_CHARS} characters, got ${entry.length}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
checkEntry(ENTRY);
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, ENTRY, "utf8");
// Read it back: the file the judge sees must be exactly the comment, byte for byte.
if (readFileSync(target, "utf8") !== ENTRY) {
  throw new Error("entry.txt does not match the entry");
}
