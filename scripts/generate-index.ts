import fs from 'fs'

const targetDirs = [
    './apps/web/src/lib/json-ld',
    './apps/web/src/lib/fonts',
]

targetDirs.forEach((dir) => {
    // ファイル読み込み
    fs.readdir(dir, (err, files) => {
        if (err) throw err
        console.log('\u001b[32m' + `index path: ${dir}/index.ts` + '\u001b[0m')
        const content = makeIndexContent(files)
        console.log('%F{110}' + content)
        fs.writeFile(dir + '/index.ts', content, (err) => {
            if (err !== null) console.error(err)
        })
    })
})

const makeIndexContent = (files: string[]) => {
    let content = ''
    files.forEach((item: string) => {
        const file = item.replace(/.tsx?/, '')
        if (file === 'index') {
            return
        }
        content += `export * from './${file}'\n`
        // 'export { default as ' + file + " } from './" + file + "'\n\n"
    })
    return content
}
