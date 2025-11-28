'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'

interface StatCardProps {
  value: string
  label: string
  prefix?: string
  suffix?: string
  description?: string
  icon?: React.ReactNode
  variant?: 'default' | 'highlight' | 'dark'
  className?: string
  delay?: number
}

export function StatCard({
  value,
  label,
  prefix,
  suffix,
  description,
  icon,
  variant = 'default',
  className,
  delay = 0,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (isInView) {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
      if (!isNaN(numericValue)) {
        const duration = 2000
        const startTime = Date.now()
        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easeOut = 1 - Math.pow(1 - progress, 3)
          const current = Math.floor(numericValue * easeOut)
          setDisplayValue(current.toString())
          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            setDisplayValue(value)
          }
        }
        setTimeout(animate, delay)
      } else {
        setDisplayValue(value)
      }
    }
  }, [isInView, value, delay])

  const variants = {
    default: 'bg-white border border-gray-100',
    highlight: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white',
    dark: 'bg-gray-900 text-white',
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        'rounded-2xl p-6 md:p-8 card-shadow',
        variants[variant],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {icon && (
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
          variant === 'default' ? 'bg-primary-100 text-primary-600' : 'bg-white/20'
        )}>
          {icon}
        </div>
      )}
      <div className={cn(
        'text-4xl md:text-5xl font-bold font-mono tracking-tight',
        variant === 'default' ? 'text-gray-900' : ''
      )}>
        {prefix}
        {displayValue}
        {suffix}
      </div>
      <div className={cn(
        'mt-2 text-lg font-semibold',
        variant === 'default' ? 'text-gray-900' : ''
      )}>
        {label}
      </div>
      {description && (
        <p className={cn(
          'mt-2 text-sm',
          variant === 'default' ? 'text-gray-500' : 'opacity-80'
        )}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
