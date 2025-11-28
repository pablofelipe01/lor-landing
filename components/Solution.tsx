'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionHeader } from './ui'
import { sectionIds } from '@/lib/utils'

const components = [
  {
    name: 'Internet Starlink (1 conexion)',
    description: 'UNICA conexion a internet necesaria. Se multiplica para servir a cientos de usuarios en 100+ km².',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    cost: '$100/mes',
  },
  {
    name: 'Gateway Raspberry Pi',
    description: 'Puente entre internet y red mesh LoRa. Ejecuta Claude API y bot Telegram.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    cost: '$100',
  },
  {
    name: 'Nodos Solares P1-Pro',
    description: 'Repetidores que extienden cobertura 5-15km. Sin costo operativo mensual.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    cost: '$89 c/u',
  },
  {
    name: 'Dispositivos T1000',
    description: 'GPS + radio LoRa portatil para estudiantes. Bateria de semanas.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    cost: '$35 c/u',
  },
]

const flowSteps = [
  { step: 1, title: 'Estudiante envia mensaje', description: 'Escribe consulta en app Meshtastic' },
  { step: 2, title: 'Viaja por red mesh', description: 'Radio LoRa transmite hasta 15km' },
  { step: 3, title: 'Gateway procesa', description: 'Raspberry Pi envia a Claude API' },
  { step: 4, title: 'Respuesta regresa', description: 'Estudiante recibe en 30-60 segundos' },
  { step: 5, title: 'Padres notificados', description: 'Red mesh confirma GPS y actividad' },
]

export function Solution() {
  return (
    <section id={sectionIds.solution} className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          badge="Nuestra Solucion"
          title="Redes Mesh LoRa + Inteligencia Artificial"
          subtitle="Sistema de comunicacion descentralizado de ultra bajo costo que funciona sin infraestructura celular."
        />

        {/* Architecture Overview */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Components */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Componentes del Sistema</h3>
            {components.map((component, index) => (
              <motion.div
                key={component.name}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-200 transition-colors flex-shrink-0">
                  {component.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">{component.name}</h4>
                    <span className="text-sm font-mono font-bold text-primary-600">{component.cost}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{component.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Total cost */}
            <div className="mt-6 p-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Inversion total infraestructura</span>
                <span className="text-2xl font-bold font-mono">$400-600</span>
              </div>
              <p className="text-sm opacity-80 mt-1">vs $85,000-170,000 torre celular tradicional</p>
            </div>
          </motion.div>

          {/* Architecture diagram */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 p-8">
              <Image
                src="/images/mesh-network-visual.jpeg"
                alt="Arquitectura del sistema mesh LoRa"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating features */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">2-15km alcance</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Frecuencia 915MHz libre</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* How it works - Flow */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Como Funciona</h3>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-secondary-400" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {flowSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative z-10 w-16 h-16 bg-white rounded-full border-4 border-primary-500 flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-xl font-bold text-primary-600">{step.step}</span>
                  </div>
                  <h4 className="mt-4 font-semibold text-gray-900">{step.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Example interaction */}
          <motion.div
            className="mt-12 bg-white rounded-2xl p-6 shadow-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Ejemplo: Consulta Educativa</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2">
                  <p className="text-sm text-gray-700">@claude Como funciona la fotosintesis?</p>
                </div>
              </div>
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-primary-500 rounded-2xl rounded-tr-none px-4 py-2 text-white max-w-md">
                  <p className="text-sm">La fotosintesis es el proceso por el cual las plantas convierten luz solar, agua y CO2 en glucosa y oxigeno. Ocurre en los cloroplastos...</p>
                </div>
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <span className="text-xs font-bold">AI</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">Tiempo de respuesta: 30-60 segundos via red mesh LoRa</p>
          </motion.div>
        </div>

        {/* Key advantages */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '100x', label: 'Mas economico', desc: 'vs torres celulares' },
            { icon: '2-5', label: 'Dias implementacion', desc: 'vs 6-12 meses' },
            { icon: '24/7', label: 'Energia solar', desc: 'Sin red electrica' },
            { icon: '100%', label: 'Codigo abierto', desc: 'Sin dependencias' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl font-bold text-primary-600 font-mono">{item.icon}</div>
              <div className="mt-2 font-semibold text-gray-900">{item.label}</div>
              <div className="text-sm text-gray-500">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
