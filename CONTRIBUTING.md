# Contributions

See an issue in the word definition file? Have a word that isn't in the dataset? Feel free to create a GitHub issue
describing the bug or new-word request and if you could create a pull request to fix the issue, it would be awesome ❤️

> Please only create a single word issues and pull requests. It makes it easier to review quickly. If you have multiple
> words in your PR, I would end up procrastinating because reviewing a huge PR needs a lot of time.

## How to contribute?

- You need node installed on your system. Prefer [nvm](https://github.com/nvm-sh/nvm) to install
- Fork the repository
- Clone the forked repository on your local system
- Create a new branch

```shell
git checkout -b "<your-word>"
# Example:
# git checkout -b apple
# git checkout -b banana

```

- Install dependencies

```shell
npm install

```

- Create the definition for your new word

```shell
npm run create-word-definition "<your-word>"
# Example:
# npm run create-word-definition apple
# npm run create-word-definition banana

```

- Verify if the format and information is correct

> You can verify the information here `https://en.wiktionary.org/wiki/<your-word>`

- Commit your changes

```shell
git add .
git commit -m "feat: add word <your-word>"
# Example:
# git commit -m "feat: add word apple"
# git commit -m "feat: add word banana"

```

> Note: This step will take time because of the number of files present in the repository. Don't panic

- Push the change to your repository
- Raise a pull request against this repository
