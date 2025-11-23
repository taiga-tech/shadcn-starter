// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { nextJsConfig } from '@workspace/eslint-config/next'
import type { Linter } from 'eslint'
import storybook from 'eslint-plugin-storybook'

const config: Linter.Config[] = [
    ...(nextJsConfig as Linter.Config[]),
    ...(storybook.configs['flat/recommended'] as unknown as Linter.Config[]),
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@next/next/no-html-link-for-pages': 'off',
        },
    },
]

export default config
