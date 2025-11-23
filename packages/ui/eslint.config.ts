import { config } from '@workspace/eslint-config/react-internal'
import type { Linter } from 'eslint'

const eslintConfig: Linter.Config[] = [
    ...config,
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
]

export default eslintConfig
