// module.exports = {
//     "env": {
//         "es6": true,
//         "node": true
//     },
//     "extends": [
//         "plugin:react/recommended",
//         "airbnb"
//     ],
//     "globals": {
//         "Atomics": "readonly",
//         "SharedArrayBuffer": "readonly"
//     },
//     "parserOptions": {
//         "ecmaFeatures": {
//             "jsx": true
//         },
//         "ecmaVersion": 11,
//         "sourceType": "module"
//     },
//     "plugins": [
//         "react"
//     ],
//     "rules": {
//     }
// };

module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:testing-library/react',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'testing-library',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};