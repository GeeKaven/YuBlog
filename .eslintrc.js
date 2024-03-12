/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:astro/recommended'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {},
    },
  ],
}

// {
//   "env": {
//     "browser": true,
//     "es2021": true
//   },
//   "extends": [
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:@typescript-eslint/recommended"
//   ],
//   "overrides": [],
//   "parser": "@typescript-eslint/parser",
//   "parserOptions": {
//     "ecmaVersion": "latest",
//     "sourceType": "module"
//   },
//   "plugins": ["react", "@typescript-eslint"],
//   "rules": {
//     "react/react-in-jsx-scope": "off",
//     "@typescript-eslint/ban-ts-comment": "off"
//   }
// }
