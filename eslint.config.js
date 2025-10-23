import js from '@eslint/js';
import globals from 'globals';
import vitest from 'eslint-plugin-vitest';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// compute __dirname for ESM config files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig([
  globalIgnores(['dist', 'build', 'coverage', '.triplex']),
  // include recommended configs as top-level entries so they apply correctly
  js.configs.recommended,
  // NOTE: do not apply TypeScript plugin configs at the top-level — keep them inside
  // the TypeScript-only override below so TS rules don't leak into JS files.

  {
    // Apply TypeScript-specific rules only to application source and config files
    files: [
      'src/**/*.{ts,tsx}',
      'tests/**/*.{ts,tsx}',
      'vite.config.ts',
      'vitest.config.ts',
      'playwright.config.ts',
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        // required for type-aware rules from recommendedTypeChecked
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // merge recommended rules from plugins (apply type-aware configs only for TS)
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs['recommended-type-checked'].rules,
      ...tsPlugin.configs['stylistic-type-checked'].rules,

      // overrides for Babylon.js project
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/require-await': 'off',
    },
  },
  // JavaScript override: for .js files without TypeScript rules
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
    },
  },

  // Node / config files override: enable node globals for build scripts and config files
  {
    files: [
      'eslint.config.js',
      '.eslintrc.{js,cjs,mjs}',
      'vite.config.{js,cjs,mjs}',
      'postcss.config.mjs',
      'playwright.config.ts',
      'scripts/**',
      'tools/**',
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.node,
    },
    // add Node-specific rule tweaks here if desired
  },
  // Tests (Vitest) override — declare test globals so linting test files doesn't error
  {
    files: ['**/*.{spec,test}.{ts,tsx,js,jsx}'],
    // prefer the plugin's recommended settings when the plugin is installed
    plugins: { vitest },
    extends: [vitest.configs.recommended],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly',
      },
    },
    // Tests frequently use dynamic imports, unknowns, and loose typing — relax
    // strict runtime-safety rules in tests so they don't require defensive type
    // plumbing that would reduce readability.
    rules: {
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
    },
  },

]);
