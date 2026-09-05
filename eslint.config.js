import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";

const sharedRules = {
  "no-ternary": "warn",
  "no-duplicate-imports": "warn",
  "sort-keys": "warn",

  "arrow-body-style": "off",
  "one-var": "off",
  "sort-imports": "off",

  "@typescript-eslint/no-explicit-any": "warn",
  "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
};

export default tseslint.config(
  {
    ignores: ["**/dist", "**/node_modules", "**/.astro", "**/*.config.{ts,js,mjs}"],
  },

  {
    files: ["packages/vector-ui/src/**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    plugins: {
      react: react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
      "react/prop-types": "off",

      ...sharedRules,
    },
    settings: {
      react: { version: "detect" },
    },
  },

  ...eslintPluginAstro.configs.recommended,
  {
    files: ["docs/**/*.{ts,tsx,js,jsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    rules: {
      ...sharedRules,
    },
  },
);
