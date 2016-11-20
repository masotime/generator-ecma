# generator-ecma

Creates an es2015 / stage-0 cli application or node module, with a number of opinions:

* stage-0
* eslint with plugin-import-resolver

Your node application is created with a few simple prompts and is up and running quickly. CLI applications are initiated via `npm start`, and node modules have the requisite `prepublish` and `compile` scripts to make sure your code is transpiled before being published.

## node modules

If you choose to generate a node modules, the following additional opinions are imposed:

* transform-runtime (with babel-runtime)

The idea is to get you up and running as quickly as possible with a node module using the latest Babel features, and in the case of a node module, something that is guaranteed to work out-of-the-box on most Node runtimes with Babel transpilation.

**NOTE** `babel-polyfill` was not an enforced option, so global prototype helpers changes such as `Array.prototype.includes` are **NOT** available.
# usage

```
npm i -g yo generator-ecma
yo ecma
```