# Contributions

See an issue in the word definition file? Have a word that isn't in the dataset? Feel free to create a GitHub issue
describing the bug or new-word request and if you could create a pull request to fix the issue, it would be awesome ❤️

## How to contribute?

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