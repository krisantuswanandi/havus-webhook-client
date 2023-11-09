module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-prettier",
    "@vue/eslint-config-typescript/recommended",
  ],
};
