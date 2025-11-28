'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
  light?: boolean
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  className,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn(
        'mb-12 md:mb-16',
        centered && 'text-center',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      {badge && (
        <span className={cn(
          'inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-4',
          light
            ? 'bg-white/20 text-white'
            : 'bg-primary-100 text-primary-700'
        )}>
          {badge}
        </span>
      )}
      <h2 className={cn(
        'text-3xl md:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-balance',
        light ? 'text-white' : 'text-gray-900'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 text-lg md:text-xl max-w-3xl',
          centered && 'mx-auto',
          light ? 'text-white/80' : 'text-gray-600'
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
