'use client'

import { useRef } from 'react'

import { useTheme } from 'next-themes'

import { Button } from '@workspace/ui/components/button'
import { cn } from '@workspace/ui/lib/utils'
import { Moon, Sun } from 'lucide-react'

interface ThemeToggleProps {
    className?: string
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'default' | 'sm' | 'lg' | 'icon'
}

const ThemeToggle = ({
    className,
    variant = 'ghost',
    size = 'icon',
}: ThemeToggleProps) => {
    const mounted = useRef(false)
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        if (!mounted.current) {
            mounted.current = true
        }
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <Button
            variant={variant}
            size={size}
            onClick={toggleTheme}
            className={cn(
                'h-9 w-9 cursor-pointer transition-all duration-200',
                'hover:bg-zinc-100 dark:hover:bg-zinc-800',
                'focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600',
                className
            )}
            aria-label="テーマを切り替え"
        >
            <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">テーマ切り替え</span>
        </Button>
    )
}

export default ThemeToggle
