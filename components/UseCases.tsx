'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionHeader } from './ui'
import { sectionIds } from '@/lib/utils'

const useCases = [
  {
    id: 'safety',
    title: 'Seguridad Infantil',
    subtitle: 'Protegiendo ninos en trayectos escolares',
    description: 'Seguimiento GPS de ninos en camino a escuelas rurales. Confirmacion automatica de llegada via Telegram a padres. Boton de emergencia con respuesta en menos de 10 segundos.',
    image: '/images/use-case-safety.jpeg',
    stats: [
      { value: '95%', label: 'Confirmaciones diarias' },
      { value: '<10s', label: 'Respuesta emergencia' },
      { value: '5-10min', label: 'Actualizaciones GPS' },
    ],
    features: [
      'Transmision GPS cada 5-10 minutos durante trayecto',
      'Alerta automatica al llegar a perimetro escolar',
      'Boton de panico con ubicacion exacta',
      'Notificacion automatica a padres via mesh',
    ],
    color: 'secondary',
  },
  {
    id: 'education',
    title: 'Educacion Curada',
    subtitle: 'IA educativa sin redes sociales',
    description: 'Acceso exclusivo a Claude AI para consultas educativas. Sin exposicion a redes sociales, publicidad o contenido inapropiado. Internet inteligente 100% enfocado en aprendizaje.',
    image: '/images/use-case-education.jpeg',
    stats: [
      { value: '100%', label: 'Contenido educativo' },
      { value: '0', label: 'Redes sociales' },
      { value: '30-60s', label: 'Tiempo respuesta' },
    ],
    features: [
      'Consultas de matematicas, ciencias, historia',
      'Ayuda con tareas y comprension de textos',
      'Recursos para maestros y planes de clase',
      'Sin publicidad ni distracciones',
    ],
    color: 'accent',
  },
  {
    id: 'agriculture',
    title: 'Productividad Agricola',
    subtitle: 'Asistencia tecnica en tiempo real',
    description: 'Diagnostico de plagas, recomendaciones de fertilizacion, alertas climaticas. Agricultores con acceso a informacion digital obtienen precios 15-20% superiores.',
    image: '/images/use-case-agriculture.jpeg',
    stats: [
      { value: '+15%', label: 'Mejores precios' },
      { value: '24/7', label: 'Disponibilidad' },
      { value: '-12%', label: 'Perdidas postcosecha' },
    ],
    features: [
      'Identificacion de plagas y enfermedades',
      'Calendario de fertilizacion optimizado',
      'Alertas meteorologicas criticas',
      'Acceso a precios de mercado',
    ],
    color: 'primary',
  },
]

export function UseCases() {
  return (
    <section id={sectionIds.useCases} className="section-padding bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          badge="Casos de Uso"
          title="Impacto en Tres Frentes Criticos"
          subtitle="Un sistema, multiples beneficios para comunidades rurales desconectadas."
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
          <p className="text-gray-500 mb-6">Tambien aplicable a:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Guardabosques y conservacion',
              'Comunidades indigenas',
              'Emergencias medicas',
              'Coordinacion comunitaria',
            ].map((item) => (
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
