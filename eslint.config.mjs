import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import checkFile from "eslint-plugin-check-file";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),

  // ── File naming: enforce kebab-case for all source files ──
  {
    files: ["src/**/*"],
    plugins: {
      "check-file": checkFile,
    },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          // All ts/tsx files must be kebab-case (allows [param] dynamic routes)
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        { ignoreMiddleExtensions: true },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          // Folders must be kebab-case (allows [param] and _private conventions)
          "src/**/": "NEXT_JS_APP_ROUTER_CASE",
        },
      ],
    },
  },


  // ── Unused imports: auto-remove on fix ──
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },

  // ── General production rules ──
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Enforce consistent type imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // No console.log in production code (warn allows dev use, error on CI)
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Prefer const over let when variable is never reassigned
      "prefer-const": "error",

      // No var — use let/const
      "no-var": "error",

      // Enforce strict equality
      eqeqeq: ["error", "always"],

      // No duplicate imports from same module
      "no-duplicate-imports": "error",

      // Curly braces required for all control flow (no ambiguous one-liners)
      curly: ["error", "all"],
    },
  },
]);

export default eslintConfig;
