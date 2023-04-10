# open-dictionary

An initiative to create a dictionary which is open to all and maintained by all.

## Why?

* No free API
* No reliable source as an API
* No easy-to-use API
* GitHub's servers are more reliable than a custom host managed by a small group of people without any funding

## Where do I source my data from?

I just search a word on wiktionary. For example:

* Apple: https://en.wiktionary.org/wiki/apple
* Running: https://en.wiktionary.org/wiki/running

## Contributions

Checkout the [Contributions guide](./CONTRIBUTING.md)

## FAQs

### Why not use https://dictionaryapi.dev?

https://dictionaryapi.dev/ is an excellent tool for getting the word definitions. It has a few drawbacks though:

* It is hosted on the author's server which is not reliable. Lot of people have reported it being unavailable or getting
  rate limit throttled
* Author makes use
  of [undocumented Google API](https://github.com/meetDeveloper/freeDictionaryAPI/blob/239fd2ec930eb2a9c947bf1dda84292290797003/modules/dictionary.js#L138-L142)
  to fetch the definition and the Google API looks very fragile. If Google decides to change the output, the Author's
  API will break or return malformed response.
* Author parses the free text in a type unsafe manner which is dangerous and difficult to debug
