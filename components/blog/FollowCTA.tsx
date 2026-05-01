'use client'

import { motion } from 'framer-motion'
import { FaLinkedin, FaMedium, FaRss } from 'react-icons/fa6'
import type { ComponentType } from 'react'
import { LINKEDIN_URL, MEDIUM_URL } from '@/lib/blog/config'
import { BLOG_PATH, BlogLang, UI_LABELS } from '@/lib/blog/types'

interface FollowCTAProps {
  lang: BlogLang
}

interface ChannelCard {
  href: string
  external: boolean
  Icon: ComponentType<{ className?: string }>
  iconClass: string
  label: string
  sublabel: string
}

export function FollowCTA({ lang }: FollowCTAProps) {
  const labels = UI_LABELS[lang]
  const rssHref = `${BLOG_PATH[lang]}/feed.xml`

  const channels: ChannelCard[] = [
    {
      href: MEDIUM_URL,
      external: true,
      Icon: FaMedium,
      iconClass: 'text-gray-900',
      label: labels.followMediumLabel,
      sublabel: labels.followMediumSublabel,
    },
    {
      href: rssHref,
      external: false,
      Icon: FaRss,
      iconClass: 'text-accent-500',
      label: labels.followRssLabel,
      sublabel: labels.followRssSublabel,
    },
    {
      href: LINKEDIN_URL,
      external: true,
      Icon: FaLinkedin,
      iconClass: 'text-primary-700',
      label: labels.followLinkedinLabel,
      sublabel: labels.followLinkedinSublabel,
    },
  ]

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm">
      <h3 className="font-heading text-xl md:text-2xl font-bold text-gray-900 mb-2">
        {labels.followTitle}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl">
        {labels.followSubtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {channels.map((channel, i) => {
          const { Icon } = channel
          const linkProps = channel.external
            ? { target: '_blank', rel: 'noopener noreferrer' as const }
            : {}
          return (
            <motion.a
              key={channel.href}
              href={channel.href}
              {...linkProps}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="group block rounded-xl border border-gray-200 bg-white p-5 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <Icon className={`w-7 h-7 mb-3 ${channel.iconClass}`} />
              <p className="font-semibold text-gray-900 group-hover:text-primary-800 transition-colors">
                {channel.label}
              </p>
              <p className="text-sm text-gray-500 mt-1">{channel.sublabel}</p>
            </motion.a>
          )
        })}
      </div>

      <p className="mt-6 text-xs text-gray-500 italic">
        {labels.followFooterNote}
      </p>
    </section>
  )
}
