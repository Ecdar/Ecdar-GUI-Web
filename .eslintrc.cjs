module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:svelte/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    extraFileExtensions: [".svelte"],
    project: ["./tsconfig.json"],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
  rules: {
    /**
     * TODO: Remove existing uses of JS prompts and make this an error.
     * We should be using our own UI components everywhere.
     */
    "no-alert": "warn",
    /**
     * TODO: Remove existing uses of console and make this an error.
     * Production code should not output to the default console.
     */
    "no-console": "warn",
    "@typescript-eslint/no-invalid-void-type": [
      "error",
      { allowAsThisParameter: true },
    ],
  },
};
