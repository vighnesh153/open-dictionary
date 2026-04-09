---
name: prepare-word-batches
description: Prepares the batches of words for processing.
---

# Word batch preparer

## Rules

- Each step in this skill should be done serially. No parallelism
  to avoid race conditions and write locks.

## Steps

1. Clone the following repositories under under
   `<WORKSPACE_ROOT>/tmp/` directory and pick only the specified
   file names from each repositiry:
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

2. Create `<WORKSPACE_ROOT>/tmp/all-words.txt` file and for each of
   the files from previous step, keep pushing all the contents of it to
   this new temporary file.

3. Append all the words from `<WORKSPACE_ROOT>/metadata/all-words.txt`
   to this temporary file.

4. Once all the words have been populated in the above-mentioned
   temporary file, sort all the words in alphabetical order, convert
   all of them to lowercase and remove the duplicates.

5. Create batches with 20 words in each batch under
   `<WORKSPACE_ROOT>/tmp/word-batches/` directory. The name of the
   batches should be `batch-0001.txt`, `batch-0002.txt`, etc.

6. Clean up all temporary files created in this except for the
   `word-batches` directory. **DO NOT CLEAN UP THE `word-batches` DIRECTORY**.
