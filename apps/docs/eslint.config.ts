// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { nextJsConfig } from '@workspace/eslint-config/next'
import storybook from 'eslint-plugin-storybook'

/** @type {import("eslint").Linter.Config[]} */
export default [...nextJsConfig, ...storybook.configs['flat/recommended']]
