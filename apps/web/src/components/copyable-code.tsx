'use client'

import { useState } from 'react'

import { Button } from '@workspace/ui/components/button'
import { cn } from '@workspace/ui/lib/utils'
import { Check, Copy } from 'lucide-react'

interface CopyableCodeProps {
    code: string | string[]
    className?: string
    title?: string
}

const CopyableCode = ({ code, className, title }: CopyableCodeProps) => {
    const [copied, setCopied] = useState(false)

    const codeString = Array.isArray(code) ? code.join('\n') : code

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(codeString)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            const textArea = document.createElement('textarea')
            textArea.value = codeString
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div
            className={cn(
                'group relative overflow-hidden rounded-lg bg-zinc-50 dark:bg-zinc-800',
                className
            )}
        >
            {title && (
                <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {title}
                    </span>
                </div>
            )}

            <div className="relative">
                <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-700 dark:text-zinc-300">
                    {Array.isArray(code)
                        ? code.map((line, index) => (
                              <div key={index} className="mb-1 last:mb-0">
                                  {line}
                              </div>
                          ))
                        : code}
                </pre>

                <Button
                    onClick={copyToClipboard}
                    size="sm"
                    variant="ghost"
                    className={cn(
                        'absolute top-2 right-2 h-8 w-8 p-0 opacity-0 transition-all duration-200',
                        'group-hover:opacity-100',
                        'hover:bg-zinc-200 focus-visible:opacity-100 dark:hover:bg-zinc-700'
                    )}
                    aria-label="コードをコピー"
                >
                    {copied ? (
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                        <Copy className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                    )}
                </Button>
            </div>

            {copied && (
                <div className="absolute top-2 right-12 rounded bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-200">
                    コピーしました！
                </div>
            )}
        </div>
    )
}

export default CopyableCode
