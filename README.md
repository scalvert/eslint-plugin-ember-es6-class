# eslint-plugin-ember-es6-class

Eslint plugin for enforcing usages of ember es6 classes.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-ember-es6-class`:

```
$ npm install eslint-plugin-ember-es6-class --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-ember-es6-class` globally.

## Usage

Add `ember-es6-class` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "ember-es6-class"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "ember-es6-class/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





