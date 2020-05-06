module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true,
    jest: true
  },
  extends: [
    'eslint-config-airbnb',
    'plugin:@typescript-eslint/recommended',
    "eslint-config-prettier", // Disable conflicting ruls
    'eslint-config-prettier/@typescript-eslint',
    'eslint-config-prettier/react',
    'plugin:jest/recommended',
    // Enable prettier plugin to run Prettier as an ESLint rule
    "plugin:prettier/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    "jest",
    // Runs Prettier as an ESLint rule
    'prettier',
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    '@typescript-eslint/no-var-requires': 0,
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.jsx', 'tsx'],
      },
    ],
    'linebreak-style': 0,
    'no-param-reassign': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'react/no-array-index-key': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/camelcase': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'no-restricted-syntax': 0,
    'no-plusplus': 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"]
      }
    ]
    // "dot-notation": [2, {"allowPattern": "^[a-z]+(_[a-z]+)+$"}]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
};
