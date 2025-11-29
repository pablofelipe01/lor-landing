'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionHeader } from './ui'
import { sectionIds } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

export function UseCases() {
  const { t } = useI18n()

  const useCases = [
    {
      id: 'safety',
      title: t('useCases.safety.title'),
      subtitle: t('useCases.safety.subtitle'),
      description: t('useCases.safety.description'),
      image: '/images/use-case-safety.jpeg',
      stats: [
        { value: t('useCases.safety.stat1Value'), label: t('useCases.safety.stat1Label') },
        { value: t('useCases.safety.stat2Value'), label: t('useCases.safety.stat2Label') },
        { value: t('useCases.safety.stat3Value'), label: t('useCases.safety.stat3Label') },
      ],
      features: [
        t('useCases.safety.feature1'),
        t('useCases.safety.feature2'),
        t('useCases.safety.feature3'),
        t('useCases.safety.feature4'),
      ],
      color: 'secondary',
    },
    {
      id: 'education',
      title: t('useCases.education.title'),
      subtitle: t('useCases.education.subtitle'),
      description: t('useCases.education.description'),
      image: '/images/use-case-education.jpeg',
      stats: [
        { value: t('useCases.education.stat1Value'), label: t('useCases.education.stat1Label') },
        { value: t('useCases.education.stat2Value'), label: t('useCases.education.stat2Label') },
        { value: t('useCases.education.stat3Value'), label: t('useCases.education.stat3Label') },
      ],
      features: [
        t('useCases.education.feature1'),
        t('useCases.education.feature2'),
        t('useCases.education.feature3'),
        t('useCases.education.feature4'),
      ],
      color: 'accent',
    },
    {
      id: 'agriculture',
      title: t('useCases.agriculture.title'),
      subtitle: t('useCases.agriculture.subtitle'),
      description: t('useCases.agriculture.description'),
      image: '/images/use-case-agriculture.jpeg',
      stats: [
        { value: t('useCases.agriculture.stat1Value'), label: t('useCases.agriculture.stat1Label') },
        { value: t('useCases.agriculture.stat2Value'), label: t('useCases.agriculture.stat2Label') },
        { value: t('useCases.agriculture.stat3Value'), label: t('useCases.agriculture.stat3Label') },
      ],
      features: [
        t('useCases.agriculture.feature1'),
        t('useCases.agriculture.feature2'),
        t('useCases.agriculture.feature3'),
        t('useCases.agriculture.feature4'),
      ],
      color: 'primary',
    },
  ]

  const additionalUseCases = [
    t('useCases.forestRangers'),
    t('useCases.indigenous'),
    t('useCases.medical'),
    t('useCases.community'),
  ]

  return (
    <section id={sectionIds.useCases} className="section-padding bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          badge={t('useCases.badge')}
          title={t('useCases.title')}
          subtitle={t('useCases.subtitle')}
        />

        <div className="space-y-20">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                  useCase.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                  useCase.color === 'secondary' ? 'bg-secondary-100 text-secondary-700' :
                  'bg-accent-100 text-accent-700'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    useCase.color === 'primary' ? 'bg-primary-500' :
                    useCase.color === 'secondary' ? 'bg-secondary-500' :
                    'bg-accent-500'
                  }`} />
                  {useCase.subtitle}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {useCase.title}
                </h3>

                <p className="text-lg text-gray-600 mb-8">
                  {useCase.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {useCase.stats.map((stat) => (
                    <div key={stat.label} className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <div className={`text-2xl font-bold font-mono ${
                        useCase.color === 'primary' ? 'text-primary-600' :
                        useCase.color === 'secondary' ? 'text-secondary-600' :
                        'text-accent-600'
                      }`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {useCase.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        useCase.color === 'primary' ? 'text-primary-500' :
                        useCase.color === 'secondary' ? 'text-secondary-500' :
                        'text-accent-500'
                      }`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={useCase.image}
                    alt={useCase.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Decorative */}
                <div className={`absolute -z-10 w-64 h-64 rounded-full blur-3xl opacity-30 ${
                  useCase.color === 'primary' ? 'bg-primary-300' :
                  useCase.color === 'secondary' ? 'bg-secondary-300' :
                  'bg-accent-300'
                } ${index % 2 === 0 ? '-bottom-10 -right-10' : '-bottom-10 -left-10'}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional use cases mention */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 mb-6">{t('useCases.alsoApplicable')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {additionalUseCases.map((item) => (
              <span
                key={item}
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm border border-gray-100"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
