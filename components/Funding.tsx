'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader, CTAButton } from './ui'
import { sectionIds } from '@/lib/utils'

const budgetBreakdown = [
  { item: 'Kit estudiante (T1000 + Android Go)', quantity: 20, unitCost: 85, total: 1700 },
  { item: 'SenseCAP Solar Node P1-Pro', quantity: 1, unitCost: 89, total: 89 },
  { item: 'Antena Fiberglass 3dBi', quantity: 1, unitCost: 25, total: 25 },
  { item: 'Raspberry Pi 5 (4GB) + accesorios', quantity: 1, unitCost: 100, total: 100 },
  { item: 'Instalacion y materiales', quantity: 1, unitCost: 60, total: 60 },
  { item: 'Capacitacion y seguimiento', quantity: 1, unitCost: 300, total: 300 },
  { item: 'Operacion 3 meses (API + servicios)', quantity: 1, unitCost: 226, total: 226 },
]

const operatingCosts = [
  { item: 'Starlink internet', cost: '$80-120/mes' },
  { item: 'Electricidad (Raspberry Pi 24/7)', cost: '$3/mes' },
  { item: 'Claude API (10,000 consultas/mes)', cost: '$15/mes' },
  { item: 'Telegram Bot API', cost: 'Gratis' },
]

const organizationTypes = [
  { value: 'ong', label: 'ONG / Fundacion' },
  { value: 'gobierno', label: 'Gobierno / Ministerio' },
  { value: 'inversor', label: 'Inversor de Impacto' },
  { value: 'multilateral', label: 'Organismo Multilateral' },
  { value: 'corporativo', label: 'Empresa / RSE' },
  { value: 'otro', label: 'Otro' },
]

export function Funding() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    type: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const totalBudget = budgetBreakdown.reduce((sum, item) => sum + item.total, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Error al enviar el formulario. Por favor intente nuevamente.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al enviar el formulario. Por favor intente nuevamente.')
    }

    setIsSubmitting(false)
  }

  return (
    <section id={sectionIds.funding} className="section-padding bg-gradient-to-b from-primary-900 to-primary-950 text-white">
      <div className="container-custom">
        <SectionHeader
          badge="Solicitud de Financiamiento"
          title="Invierta en el Futuro de 180 Millones de Personas"
          subtitle="Un piloto de 12 semanas para demostrar impacto medible y crear un modelo replicable en toda America Latina."
          light
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Funding details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Main ask */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="text-center mb-6">
                <p className="text-primary-200 mb-2">Inversion total solicitada</p>
                <div className="text-5xl md:text-6xl font-bold font-mono">
                  ${totalBudget.toLocaleString()}
                  <span className="text-2xl font-normal text-primary-200"> USD</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-primary-200">Semanas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">50</div>
                  <div className="text-sm text-primary-200">Estudiantes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm text-primary-200">Comunidad</div>
                </div>
              </div>
            </div>

            {/* Budget breakdown */}
            <div className="bg-white/5 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Desglose del Presupuesto</h3>
              <div className="space-y-3">
                {budgetBreakdown.map((item) => (
                  <div key={item.item} className="flex justify-between items-center text-sm">
                    <span className="text-primary-200">{item.item}</span>
                    <span className="font-mono font-semibold">${item.total}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-white/20 flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold font-mono">${totalBudget.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Operating costs */}
            <div className="bg-white/5 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Costos Operativos Mensuales</h3>
              <div className="space-y-2">
                {operatingCosts.map((item) => (
                  <div key={item.item} className="flex justify-between items-center text-sm">
                    <span className="text-primary-200">{item.item}</span>
                    <span className="font-mono">{item.cost}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-sm text-primary-200">
                  Total mensual: <span className="font-bold text-white">~$118/mes</span> • Costo por estudiante: <span className="font-bold text-white">$2-6/mes</span>
                </p>
              </div>
            </div>

            {/* What you get */}
            <div className="bg-secondary-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Que Obtiene el Financiador</h3>
              <ul className="space-y-3">
                {[
                  'Documentacion completa para replicacion',
                  'Metricas de impacto verificables',
                  'Modelo de sostenibilidad financiera',
                  'Reconocimiento en materiales del proyecto',
                  'Acceso a datos y aprendizajes del piloto',
                  'Primer derecho para expansion regional',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-secondary-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-primary-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 text-gray-900">
              <h3 className="text-2xl font-bold mb-2">Solicitar Informacion</h3>
              <p className="text-gray-600 mb-6">
                Complete el formulario y le enviaremos la propuesta completa.
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Gracias por su interes</h4>
                  <p className="text-gray-600">Le contactaremos pronto con mas informacion.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Su nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="email@organizacion.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                      Organizacion *
                    </label>
                    <input
                      type="text"
                      id="organization"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Nombre de su organizacion"
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de organizacion *
                    </label>
                    <select
                      id="type"
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Seleccione...</option>
                      {organizationTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje (opcional)
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Cuentenos sobre su interes en el proyecto..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Solicitar Propuesta Completa'}
                  </button>
                </form>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center mb-4">O descargue directamente:</p>
                <CTAButton
                  href="/propuesta.pdf"
                  variant="outline"
                  className="w-full justify-center"
                  download
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Descargar Propuesta PDF
                </CTAButton>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-primary-200 mb-4">
            Este proyecto no solo conecta comunidades rurales,{' '}
            <span className="text-white font-semibold">protege vidas infantiles</span> y{' '}
            <span className="text-white font-semibold">democratiza el acceso a educacion de calidad</span>.
          </p>
          <p className="text-primary-300">
            Protegiendo ninos • Democratizando educacion • Impulsando productividad rural
          </p>
        </motion.div>
      </div>
    </section>
  )
}
