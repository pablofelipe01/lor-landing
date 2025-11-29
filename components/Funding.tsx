'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from './ui'
import { sectionIds } from '@/lib/utils'

const organizationTypes = [
  { value: 'ong', label: 'ONG / Fundacion' },
  { value: 'gobierno', label: 'Gobierno / Ministerio' },
  { value: 'empresa', label: 'Empresa / RSE' },
  { value: 'multilateral', label: 'Organismo Multilateral' },
  { value: 'individual', label: 'Persona Individual' },
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
          badge="Contacto"
          title="Interesado en Financiar el Proyecto?"
          subtitle="Dejenos sus datos y le contactaremos para compartir mas informacion sobre como puede participar."
          light
        />

        <div className="max-w-2xl mx-auto">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 text-gray-900">
              <h3 className="text-2xl font-bold mb-2">Solicitar Informacion</h3>
              <p className="text-gray-600 mb-6">
                Complete el formulario y le contactaremos pronto.
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
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                  </button>
                </form>
              )}

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
            Este proyecto conecta comunidades rurales,{' '}
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
