import { nextJsConfig } from '@workspace/eslint-config/next'
import type { Linter } from 'eslint'

const config: Linter.Config[] = [
    ...nextJsConfig,
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            'turbo/no-undeclared-env-vars': 'off',
        },
    },
]

export default config
