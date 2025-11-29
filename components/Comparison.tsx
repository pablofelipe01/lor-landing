'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from './ui'
import { sectionIds } from '@/lib/utils'

const comparisonData = {
  infrastructure: {
    title: 'Comparacion de Infraestructura',
    rows: [
      {
        feature: 'Costo inicial',
        traditional: '$85,000 - $170,000',
        ours: '$400 - $600',
        highlight: true,
      },
      {
        feature: 'Costo operativo mensual',
        traditional: '$5,000 - $10,000 (50-100 Starlinks)',
        ours: '$118/mes (1 Starlink + mesh)',
        highlight: true,
      },
      {
        feature: 'Tiempo de implementacion',
        traditional: '6 - 12 meses',
        ours: '2 - 5 dias',
        highlight: true,
      },
      {
        feature: 'Escalabilidad',
        traditional: 'Baja',
        ours: 'Muy alta',
        highlight: false,
      },
      {
        feature: 'Dependencia electrica',
        traditional: 'Red electrica',
        ours: 'Solar 100%',
        highlight: false,
      },
      {
        feature: 'Densidad requerida',
        traditional: '100-500 usuarios/km2',
        ours: 'Sin requisitos',
        highlight: true,
      },
    ],
  },
  features: {
    title: 'Comparacion de Caracteristicas',
    rows: [
      {
        feature: 'Redes sociales',
        traditional: 'Si (distraccion)',
        ours: 'No',
        better: 'ours',
      },
      {
        feature: 'Publicidad',
        traditional: 'Si',
        ours: 'Cero',
        better: 'ours',
      },
      {
        feature: 'Contenido educativo',
        traditional: 'Mezclado',
        ours: '100%',
        better: 'ours',
      },
      {
        feature: 'Seguridad GPS integrada',
        traditional: 'No',
        ours: 'Integrado',
        better: 'ours',
      },
      {
        feature: 'Costo por estudiante/mes',
        traditional: '$20 - $50',
        ours: '$2-6',
        better: 'ours',
      },
      {
        feature: 'Requiere cobertura movil',
        traditional: 'Si',
        ours: 'No',
        better: 'ours',
      },
    ],
  },
}

export function Comparison() {
  return (
    <section id={sectionIds.comparison} className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          badge="Por Que Funciona"
          title="Ventajas Competitivas Claras"
          subtitle="El sistema reduce costos entre 100x y 200x comparado con torres celulares tradicionales, con implementacion 100 veces mas rapida."
        />

        {/* Main comparison highlight */}
        <motion.div
          className="mb-16 p-8 md:p-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl text-white overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-bold font-mono">100-200x</div>
              <div className="mt-2 text-primary-100">Reduccion de costos</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold font-mono">100x</div>
              <div className="mt-2 text-primary-100">Mas rapida implementacion</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold font-mono">$2-6</div>
              <div className="mt-2 text-primary-100">Por estudiante/mes</div>
            </div>
          </div>
        </motion.div>

        {/* Infrastructure comparison table */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{comparisonData.infrastructure.title}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-500">Caracteristica</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 bg-gray-300 rounded-full" />
                      Tradicional
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-primary-600">
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 bg-primary-500 rounded-full" />
                      Nuestra Solucion
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.infrastructure.rows.map((row, index) => (
                  <motion.tr
                    key={row.feature}
                    className={`border-b border-gray-100 ${row.highlight ? 'bg-primary-50/50' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="py-4 px-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-gray-500">{row.traditional}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-semibold">
                        {row.ours}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Features comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{comparisonData.features.title}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-500">Caracteristica</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-500">Internet Tradicional</th>
                  <th className="text-center py-4 px-4 font-semibold text-primary-600">Nuestro Sistema</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.features.rows.map((row, index) => (
                  <motion.tr
                    key={row.feature}
                    className="border-b border-gray-100"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="py-4 px-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-gray-500">{row.traditional}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-secondary-600 font-semibold">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {row.ours}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="mt-12 p-6 bg-gray-50 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Por que Telegram y no WhatsApp?</h4>
              <p className="mt-1 text-gray-600">
                API completamente gratuita, codigo abierto, bots nativos para automatizacion,
                sin dependencia de Meta, y sin necesidad de numero dedicado. Se alinea con la
                filosofia abierta y democratica del proyecto.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
