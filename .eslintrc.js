// https://docs.expo.dev/guides/using-eslint/
// module.exports = {
//   extends: 'expo',
//   ignorePatterns: ['/dist/*'],
// };
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@react-native',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/func-call-spacing': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/no-unstable-nested-components': 'error',
  },
  ignorePatterns: ['/dist/*', '.eslintrc.js'],
};
