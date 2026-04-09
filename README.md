<h1 style="text-align: center">🐶 Open Dictionary 🦄</h1>

<div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap">
  <img alt="Total words count" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fvighnesh153%2Fopen-dictionary%2Fmain%2Fmetadata%2Fword-count-label.json">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/vighnesh153/open-dictionary">
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/vighnesh153/open-dictionary">
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/vighnesh153/open-dictionary">
  <img alt="GitHub watchers" src="https://img.shields.io/github/watchers/vighnesh153/open-dictionary">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/vighnesh153/open-dictionary">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/vighnesh153/open-dictionary">
  <img alt="License" src="https://img.shields.io/github/license/vighnesh153/open-dictionary" />
</div>

## Introduction

A free and open dictionary for everyone.

## How to use?

> [!CAUTION]
> WORDS ARE CASE-SENSITIVE. ALWAYS USE LOWERCASE. OTHERWISE YOU
> WILL GET A 404.

### 1. 🚀 GitHub URL (**RECOMMENDED**)

- Break your word into single lowercased letters and create a
  `/`-separated path
- Prefix the path with `https://raw.githubusercontent.com/vighnesh153/open-dictionary/main/data/`
- Suffix the path with `/_.json`

#### Example

For fetching the definition of `Apple` or `APPLE` or `apple`.

```txt
https://raw.githubusercontent.com/vighnesh153/open-dictionary/main/data/a/p/p/l/e/_.json
```

### 2. 🛠️ My custom Cloudflare worker (for quick testing)

Pass your word to this url as a search parameter: `open-dictionary.vighnesh153.workers.dev?word=<your-word>`

> This worker does the hard work of splitting the word, constructing the
> url as discussed in the previous approach and returning the response from
> the URL.

#### Examples

- [open-dictionary.vighnesh153.workers.dev?word=apple](https://open-dictionary.vighnesh153.workers.dev/?word=apple)
- [open-dictionary.vighnesh153.workers.dev?word=banana](https://open-dictionary.vighnesh153.workers.dev/?word=banana)
- [open-dictionary.vighnesh153.workers.dev?word=cat](https://open-dictionary.vighnesh153.workers.dev/?word=cat)

> [!NOTE]
> This approach is not recommended because this worker has a free
> limit of 100K requests per day. If a lot of people are using this,
> then your application might hit a downtime if the threshold is breached.

### 3. ❌ Build your own URL builder

You can build your own Cloudflare worker or AWS Lambda that builds the URL for you.

- [Code to my cloudflare worker](https://github.com/vighnesh153/vighnesh153-monorepo/tree/main/tools-nodejs-legacy/cloudflare-open-dictionary-worker)

> But why would you do this? Using approach 1 is not that difficult. It just contains a couple of string manipulation
> steps.

## Type Definition (API Contract) ⚖️

The `json` files will have a type of `WordWiki` described below:

```ts
interface WordWiki {
  word: string;
  meanings: Array<WordMeaning>;
}

interface WordMeaning {
  language: "ENGLISH";
  type:
    | "NOUN"
    | "PRONOUN"
    | "VERB"
    | "PROVERB"
    | "ADVERB"
    | "ADJECTIVE"
    | "PREPOSITION"
    | "CONJUNCTION"
    | "INTERJECTION"
    | "LETTER"
    | "NUMBER"
    | "ABBREVIATION"
    | "DETERMINERS";
  meaning: string;
  examples: Array<string>;
}
```

## List of all words

Find all the words
here: [metadata/all-words.txt](https://raw.githubusercontent.com/vighnesh153/open-dictionary/main/metadata/all-words.txt)

## Why does this exist? 🧑🏼‍💻

- No other free API for getting English definitions of a word
- No other trusted source for fetching definitions as an API
- No reliable (in terms of uptime and rate limiting) server
- Asking an AI chatbot (Gemini or Chat GPT) for this is overkill
  because word meanings is mostly static information as the word meanings
  don't change often. No need to waste compute power or your precious
  savings to get the definition of a word from an AI chatbot.

## How does this solve the above-mentioned problems? 🏗️

- This is a free repository. You don't need to pay a single penny for
  using this. 🙌
- This repository is trustworthy because everyone can see the
  word definitions as code. This offers transparency and trust for
  developers.
- GitHub's servers are more reliable than a custom server managed by
  a small group of people without any funding
- Even though this repo uses AI to gather the definitions of a word,
  it caches the information in a standard contract. It doesn't make a
  fresh call to the AI server to get the word definitaion. And you don't
  have to pay a single penny to fetch the word definition.

## Word missing or something is not right in the json file? 🥹

File a bug. Please...

It is very likely that either AI goofed up or the definition of the
word has become outdated. Either way, I will fix it ASAP when you
bring it to my attention.

## Prompting guides

Using Antigravity/Jetski:

### 1. Fetching new words and creating definitions files of non-existent words

> [!NOTE]
> If you have a new data source for fetching a list of words,
> add it to the `.agents/skills/prepare-word-batches/config.md` file.

1. Preparation prompt

```md
Using the `prepare-word-batches` skill, prepare the batches of words.
```

2. Processing prompt

```md
Using the `process-word-batch` skill, process the batch
with batch-name=`batch-000001.txt`.
```

3. Review, git commit and push

### 2. Creating definition for a list of words or force-updating existing definitions

1. Preparation prompt

```md
Create a file under `<WORKSPACE_ROOT>/tmp/word-batches/my-batch.txt`
and add word1, word2, word3, ... in it (one word on each line).
```

2. Verify the batch file.
3. Process prompt

```md
Using the `process-word-batch` skill, process the batch with
batch-name=`my-batch.txt` and force-update=true to update the
definition of each word in the batch even if it exists.
```

4. Review, git commit and push

## FAQs 🐷

### Why not use https://dictionaryapi.dev?

https://dictionaryapi.dev/ is an excellent tool for getting the word
definitions. It has a few drawbacks though:

- It is hosted on the author's server which is not reliable. Lot of
  people have reported it being unavailable or getting rate limit throttled
- Author makes use of
  [undocumented Google API](https://github.com/meetDeveloper/freeDictionaryAPI/blob/239fd2ec930eb2a9c947bf1dda84292290797003/modules/dictionary.js#L138-L142)
  to fetch the definition and the Google API looks very fragile. If Google
  decides to change the output, the Author's API will break or return
  malformed response.
