module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // style and readability
    'no-unused-vars': 'warn',          // warn if variables are declared and not used
    'no-console': 'warn',              // warn on console.log, but allow in dev
    'eqeqeq': 'error',                 // require === and !==
    'curly': 'error',                  // require curly braces for all control statements
    'semi': ['error', 'always'],       // require semicolons
    'quotes': ['error', 'single'],     // require single quotes
    'comma-dangle': ['error', 'always-multiline'], // require trailing commas when multiline
    'no-trailing-spaces': 'error',     // no trailing whitespace
    'eol-last': ['error', 'always'],   // enforce newline at end of files
    'indent': ['error', 2],            // 2-space indentation
  },
};
