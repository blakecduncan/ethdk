module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  ignorePatterns: ['test/**/*', 'dist/**/*', 'node_modules/**/*'],
  rules: {
    indent: ['error', 2]
  }
}
