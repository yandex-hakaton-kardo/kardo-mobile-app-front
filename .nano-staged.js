export default {
  'src/**/*.{ts,tsx}': () => ['tsc -p tsconfig.app.json  --noEmit'],
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{css,scss}': ['stylelint --fix', 'prettier --write'],
  '!(*.{ts,tsx,css,scss})': ['prettier --write --ignore-unknown'],
};
