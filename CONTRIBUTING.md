# Contributions

See an issue in the word definition file? Have a word that isn't in the dataset? Feel free to create a GitHub issue
describing the bug or new-word request and if you could create a pull request to fix the issue, it would be awesome ❤️

## How to contribute?

- You need node installed on your system. Prefer [nvm](https://github.com/nvm-sh/nvm) to install
- Fork the repository
- Clone the forked repository
- Create a new branch

```shell
git checkout -b <your-word>
# Example:
# git checkout -b apple
# git checkout -b banana
```

- Create the definition for your new word

```shell
npm run create-word-definition <your-word>
# Example:
# npm run create-word-definition apple
# npm run create-word-definition banana
```

- Verify if the format and information is correct
    - You can open this link to verify the information: https://en.wiktionary.org/wiki/<your-word>
- Verify if the format and the information is correct.
- Commit your changes

```shell
git commit -m "feat: add word <your-word>"
# Example:
# git commit -m "feat: add word apple"
# git commit -m "feat: add word banana"
```

- Push the change to your repository
- Raise a pull request against this repository
