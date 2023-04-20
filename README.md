<h1 style="text-align: center">🐶 Open Dictionary 🦄</h1>

<div style="display: flex; justify-content: center; gap: 10px;">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/vighnesh153/open-dictionary">
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/vighnesh153/open-dictionary">
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/vighnesh153/open-dictionary">
  <img alt="GitHub watchers" src="https://img.shields.io/github/watchers/vighnesh153/open-dictionary">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/vighnesh153/open-dictionary">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/vighnesh153/open-dictionary">
  <img alt="License" src="https://img.shields.io/github/license/vighnesh153/open-dictionary" />
</div>

## Introduction

A free simple-to-use **English** dictionary for everyone.

## How to use?

### GitHub URL (**RECOMMENDED**)

* Break your word into single letters and create a `/`-separated path
* Prefix the path with `https://raw.githubusercontent.com/vighnesh153/open-dictionary/main/data/`
* Suffix the path with `/_.json`

#### Example

For fetching the definition of `apple`

```txt
https://raw.githubusercontent.com/vighnesh153/open-dictionary/main/data/a/p/p/l/e/_.json
```

### My custom Cloudflare worker (for quick testing)

Pass your word to this url as a search parameter: `https://open-dictionary.vighnesh153.workers.dev/?word=<your-word>`

#### Examples

```txt
https://open-dictionary.vighnesh153.workers.dev/?word=apple
https://open-dictionary.vighnesh153.workers.dev/?word=banana
```

> Note: This approach is not recommended because this worker has a free limit of 100K requests per day. If a lot of
> people are using this, then your application might hit a downtime if the threshold is breached

## Why does this exist?

- No other free API for getting English definitions of a word
- No other trusted source for fetching definitions as an API
- No reliable (in terms of uptime and rate limiting) server

## How does this solve the above-mentioned problems?

- This is a free repository. You don't need to pay a single penny for using this. Although you are welcome to sponsor
  this project if you are interested 🙌
- This repository is trustworthy because everyone can see the word definitions as code. This offers transparency and
  trust for developers.
- GitHub's servers are more reliable than a custom server managed by a small group of people without any funding

## Missing word?

Found a word which is not available in this repository?

* Create an issue specifying which word is missing
* It would be more awesome if you could also raise a PR for the issue

Checkout the [Contributions](#contributions) section.

## Where do I source my data from?

A simple search on wiktionary. For example:

- Apple: https://en.wiktionary.org/wiki/apple
- Banana: https://en.wiktionary.org/wiki/running
- Running: https://en.wiktionary.org/wiki/running

## Type Definition (API Contract)

The `json` files will have a type of `WordWiki` described below:

```ts
interface WordWiki {
    word: string;
    etymologies: Array<Etymology>;
}

interface Etymology {
    description: Array<string>;
    nouns: Array<PartOfSpeech>;
    verbs: Array<PartOfSpeech>;
    adjectives: Array<PartOfSpeech>;
    prepositions: Array<PartOfSpeech>;
    adverbs: Array<PartOfSpeech>;
}

interface PartOfSpeech {
    description: string;
    definitionGroups: Array<DefinitionGroup>;
}

interface DefinitionGroup {
    description: string;
    entries: Array<{
        meaning: string;
        examples: Array<string>;
    }>;
}
```

## Contributions

Checkout the [Contributions guide](./CONTRIBUTING.md)

## FAQs

### Why not use https://dictionaryapi.dev?

https://dictionaryapi.dev/ is an excellent tool for getting the word definitions. It has a few drawbacks though:

- It is hosted on the author's server which is not reliable. Lot of people have reported it being unavailable or getting
  rate limit throttled
- Author makes use of
  [undocumented Google API](https://github.com/meetDeveloper/freeDictionaryAPI/blob/239fd2ec930eb2a9c947bf1dda84292290797003/modules/dictionary.js#L138-L142)
  to fetch the definition and the Google API looks very fragile. If Google decides to change the output, the Author's
  API will break or return malformed response.
