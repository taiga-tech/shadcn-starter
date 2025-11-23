import { StorybookConfig } from '@storybook/nextjs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'path'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
    stories: ['../stories/*.stories.tsx', '../stories/**/*.stories.tsx'],

    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-docs'),
        getAbsolutePath('@storybook/addon-a11y'),
    ],

    framework: {
        name: getAbsolutePath('@storybook/nextjs'),
        options: {},
    },

    core: {},

    webpackFinal: async (config) => {
        if (config.resolve) {
            config.resolve.alias = {
                ...config.resolve.alias,
                '@': resolve(__dirname, '../../../packages/ui/'),
            }
        }
        return config
    },

    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: false,
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) =>
                prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
        },
    },
}

export default config

function getAbsolutePath(value: string) {
    return dirname(require.resolve(join(value, 'package.json')))
}
