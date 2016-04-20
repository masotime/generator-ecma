# generator-ecma

Because generator-es2015 and other good names were already taken.

This is "beta" software - currently it generates only a "program" as opposed to a "module" that you can publish.

Currently opinionated to include:

* `stage-0`
* `babel-eslint` and `.eslintrc` with the following enabled:
  * modules
  * object rest spread
  * for-of

# usage

```
npm i -g yo generator-ecma
yo ecma
```

Then follow the prompts. The folder created will have an `index.js` in the source folder, simply type `npm start` to run your application.