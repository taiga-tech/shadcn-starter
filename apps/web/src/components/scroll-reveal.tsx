'use client'

import { useRef } from 'react'

import { motion, useInView } from 'motion/react'

interface ScrollRevealProps {
    children: React.ReactNode
    direction?: 'up' | 'down' | 'left' | 'right'
    delay?: number
    duration?: number
    className?: string
}

const ScrollReveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className,
}: ScrollRevealProps) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
        },
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.25, 0, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default ScrollReveal
