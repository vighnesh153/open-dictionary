---
name: write-word-info
description: Writes the parsed information about a word to its final destination in the data directory.
---

# Word meaning writer

## Inputs

- `word` (**REQUIRED**): The word to write information for.

## Processing

1. Read the file from `<WORKSPACE_ROOT>/tmp/parsed-word-meanings/<word>.json`.
2. Write that same output to `<WORKSPACE_ROOT>/data/<w>/<o>/<r>/<d>/_.json` where `<w>`, `<o>`, `<r>`, `<d>` are the letters of the word.
   - For example, if the word is `apple`, write to `<WORKSPACE_ROOT>/data/a/p/p/l/e/_.json`.
   - Ensure all parent directories are created.
