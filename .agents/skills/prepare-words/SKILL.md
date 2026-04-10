---
name: prepare-words
description: Prepares the words for processing by collecting them into a single file.
---

# Word preparer

## Rules

- Each step in this skill should be done serially. No parallelism to avoid race
  conditions and write locks.

## Steps

1. Shallow clone the following repositories under under `<WORKSPACE_ROOT>/tmp/`
   directory and pick only the specified file names from each repositiry:
   - Repository: `https://github.com/en-wl/wordlist-diff`
     - File names
       - en_AU-large.txt
       - en_AU.txt
       - en_CA-large.txt
       - en_CA.txt
       - en_GB-ise.txt
       - en_GB-ize.txt
       - en_GB-large.txt
       - en_US-large.txt
       - en_US.txt

2. Create `<WORKSPACE_ROOT>/tmp/all-words.txt` file and for each of the files
   from previous step, keep pushing all the contents of it to this new temporary
   file.

3. Append all the words from `<WORKSPACE_ROOT>/metadata/all-words.txt` to this
   temporary file.

4. Once all the words have been populated in the above-mentioned temporary file,
   sort all the words in alphabetical order, convert all of them to lowercase
   and remove the duplicates.

5. Move the resulting list of unique words into a single file located at
   `<WORKSPACE_ROOT>/tmp/words.txt`.

6. Clean up all temporary files created in this process except for the
   `<WORKSPACE_ROOT>/tmp/words.txt` file.

7. Initialize the directories for all the words. You can refer the following
   deno script.

```ts
import { ensureFile } from "@std/fs";

await Promise.all(
  Deno.readTextFileSync("./tmp/words.txt")
    .split("\n")
    .map((word) => word.trim().replace(".", ""))
    .filter((w) => !!w)
    .map((word) => ensureFile(`./data/${word.split("").join("/")}/_.json`)),
);
```

> Note: `./` above refers to the `<WORKSPACE_ROOT>/` directory.
