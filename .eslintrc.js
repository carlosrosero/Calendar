module.exports = {
  "parser": "babel-eslint",

  "extends": ["airbnb"],

  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true,
      "jsx": true
    }
  },

  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true,
    "jquery": true
  },

  "plugins": [
    "react",
    "babel"
  ],

  "globals": {
    "define": true
  },

  "rules": {
    "react/jsx-filename-extension": ["off"],
    "max-len": ["off"],
    "global-require": ["off"],
    "arrow-body-style": ["off"],
    "arrow-parens": [2, "always"],
    "object-curly-spacing": [1, "never"],
    "import/no-extraneous-dependencies": ["off"],
    "import/no-unresolved": "off",
    "no-prototype-builtins": "off",
    "import/prefer-default-export": "off",
    "no-console": "off",
    "no-param-reassign": "off",
    "react/prefer-stateless-function": "warn",
    "react/no-string-refs": "off",
    "react/sort-comp": "off",
    "import/imports-first": "off",
    "import/extensions": "off",
    "no-plusplus": "off",
    "no-unused-vars": "warn",
    "jsx-a11y/label-has-for": "off",
    "react/forbid-prop-types": "off",
    "object-curly-spacing": "off",
    "babel/object-curly-spacing": "warn"
  }
}
