import { spawn } from 'child_process'

async function updateDependencies() {
    console.log('🔄 Starting dependency updates...')

    try {
        // Update root package dependencies
        console.log('📦 Updating root package dependencies...')
        await runCommand('pnpm', ['update', '--latest'])

        // Update all workspace dependencies
        console.log('🏢 Updating all workspace dependencies...')
        await runCommand('pnpm', ['update', '--latest', '--recursive'])

        // Deduplicate dependencies
        console.log('🧹 Deduplicating dependencies...')
        await runCommand('pnpm', ['dedupe'])

        // Reinstall dependencies for consistency
        console.log('🔧 Reinstalling dependencies...')
        await runCommand('pnpm', ['install'])

        // Run type checking
        console.log('🔍 Running type checking...')
        try {
            await runCommand('pnpm', ['check-types'])
            console.log('✅ Type checking passed')
        } catch {
            console.log('❌ Type checking failed')
            console.log('Please fix type errors manually')
        }

        // Run linting
        console.log('🧪 Running lint checks...')
        try {
            await runCommand('pnpm', ['lint'])
            console.log('✅ Linting passed')
        } catch {
            console.log('⚠️  Lint errors found')
            console.log('Attempting automatic fixes...')
            try {
                await runCommand('pnpm', ['lint', '--fix'])
            } catch {
                console.log('⚠️  Please fix remaining lint errors manually')
            }
        }

        // Final build test
        console.log('🏗️  Running build test...')
        try {
            await runCommand('pnpm', ['build'])
            console.log('✅ All dependency updates completed successfully')
            console.log('')
            console.log('📋 To review updated dependencies, run:')
            console.log('   git diff package.json')
            console.log('   git diff apps/*/package.json')
            console.log('   git diff packages/*/package.json')
        } catch {
            console.log('❌ Build failed')
            console.log(
                'Dependency updates may have introduced breaking changes'
            )
            console.log('Please fix issues manually')
            process.exit(1)
        }
    } catch (error) {
        console.error('❌ Error during dependency update:', error)
        process.exit(1)
    }
}

function runCommand(command: string, args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            stdio: 'inherit',
            shell: process.platform === 'win32',
        })

        child.on('close', (code) => {
            if (code === 0) {
                resolve()
            } else {
                reject(new Error(`Command failed with exit code ${code}`))
            }
        })

        child.on('error', (error) => {
            reject(error)
        })
    })
}

updateDependencies().catch(console.error)
