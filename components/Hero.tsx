'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { CTAButton } from './ui'
import { sectionIds } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

export function Hero() {
  const { t } = useI18n()
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <>
      <section
        id={sectionIds.hero}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-5" />

        <div className="container-custom section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
                {t('hero.badge')}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-gray-900 text-balance">
                {t('hero.title1')}{' '}
                <span className="gradient-text">{t('hero.title2')}</span>{' '}
                {t('hero.title3')}
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl">
                {t('hero.description')} <strong>{t('hero.safety')}</strong>,{' '}
                <strong>{t('hero.education')}</strong> {t('hero.and')}{' '}
                <strong>{t('hero.agriculture')}</strong> {t('hero.descriptionEnd')}{' '}
                <span className="text-primary-600 font-semibold">
                  {t('hero.cheaper')}
                </span>
              </p>

              {/* Key stats inline */}
              <div className="mt-8 flex flex-wrap gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary-600 font-mono">{t('hero.stat1Value')}</div>
                  <div className="text-sm text-gray-500">{t('hero.stat1Label')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary-600 font-mono">{t('hero.stat2Value')}</div>
                  <div className="text-sm text-gray-500">{t('hero.stat2Label')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-600 font-mono">{t('hero.stat3Value')}</div>
                  <div className="text-sm text-gray-500">{t('hero.stat3Label')}</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap gap-4">
                <CTAButton href={`#${sectionIds.funding}`} size="lg">
                  {t('hero.cta')}
                </CTAButton>
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-primary-300 hover:text-primary-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  {t('hero.watchVideo')}
                </button>
              </div>

            </motion.div>

            {/* Hero Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-student-path.jpeg"
                  alt={t('hero.imageAlt')}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t('hero.notification')}</p>
                      <p className="text-sm text-gray-500">{t('hero.notificationTime')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-50 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary-200 rounded-full opacity-50 blur-2xl" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <a
            href={`#${sectionIds.problem}`}
            className="flex flex-col items-center text-gray-400 hover:text-primary-600 transition-colors"
          >
            <span className="text-sm mb-2">{t('hero.scroll')}</span>
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </a>
        </motion.div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80"
              onClick={() => setIsVideoOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal content */}
            <motion.div
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Video */}
              <div className="aspect-video">
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                  src="/videos/video1.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
