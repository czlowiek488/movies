module.exports = {
  extends: 'airbnb-base',
  rules: {
    camelcase: [0, { properties: 'never' }],
    'max-len': [0],
    'no-param-reassign': [0, { props: false }],
    'class-methods-use-this': [0],
    'import/no-dynamic-require': [0],
    'global-require': [0],
    'object-curly-newline': [0],
    'no-await-in-loop': [0],
    'no-restricted-syntax': [0],
    'linebreak-style': ['error', 'unix'],
    'consistent-return': [0],
    'no-confusing-arrow': [0],
    'implicit-arrow-linebreak': [0],
    'no-extra-boolean-cast': [0],
  },
};
