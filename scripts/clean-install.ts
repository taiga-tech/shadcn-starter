import fs from 'fs/promises'
import path from 'path'

async function cleanProject() {
    console.log('🧹 Cleaning project dependencies and cache...')

    try {
        // プロジェクトルートのnode_modules削除
        await removeDirectory(
            'node_modules',
            '📦 Removing root node_modules...'
        )

        // .turboディレクトリ削除
        await removeDirectory('.turbo', '🚀 Removing .turbo cache...')

        // apps配下のnode_modules削除
        await removeDirectoriesRecursively('apps', 'node_modules')

        // packages配下のnode_modules削除
        await removeDirectoriesRecursively('packages', 'node_modules')

        // .turboディレクトリを再帰的に削除
        await removeDirectoriesRecursively('.', '.turbo')

        console.log('✅ Cleanup completed!')
        console.log("💡 Run 'pnpm install' to reinstall dependencies")

        // 依存関係の再インストール
        const { spawn } = await import('child_process')
        const pnpmProcess = spawn('pnpm', ['install'], { stdio: 'inherit' })

        pnpmProcess.on('close', (code) => {
            if (code === 0) {
                console.log('✅ Dependencies installed successfully!')
            } else {
                console.error(`❌ pnpm install failed with code ${code}`)
                process.exit(code || 1)
            }
        })
    } catch (error) {
        console.error('❌ Error during cleanup:', error)
        process.exit(1)
    }
}

async function removeDirectory(dirPath: string, message?: string) {
    try {
        await fs.access(dirPath)
        if (message) console.log(`  ${message}`)
        await fs.rm(dirPath, { recursive: true, force: true })
    } catch (error) {
        // ディレクトリが存在しない場合は無視
    }
}

async function removeDirectoriesRecursively(
    basePath: string,
    targetDirName: string
) {
    try {
        const items = await fs.readdir(basePath, { withFileTypes: true })

        for (const item of items) {
            if (item.isDirectory()) {
                const itemPath = path.join(basePath, item.name)

                if (item.name === targetDirName) {
                    await removeDirectory(
                        itemPath,
                        `  📦 Removing ${itemPath}...`
                    )
                } else {
                    // 再帰的に探索
                    await removeDirectoriesRecursively(itemPath, targetDirName)
                }
            }
        }
    } catch (error) {
        // ディレクトリが存在しない場合は無視
    }
}

cleanProject().catch(console.error)
