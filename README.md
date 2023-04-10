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

See an issue in the word definition file? Have a word that isn't in the dataset? Feel free to create a GitHub issue
describing the bug or new-word request and if you could create a pull request to fix the issue, it would be awesome ❤️

### How to contribute?

* You need node installed on your system. Prefer [nvm](https://github.com/nvm-sh/nvm) to install
* Fork the repository
* Clone the forked repository
* Create a new branch

```shell
git checkout -b <your-word>
# Example:
# git checkout -b apple
# git checkout -b banana
```

* Create the file for the word

```shell
npm run new-word <your-word>
# Example:
# npm run new-word apple
# npm run new-word banana
```

* Fetch the word info from this link: https://en.wiktionary.org/wiki/<your-word>
* Edit the `_.json` file in your word's directory in the specified format
* Verify if the format and the information is correct.
* Commit your changes

```shell
git commit -m "feat: add word <your-word>"
# Example:
# git commit -m "feat: add word apple"
# git commit -m "feat: add word banana"
```

* Push the change to your repository
* Raise a pull request against this repository

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
