'use client'

import { motion } from 'framer-motion'
import { SectionHeader, StatCard } from './ui'
import { sectionIds } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

export function Impact() {
  const { t } = useI18n()

  const impactStats = [
    {
      value: t('impact.stat1Value'),
      label: t('impact.stat1Label'),
      description: t('impact.stat1Desc'),
      variant: 'highlight' as const,
    },
    {
      value: t('impact.stat2Value'),
      label: t('impact.stat2Label'),
      description: t('impact.stat2Desc'),
      variant: 'default' as const,
    },
    {
      value: t('impact.stat3Value'),
      label: t('impact.stat3Label'),
      description: t('impact.stat3Desc'),
      variant: 'default' as const,
    },
    {
      value: t('impact.stat4Value'),
      label: t('impact.stat4Label'),
      description: t('impact.stat4Desc'),
      variant: 'default' as const,
    },
  ]

  const marketSegments = [
    { segment: t('impact.ruralStudents'), population: '~30 millones', potential: 'MUY ALTO', color: 'secondary' },
    { segment: t('impact.ruralAgriculture'), population: '77 millones', potential: 'Alto', color: 'primary' },
    { segment: t('impact.noMobileCoverage'), population: '44 millones', potential: 'Alto', color: 'primary' },
    { segment: t('impact.indigenousCommunities'), population: '~45 millones', potential: 'Medio', color: 'accent' },
  ]

  const economicReturns = [
    { stat: '0.15%', description: t('impact.gdpGrowth1') },
    { stat: '1.38%', description: t('impact.gdpGrowth2') },
    { stat: '15-20%', description: t('impact.betterPrices') },
    { stat: '$500B', description: t('impact.additionalGDP') },
  ]

  return (
    <section id={sectionIds.impact} className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <SectionHeader
          badge={t('impact.badge')}
          title={t('impact.title')}
          subtitle={t('impact.subtitle')}
        />

        {/* Main stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {impactStats.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              variant={stat.variant}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Market potential */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('impact.marketTitle')}</h3>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
              <div className="py-4 px-6 font-semibold text-gray-700">{t('impact.sector')}</div>
              <div className="py-4 px-6 font-semibold text-gray-700 text-center">{t('impact.population')}</div>
              <div className="py-4 px-6 font-semibold text-gray-700 text-center">{t('impact.potential')}</div>
            </div>
            {marketSegments.map((segment, index) => (
              <motion.div
                key={segment.segment}
                className={`grid grid-cols-3 border-b border-gray-100 last:border-0 ${
                  segment.potential === 'MUY ALTO' ? 'bg-secondary-50/50' : ''
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="py-4 px-6 font-medium text-gray-900">{segment.segment}</div>
                <div className="py-4 px-6 text-center text-gray-600 font-mono">{segment.population}</div>
                <div className="py-4 px-6 text-center">
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                    segment.potential === 'MUY ALTO' ? 'bg-secondary-100 text-secondary-700' :
                    segment.potential === 'Alto' ? 'bg-primary-100 text-primary-700' :
                    'bg-accent-100 text-accent-700'
                  }`}>
                    {segment.potential}
                  </span>
                </div>
              </motion.div>
            ))}
            <div className="grid grid-cols-3 bg-gray-900 text-white">
              <div className="py-4 px-6 font-bold">{t('impact.totalPotential')}</div>
              <div className="py-4 px-6 text-center font-mono font-bold">~180 millones</div>
              <div className="py-4 px-6 text-center">
                <span className="text-secondary-400">{t('impact.latinAmerica')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Economic returns */}
        <motion.div
          className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">{t('impact.economicImpact')}</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {economicReturns.map((item, index) => (
              <motion.div
                key={item.stat}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl font-bold font-mono text-white">{item.stat}</div>
                <p className="mt-2 text-sm text-primary-100">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-center text-primary-100 text-sm">
            {t('impact.sources')}
          </p>
        </motion.div>

        {/* Success metrics preview */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center text-secondary-600 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900">{t('impact.goalSafety')}</h4>
            <p className="text-3xl font-bold text-secondary-600 mt-2">{t('impact.goalSafetyValue')}</p>
            <p className="text-sm text-gray-500 mt-1">{t('impact.goalSafetyDesc')}</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900">{t('impact.goalSatisfaction')}</h4>
            <p className="text-3xl font-bold text-accent-600 mt-2">{t('impact.goalSatisfactionValue')}</p>
            <p className="text-sm text-gray-500 mt-1">{t('impact.goalSatisfactionDesc')}</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900">{t('impact.goalOperational')}</h4>
            <p className="text-3xl font-bold text-primary-600 mt-2">{t('impact.goalOperationalValue')}</p>
            <p className="text-sm text-gray-500 mt-1">{t('impact.goalOperationalDesc')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
