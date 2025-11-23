'use client'

import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef, useMemo } from 'react'

import Link from 'next/link'

import { Button, buttonVariants } from '@workspace/ui/components/button'
import { cn } from '@workspace/ui/lib/utils'
import type { VariantProps } from 'class-variance-authority'

export interface ButtonLinkProps
    extends VariantProps<typeof buttonVariants>,
        Omit<ComponentPropsWithoutRef<typeof Link>, 'className'> {
    href: string
    external?: boolean
    className?: string
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
    (
        {
            href,
            target,
            external = false,
            className,
            children,
            variant,
            size,
            ...props
        },
        ref
    ) => {
        // 外部リンクの場合は自動的にtarget="_blank"を設定
        const linkProps = useMemo(() => {
            const isExternalLink = external || href.startsWith('http')
            const linkTarget = target || (isExternalLink ? '_blank' : undefined)
            const rel = isExternalLink ? 'noopener noreferrer' : undefined

            return { target: linkTarget, rel }
        }, [external, href, target])

        return (
            <Button
                asChild
                variant={variant}
                size={size}
                className={cn(className)}
            >
                <Link href={href} ref={ref} {...linkProps} {...props}>
                    {children}
                </Link>
            </Button>
        )
    }
)

ButtonLink.displayName = 'ButtonLink'
