# open-dictionary

An initiative to create an **English** dictionary which is open to all and maintained by all

> This dictionary is only for the English language. Please don't create issues requesting to add other languages

## How to use?

* Break your word into single letters and create a `/`-separated path
* Prefix the path with `https://raw.githubusercontent.com/vighnesh153/open-dictionary/main/data/`
* Suffix the path with `/_.json`

```txt
// Example: For getting the definition of "apple"
https://raw.githubusercontent.com/vighnesh153/open-dictionary/main/data/a/p/p/l/e/_.json
```

## Why?

- No other free API
- No other reliable source as an API
- No other easy-to-use API
- GitHub's servers are more reliable than a custom host managed by a small group of people without any funding

## Missing word?
If a word is missing, you can either
* Create an issue specifying which word is missing
* It would be more awesome if you could also raise a PR for the issue

Checkout the [Contributions](#contributions) section.

## Where do I source my data from?

A simple search on wiktionary. For example:

- Apple: https://en.wiktionary.org/wiki/apple
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
- Author parses the free text in a type unsafe manner which is dangerous and difficult to debug
