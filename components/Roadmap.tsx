'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from './ui'
import { sectionIds } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

export function Roadmap() {
  const { t } = useI18n()

  const phases = [
    {
      phase: 1,
      title: t('roadmap.phase1Title'),
      duration: t('roadmap.phase1Duration'),
      description: t('roadmap.phase1Desc'),
      tasks: [
        t('roadmap.phase1Task1'),
        t('roadmap.phase1Task2'),
        t('roadmap.phase1Task3'),
        t('roadmap.phase1Task4'),
        t('roadmap.phase1Task5'),
        t('roadmap.phase1Task6'),
      ],
      status: 'upcoming',
      color: 'primary',
    },
    {
      phase: 2,
      title: t('roadmap.phase2Title'),
      duration: t('roadmap.phase2Duration'),
      description: t('roadmap.phase2Desc'),
      tasks: [
        t('roadmap.phase2Task1'),
        t('roadmap.phase2Task2'),
        t('roadmap.phase2Task3'),
        t('roadmap.phase2Task4'),
        t('roadmap.phase2Task5'),
      ],
      status: 'upcoming',
      color: 'secondary',
    },
    {
      phase: 3,
      title: t('roadmap.phase3Title'),
      duration: t('roadmap.phase3Duration'),
      description: t('roadmap.phase3Desc'),
      tasks: [
        t('roadmap.phase3Task1'),
        t('roadmap.phase3Task2'),
        t('roadmap.phase3Task3'),
        t('roadmap.phase3Task4'),
        t('roadmap.phase3Task5'),
        t('roadmap.phase3Task6'),
      ],
      status: 'upcoming',
      color: 'accent',
    },
  ]

  const deliverables = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: t('roadmap.deliverable1Title'),
      description: t('roadmap.deliverable1Desc'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: t('roadmap.deliverable2Title'),
      description: t('roadmap.deliverable2Desc'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('roadmap.deliverable3Title'),
      description: t('roadmap.deliverable3Desc'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: t('roadmap.deliverable4Title'),
      description: t('roadmap.deliverable4Desc'),
    },
  ]

  return (
    <section id={sectionIds.roadmap} className="section-padding bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          badge={t('roadmap.badge')}
          title={t('roadmap.title')}
          subtitle={t('roadmap.subtitle')}
        />

        {/* Timeline */}
        <div className="relative mb-20">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-secondary-200 to-accent-200" />

          <div className="grid lg:grid-cols-3 gap-8">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Phase indicator */}
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-6 shadow-lg ${
                  phase.color === 'primary' ? 'bg-primary-500' :
                  phase.color === 'secondary' ? 'bg-secondary-500' :
                  'bg-accent-500'
                }`}>
                  {phase.phase}
                </div>

                {/* Card */}
                <div className={`bg-white rounded-2xl p-6 shadow-lg border-t-4 ${
                  phase.color === 'primary' ? 'border-primary-500' :
                  phase.color === 'secondary' ? 'border-secondary-500' :
                  'border-accent-500'
                }`}>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                    phase.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                    phase.color === 'secondary' ? 'bg-secondary-100 text-secondary-700' :
                    'bg-accent-100 text-accent-700'
                  }`}>
                    {phase.duration}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                  <p className="text-gray-600 mb-4">{phase.description}</p>

                  <ul className="space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          phase.color === 'primary' ? 'text-primary-500' :
                          phase.color === 'secondary' ? 'text-secondary-500' :
                          'text-accent-500'
                        }`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">{t('roadmap.deliverablesTitle')}</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Location note */}
        <motion.div
          className="mt-12 p-6 bg-earth-50 rounded-2xl border border-earth-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-earth-100 rounded-xl flex items-center justify-center text-earth-600 flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{t('roadmap.locationTitle')}</h4>
              <p className="text-gray-600">
                {t('roadmap.locationDesc')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
