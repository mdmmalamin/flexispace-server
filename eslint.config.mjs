import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [{
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",
      }
    },
    // parser: "@typescript-eslint/parser",
    // parserOptions: {
    //   ecmaVersion: "latest",
    //   sourceType: "module"
    // },
    ignores: ["**/node_modules/", ".dist/"],
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-undef": "error",
      "no-console": "warn"
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];