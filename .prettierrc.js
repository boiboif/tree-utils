const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  plugins: [
    'prettier-plugin-two-style-order',
    'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson',
  ],
};
