import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
    pluginJs.configs.recommended,
    prettierConfig,
    {
        languageOptions: {
            globals: globals.browser,
            ecmaVersion: 2021,
            sourceType: "module",
        },
        rules: {
            "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
            semi: ["error", "always"], // ";"
            quotes: ["error", "double"], // ""
            "class-methods-use-this": "off",
            "no-param-reassign": "off",
            camelcase: "off",
            "prettier/prettier": [
                "error",
                {
                    singleQuote: false, // ""
                },
            ],
        },
        plugins: {
            prettier: prettierPlugin, // Prettier como plugin do ESLint
        },
    },
];
