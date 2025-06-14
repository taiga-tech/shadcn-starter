import { nextJsConfig } from '@workspace/eslint-config/next'

/** @type {import("eslint").Linter.Config} */
export default [
    ...nextJsConfig,
    {
        rules: {
            'turbo/no-undeclared-env-vars': 'off',
        },
    },
]
