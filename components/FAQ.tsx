'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from './ui'
import { sectionIds } from '@/lib/utils'

const faqs = [
  {
    question: 'Por que mesh LoRa y no tecnologia celular?',
    answer: `Las redes mesh LoRa son ideales para zonas rurales dispersas porque:

• Costo: 100-200x mas economico que torres celulares ($400-600 vs $85,000-170,000)
• Infraestructura: No requiere torres ni fibra optica - funciona con nodos solares autonomos
• Alcance: Cada nodo cubre 2-15km sin necesidad de infraestructura adicional
• Independencia: Frecuencias libres (915MHz en LATAM) sin dependencia de operadores
• Escalabilidad: Se agregan nodos segun necesidad real, sin grandes costos iniciales`,
  },
  {
    question: 'Como escala el modelo a otras comunidades?',
    answer: `El modelo es inherentemente escalable por su arquitectura modular:

• Expansion local: Agregar nodos T1000 ($35 c/u) extiende cobertura inmediatamente
• Nuevas comunidades: Instalacion completa en 2-5 dias vs 6-12 meses tradicional
• Costo marginal decreciente: Infraestructura central ($314) se amortiza entre mas usuarios
• Documentacion: El piloto genera guias replicables para otras regiones
• Adaptabilidad: Misma arquitectura funciona en Colombia, Peru, Ecuador, Bolivia, etc.`,
  },
  {
    question: 'Que pasa si un dispositivo se dana o se pierde?',
    answer: `El sistema esta disenado para ser resiliente:

• Costo de reemplazo bajo: T1000 cuesta $35, telefono Android Go $50
• Sin punto unico de falla: La red mesh continua funcionando si un nodo falla
• Durabilidad: Dispositivos T1000 son resistentes al agua y golpes
• Bateria: Semanas de duracion con uso moderado, recarga solar disponible
• Seguro comunitario: Modelo de fondo comun para reemplazos puede implementarse`,
  },
  {
    question: 'Como se mide el impacto educativo?',
    answer: `Metricas claras y verificables:

• Uso del sistema: Numero y tipos de consultas a Claude AI por estudiante
• Asistencia: Registro automatico via GPS de llegadas a escuela
• Seguridad: Incidentes prevenidos, tiempo de respuesta a emergencias
• Satisfaccion: Encuestas a padres, maestros y estudiantes
• Academico: Comparacion de rendimiento antes/despues (donde aplique)
• Cualitativo: Testimonios y casos de uso documentados`,
  },
  {
    question: 'Por que usar IA (Claude) y no simplemente SMS?',
    answer: `Claude AI ofrece ventajas educativas que SMS no puede igualar:

• Respuestas contextuales: Explica conceptos adaptados al nivel del estudiante
• Ilimitado: No hay biblioteca de respuestas pre-escritas que se agote
• Multimateria: Matematicas, ciencias, historia, idiomas - todo en uno
• Interactivo: El estudiante puede hacer preguntas de seguimiento
• Actualizado: Conocimiento actual sin necesidad de actualizar contenido manualmente
• Sin distracciones: Acceso curado solo a contenido educativo`,
  },
  {
    question: 'Que tan seguro es el sistema para los ninos?',
    answer: `Multiples capas de seguridad integradas:

• GPS tiempo real: Ubicacion cada 5-10 minutos durante trayectos
• Geofencing: Alertas automaticas al llegar/salir de zonas definidas
• Boton de panico: Respuesta en menos de 10 segundos
• Sin redes sociales: Cero exposicion a contenido inapropiado o extranos
• Sin publicidad: Ambiente 100% educativo
• Notificaciones: Padres informados via mesh, coordinadores via Telegram`,
  },
  {
    question: 'Cual es el modelo de sostenibilidad a largo plazo?',
    answer: `Varias vias hacia sostenibilidad:

• Costo operativo: ~$118/mes total (Starlink $100 + electricidad $3 + Claude API $15)
• 1 Starlink = 100+ km²: Una sola conexion a internet sirve a cientos de usuarios via mesh
• Costo por estudiante: $2-6/mes dependiendo de cantidad de usuarios
• Gobierno/municipio: Inclusion en presupuestos de educacion rural
• Cooperativas: Agricultores pagan por servicio de asistencia tecnica
• Subsidio cruzado: Usuarios agricolas comerciales subsidian educativo`,
  },
  {
    question: 'El proyecto funciona sin electricidad en la escuela?',
    answer: `Si, el sistema es energeticamente autonomo:

• Nodo solar P1-Pro: Panel solar integrado, no requiere red electrica
• Raspberry Pi: Consume solo 3-5W, operable con panel solar pequeno
• Dispositivos T1000: Bateria de semanas, recargables via USB solar
• Telefonos: Baterias de 3000-5000mAh duran 2-3 dias, carga solar posible
• Sin dependencias criticas: Sistema opera en zonas completamente off-grid`,
  },
]

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      className="border-b border-gray-200 last:border-0"
      initial={false}
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left hover:text-primary-600 transition-colors"
      >
        <span className="font-semibold text-lg pr-8">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-600 whitespace-pre-line">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id={sectionIds.faq} className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          badge="Preguntas Frecuentes"
          title="Lo Que Necesita Saber"
          subtitle="Respuestas a las preguntas mas comunes de inversores, ONGs y organizaciones interesadas."
        />

        <motion.div
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="divide-y divide-gray-200 px-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>

        {/* Additional help */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-4">Tiene mas preguntas?</p>
          <a
            href={`#${sectionIds.funding}`}
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            Contactenos para mas informacion
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
