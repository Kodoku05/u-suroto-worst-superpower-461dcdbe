// Entry line: 88 code points; the gate allows 1-140.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const entry = "I can make any password unguessable, but only by making it the password you just forgot.";

async function main() {
  const length = [...entry].length;
  if (length < 1 || length > 140 || /[\r\n]/u.test(entry) || !entry.trim()) {
    throw new Error("Entry must be 1-140 non-whitespace code points on one line.");
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "entry.txt"), entry, "utf8");
}

main().catch((error) => {
  console.error(`Failed to write entry: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
