import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPrettierPlugin from 'eslint-plugin-prettier/recommended'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
    js.configs.recommended,
    eslintConfigPrettier,
    eslintPrettierPlugin,
    ...tseslint.configs.recommended,
    {
        plugins: {
            turbo: turboPlugin,
        },
        rules: {
            'turbo/no-undeclared-env-vars': 'warn',
        },
    },
    {
        ignores: ['**/build/**', '**/dist/**', '**/node_modules/**'],
    },
]
