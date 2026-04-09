---
name: process-word-batch
description: Processes the batch of words.
---

# Word batch processor

## Inputs

- `batch-name` (**REQUIRED**): The name of the batch file.
- `force-update` (**OPTIONAL**, default: `false`): Whether to force update the word definition file.

## Prechecks

- Check if you got the name of the batch file in input. If not, exit
  early and inform the user about the missing batch file name.
- Check if the file name exists in
  `<WORKSPACE_ROOT>/tmp/word-batches/<batch-name>` file. If not, exit
  early and inform the user that the batch file doesn't exist under
  `<WORKSPACE_ROOT>/tmp/word-batches/` directory.
- To check if a word definition already exists, split the letters
  and join them with `/` and add a suffix of `_.json`. Then, check if
  the path exists under `<WORKSPACE_ROOT>/data` directory. For example:
  if you want to check if the word `apple` exists, you should check if
  the path `<WORKSPACE_ROOT>/data/a/p/p/l/e/_.json` exists. Another example:
  word=`don't`, you should check the path
  `<WORKSPACE_ROOT>/data/d/o/n/'/t/_.json`.

## Rules

1. When processing a word from the batch, if the word definition file
   already exists under `<WORKSPACE_ROOT>/data` directory, skip updating
   that word. This is the default behavior.
2. If the user has asked to do a force update, then update the word
   definition file even if it exists.
3. **CRITICAL QUALITY REQUIREMENT**: Do NOT generate placeholder definitions or single-item arrays simply for the sake of speed. You MUST generate a fully complete `_.json` file that includes **all prominent definitions, examples, and appropriate parts of speech** for the word within the `meanings` array.
4. **CRITICAL ORDERING REQUIREMENT**: The parts of speech inside the meanings array MUST strictly follow the exact order specified inside `README.md` (under the Type Definition API Contract). You MUST refer to `README.md` to get the single-source-of-truth ordering!
5. **SOURCE RESTRICTION**: Do NOT reach out to dictionaryapi.dev or its subdomains as it is not a reliable source.

## Processing

1. Fetch the contents of the batch from
   `<WORKSPACE_ROOT>/tmp/word-batches/<batch-name>` file.
2. For each word in the batch, fetch the raw word meaning using the
   `word-meaning-fetcher` agent.
3. Once you have the raw word meaning of the word stored in the local
   tmp file, parse the word meaning using the `word-meaning-parser` agent.
4. Once you have parsed the meaning of the word and written it in the
   local tmp file, use the `word-meaning-writer` agent to finalize the
   word definition by writing it to `<WORKSPACE_ROOT>/data` directory.

## Processing order

- As raw meaning fetching of each word is independant, you can fetch
  the raw meanings of words in parallel. Use multiple instances of the
  `word-meaning-fetcher` agent to do the fetching in parallel.
- Do not proceed to the next step of parsing word meaning before all
  the raw meanings of words in the batch are fetched.
- Once the raw meanings of all the words in the batch are fetched, parse
  them in parallel using the `word-meaning-parser` agent. As the parsing of
  each word meaning is independant, you can parse them in parallel. Use
  multiple instances of the `word-meaning-parser` agent to do the parsing in parallel.
- Do not proceed to the next step of writing word meaning before all
  the word meanings in the batch are parsed.
- Once the word meanings of all the words in the batch are parsed, write
  them in parallel using the `word-meaning-writer` agent. As the writing of
  each word meaning is independant, you can write them in parallel. Use
  multiple instances of the `word-meaning-writer` agent to do the writing in parallel.
- Try to have at least 5 subagents doing things in parallel. If not
  possible, try doing it with 4, then 3 and then finally try with 2. If the
  system is not able to handle even 2 instances of subagents at a time, then
  fallback to just having 1 instance of a subagent that does the requested
  task.
