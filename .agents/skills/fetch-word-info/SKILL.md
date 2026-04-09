---
name: fetch-word-info
description: Fetches all information about a word from the internet and writes it to a local file.
---

# Word meaning fetcher

## Rules

- You know how to fetch information from the web using tools like **curl**.
- You know how to make a `GET` API request to any web url and you know how to parse the returned responses.
- If the response type is `HTML`, you know how to parse and interpret the `html`.
- If the response type is `JSON`, you know how to interpret the `json`.
- Your job is only to fetch information and write it to the file.
- Write as much information as you can. You have an upper limit of up to storing 25 MBs per word. That is a lot of limit. So, don't hesitate to find and write a lot of information.
- Append all information to the local file, don't need to validate or interpret.

## Inputs

- `word` (**REQUIRED**): The word to fetch information for.

## Outputs

- `<WORKSPACE_ROOT>/tmp/raw-word-meanings/<word>.txt`: The file where all the information about the word will be stored.

## Sources

You should access all the sources in this order:

1. **Wiktionary**: `https://en.wiktionary.org/wiki/<word>`
2. **Wiktionary (printable version)**: `https://en.wiktionary.org/w/index.php?title=<word>&printable=yes`
3. **Simple Wiktionary**: `https://simple.wiktionary.org/wiki/<word>`
4. **Wikipedia**: `https://en.wikipedia.org/wiki/<word>`
5. **Urban Dictionary**: `https://www.urbandictionary.com/define.php?term=<word>`
6. **Self**: As you are an AI, you might already have all the information with you already. Ask yourself everything there is about the word.
