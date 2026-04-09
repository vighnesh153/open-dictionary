import { ensureFile } from "@std/fs";

const allWords: string[] = [];

for (const entry of Deno.readDirSync("./tmp/word-batches")) {
  if (entry.isFile) {
    const content = Deno.readTextFileSync(`./tmp/word-batches/${entry.name}`);
    const words = content.split("\n");

    allWords.push(...words);
    // console.log(words);
  }
}

await Promise.all(
  allWords.map((word) => word.trim())
    .filter((w) => !!w)
    .map((w) => w.replace(".", ""))
    .map((word) => ensureFile(`./data/${word.split("").join("/")}/_.json`)),
);
