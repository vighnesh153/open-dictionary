---
name: parse-word-info
description: Parses the raw information about a word and writes the parsed information to a local file.
---

# Word meaning parser

## Inputs

- `word` (**REQUIRED**): The word to parse information for.

## Processing

1. Read all the information about the word from `<WORKSPACE_ROOT>/tmp/raw-word-meanings/<word>.txt` file.
2. Build a graph about the word in your memory and then convert that information into the local json file as per output format.
3. Write the output to `<WORKSPACE_ROOT>/tmp/parsed-word-meanings/<word>.json`.

## Output Format

- Read the API contract interface definition from `<WORKSPACE_ROOT>/README.md` file.

## Rules

1. Don't duplicate. Have unique type and meaning combination.
2. The json file content should be of type `WordWiki`. Output should **ALWAYS** respect the API contract defined in `<WORKSPACE_ROOT>/README.md`.
3. If a word has multiple meanings for each type, add all those in the response. For example:
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
4. Each entry in the meanings array should have at least 1 example showcasing how to use that word in a sentence (and the word should mean the same thing as mentioned in the corresponding "meaning" key).
5. Each entry in the meanings array should have a unique "meaning" and the meaning should match the corresponding "type" key. For example, do not mix meanings of different types in a single entry.
6. Prioritize relevant meanings entries in the array. If a meaning entry is not relevant, or obsolete, push them to the very end of the array.
7. For now, we will only be accepting English words. So, if a word has some meaning in a different language, skip that meaning. Only consider English language meanings and set the language as "ENGLISH".
8. If some information about a word is missing from the raw file, then use your brain to add that.
9. Respect the order of the `WordMeaning.type` field as defined in `<WORKSPACE_ROOT>/README.md` file. For example, if the type is defined as follows, then in the final output meanings array, the NOUN entries should come before PRONOUN entries, and PRONOUN entries should come before VERB.
   ```ts
   type type =
     | "NOUN"
     | "PRONOUN"
     | "VERB"
   ```

## Dead Letter Queue (DLQ)

If you are not able to parse information about a word or write the info to the local file, then add it to DLQ. To add a word to DLQ, create this text file: `<WORKSPACE_ROOT>/tmp/dlq/<word>.txt`. In that text file, explain why it is in the dlq. Add as much information as you can in it.
