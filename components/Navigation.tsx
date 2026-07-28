'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { sectionIds } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

export function Navigation() {
  const { language, setLanguage, t } = useI18n()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname() ?? '/'
  const router = useRouter()

  const isHome = pathname === '/' || pathname === ''
  const isEnBlog = pathname.startsWith('/en/blog')
  const isEsBlog = pathname.startsWith('/blog') && !isEnBlog
  const isOnBlog = isEnBlog || isEsBlog

  // When not on the home page, anchors must include the home prefix.
  const anchorPrefix = isHome ? '' : '/'
  const anchor = (id: string) => `${anchorPrefix}#${id}`

  const navItems: Array<{ label: string; href: string; highlight?: boolean; isLink?: boolean }> = [
    { label: t('nav.problem'), href: anchor(sectionIds.problem) },
    { label: t('nav.solution'), href: anchor(sectionIds.solution) },
    { label: t('nav.useCases'), href: anchor(sectionIds.useCases) },
    { label: t('nav.impact'), href: anchor(sectionIds.impact) },
    { label: t('nav.roadmap'), href: anchor(sectionIds.roadmap) },
    { label: t('nav.faq'), href: anchor(sectionIds.faq) },
    { label: t('nav.blog'), href: isEnBlog ? '/en/blog/' : '/blog/', isLink: true },
    // Seccion empresarial desactivada temporalmente
    // { label: t('nav.b2b'), href: anchor(sectionIds.b2b), highlight: true },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Force the i18n context to match the URL when on a blog page so the rest of
  // the chrome (Footer, etc.) speaks the same language as the post.
  useEffect(() => {
    if (isEnBlog && language !== 'en') setLanguage('en')
    else if (isEsBlog && language !== 'es') setLanguage('es')
  }, [isEnBlog, isEsBlog, language, setLanguage])

  // On non-blog pages we keep the default behavior (toggle the i18n context).
  // On blog pages, the toggle navigates to the equivalent index in the other
  // language. The per-post `LanguageSwitcher` handles per-article translation.
  const toggleLanguage = () => {
    if (isOnBlog) {
      router.push(isEnBlog ? '/blog/' : '/en/blog/')
      return
    }
    setLanguage(language === 'es' ? 'en' : 'es')
  }

  // Display label for the toggle: shows the OTHER language code.
  const togglerLabel = isOnBlog
    ? isEnBlog ? 'ES' : 'EN'
    : language === 'es' ? 'EN' : 'ES'

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container-custom px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary-500">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <span className="font-bold text-lg hidden sm:block text-gray-900">
                {language === 'es' ? 'Conectividad Rural' : 'Rural Connectivity'}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-5">
              {navItems.map((item) => {
                const className = item.highlight
                  ? 'px-3 py-1.5 bg-primary-500 text-white rounded-full hover:bg-primary-600 text-sm font-medium transition-colors'
                  : `text-sm font-medium transition-colors hover:text-primary-600 ${isScrolled ? 'text-gray-600' : 'text-gray-700'}`
                if (item.isLink) {
                  return (
                    <Link key={item.href} href={item.href} className={className}>
                      {item.label}
                    </Link>
                  )
                }
                return (
                  <a key={item.href} href={item.href} className={className}>
                    {item.label}
                  </a>
                )
              })}
            </div>

            {/* Desktop Language Switcher */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-white/80 text-gray-700 hover:bg-white'
                }`}
                aria-label={`Switch to ${togglerLabel}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                {togglerLabel}
              </button>
            </div>

            {/* Mobile: Language + Menu button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                aria-label={`Switch to ${togglerLabel}`}
              >
                {togglerLabel}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const className = item.highlight
                      ? 'block py-3 px-4 text-lg font-medium rounded-lg bg-primary-500 text-white hover:bg-primary-600'
                      : 'block py-3 px-4 text-lg font-medium rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                    if (item.isLink) {
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={className}
                        >
                          {item.label}
                        </Link>
                      )
                    }
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={className}
                      >
                        {item.label}
                      </a>
                    )
                  })}
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    {language === 'es'
                      ? 'Protegiendo ninos • Democratizando educacion'
                      : 'Protecting children • Democratizing education'
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
