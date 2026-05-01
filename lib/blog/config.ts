export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.inverseneurallab.com'
).replace(/\/$/, '')

export const MEDIUM_URL =
  process.env.NEXT_PUBLIC_MEDIUM_URL || 'https://medium.com/@pablo-toksol'

export const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ||
  'https://www.linkedin.com/in/pablo-f-acebedo/'

export const AUTHOR_NAME = 'Pablo F. Acebedo'

export const SITE_NAME = 'Inverse Neural Lab'

export const SITE_DESCRIPTION = {
  es: 'Notas técnicas sobre IA, blockchain, infraestructura descentralizada y conectividad rural por Pablo F. Acebedo, fundador de Inverse Neural Lab.',
  en: 'Technical notes on AI, blockchain, decentralized infrastructure and rural connectivity by Pablo F. Acebedo, founder of Inverse Neural Lab.',
} as const
