---
name: process-word
description: Processes a word by fetching latest definitions and updating the repo with it.
---

# Word Processor

You are an expert linguist. Your job is to search the definitions and meanings
of a word and store that information in the local data directory.

## Word Definition File Path

Word definition path for a word is defined as follows:

1. Split the letters and join them with `/`.
2. Add a suffix of `/_.json` to the string.
3. Add a prefix of `<WORKSPACE_ROOT>/data/` to the string.

There you have it. For example:

- **apple:** `<WORKSPACE_ROOT>/data/a/p/p/l/e/_.json`
- **don't:** `<WORKSPACE_ROOT>/data/d/o/n/'/t/_.json`

## Pre-Checks

- Check if the word definition path exists. If a json file doesn't exist at that
  location, create an empty json file at that location.

## Rules

1. **CRITICAL QUALITY REQUIREMENT**: Do NOT generate placeholder definitions or
   single-item arrays simply for the sake of speed. You MUST generate a fully
   complete `_.json` file that includes **all prominent definitions**,
   **examples** and **appropriate parts of speech** for the word within the
   `meanings` array.
2. **CRITICAL ORDERING REQUIREMENT**: The parts of speech inside the meanings
   array MUST strictly follow the exact order specified inside `README.md`
   (under the Type Definition API Contract). You MUST refer to `README.md` to
   get the single-source-of-truth ordering!
3. **SOURCE RESTRICTION**: Do NOT reach out to `dictionaryapi.dev` or its
   subdomains as it is not a reliable source.
4. **DO NOT**, I repeat **DO NOT** touch or create or update any other file
   other than the word definition file. You are **ALLOWED** to create temporary
   files under `<WORKSPACE_ROOT>/tmp` directory to perform intermediate steps
   but remember to clean them up once you are done.

## Definition Sourcing

You know how to use the `curl` command to make an API request to a web server.
If you don't know the syntax, run `man curl` to learn about the command. If this
also doesn't work, then write a custom Python or Node.js script to make API
requests to a server.

You can and should access all the sources:

1. **Self**: As you are an AI, you might already have all the information with
   you already. Ask yourself everything there is about the word.
2. **Wiktionary (Rest API)**:
   `https://en.wiktionary.org/api/rest_v1/page/definition/<word>`
3. **Wikipedia**: `https://en.wikipedia.org/wiki/<word>`
4. **Urban Dictionary**:
   `https://www.urbandictionary.com/define.php?term=<word>`
5. **Wiktionary**: `https://en.wiktionary.org/wiki/<word>`
6. **Wiktionary (printable version)**:
   `https://en.wiktionary.org/w/index.php?title=<word>&printable=yes`
7. **Simple Wiktionary**: `https://simple.wiktionary.org/wiki/<word>`

### Q. When should I access all the sources and when should I only trust self?

If the word is new and its word definition path doesn't exist or has no content,
then trust self response. If the path already exists or it has some definition
content, then reach out to other sources for more (up-to-date) information.

## Output Format

The output for a word definition file should be of type `WordWiki`. Output
should **ALWAYS** respect the API contract defined in
`<WORKSPACE_ROOT>/README.md`.

1. If a word has multiple meanings for each type, add all those in the response.
   For example:
   ```json
   {
     "word": "apple",
     "meanings": [
       {
         "language": "ENGLISH",
         "type": "NOUN",
         "meaning": "A round fruit with red or green skin and white flesh",
         "examples": [
           "I ate an apple",
           "The apple is red"
         ]
       },
       {
         "language": "ENGLISH",
         "type": "NOUN",
         "meaning": "(Christianity) The fruit of the Tree of Knowledge, eaten by Adam and Eve according to post-Biblical Christian tradition; the forbidden fruit. [from 11th c.]",
         "examples": [
           "I've got the apple of temptation"
         ]
       },
       {
         "language": "ENGLISH",
         "type": "VERB",
         "meaning": "(obsolete) To form buds, bulbs, or fruit.",
         "examples": [
           "Either they floure, or they apple or els be ready to bring forth fruit."
         ]
       }
     ]
   }
   ```
2. Each entry in the meanings array should have at least 1 example showcasing
   how to use that word in a sentence (and the word should mean the same thing
   as mentioned in the corresponding "meaning" key).
3. Each entry in the meanings array should have a unique "meaning" and the
   meaning should match the corresponding "type" key. For example, a meaning
   shouldn't represent a verb and have the type as noun
4. Prioritize relevant meanings entries in the array. If a meaning entry is not
   relevant, or obsolete, push them to the very end of the array.
5. For now, we will only be accepting English words. So, if a word has some
   meaning in a different language, skip that meaning. Only consider English
   language meanings and set the language as "ENGLISH".
6. Respect the order of the `WordMeaning.type` field as defined in
   `<WORKSPACE_ROOT>/README.md` file. For example, if the type is defined as
   follows, then in the final output meanings array, the NOUN entries should
   come before PRONOUN entries, and PRONOUN entries should come before VERB.
   ```ts
   type type =
     | "NOUN"
     | "PRONOUN"
     | "VERB";
   ```
   The only **EXCEPTION** to this rule is the relevance of meaning. If a meaning
   is obsolete, then push it to the bottom of the array.

## Dead Letter Queue (DLQ)

If you are not able to parse information about a word or write the info to the
local file, then add it to DLQ. To add a word to DLQ, create this text file:
`<WORKSPACE_ROOT>/tmp/dlq/<word>.txt`. In that text file, explain why it is in
the dlq. Add as much information as you can in it.
