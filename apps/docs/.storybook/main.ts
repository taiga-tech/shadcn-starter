import { StorybookConfig } from '@storybook/nextjs'
import { resolve } from 'path'

const config: StorybookConfig = {
    stories: ['../stories/*.stories.tsx', '../stories/**/*.stories.tsx'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/nextjs',
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

    docs: {
        autodocs: true,
    },
}

export default config
