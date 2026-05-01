export type BlogLang = 'es' | 'en'

export type BlogCategory =
  | 'deep-dive'
  | 'field-notes'
  | 'essay'
  | 'case-study'

export interface BlogFrontmatter {
  title: string
  slug: string
  date: string
  lang: BlogLang
  translationSlug?: string
  excerpt: string
  tags: string[]
  category: BlogCategory
  author: string
  coverImage?: string
  draft?: boolean
}

export interface BlogPostMeta extends BlogFrontmatter {
  readingTime: string
  readingMinutes: number
  fileName: string
}

export interface BlogPost extends BlogPostMeta {
  source: string
}

export const CATEGORY_LABELS: Record<BlogLang, Record<BlogCategory, string>> = {
  es: {
    'deep-dive': 'Deep dive',
    'field-notes': 'Notas de campo',
    'essay': 'Ensayo',
    'case-study': 'Caso de estudio',
  },
  en: {
    'deep-dive': 'Deep dive',
    'field-notes': 'Field notes',
    'essay': 'Essay',
    'case-study': 'Case study',
  },
}

export const BLOG_PATH: Record<BlogLang, string> = {
  es: '/blog',
  en: '/en/blog',
}

export const UI_LABELS = {
  es: {
    blog: 'Blog',
    readingTime: (m: number) => `${m} min de lectura`,
    publishedOn: 'Publicado el',
    readMore: 'Leer más',
    allPosts: 'Todos los artículos',
    filterByTag: 'Filtrar por tag',
    filterByCategory: 'Filtrar por categoría',
    clearFilters: 'Limpiar filtros',
    noPostsFound: 'Aún no hay artículos publicados.',
    noResults: 'No hay artículos que coincidan con el filtro.',
    translationNotAvailable:
      'Esta entrada aún no está disponible en inglés. Leé la versión original en español.',
    readOriginal: 'Leer original',
    aboutInl: 'Sobre Inverse Neural Lab',
    aboutBio:
      'Inverse Neural Lab es un laboratorio que diseña y opera infraestructura de IA, redes mesh LoRa y sistemas descentralizados para entornos rurales en LATAM. Fundado por',
    ctaSoft: 'Si te interesa cómo aplicamos esto en proyectos reales, mirá',
    ctaSoftLink: 'Inverse Neural Lab',
    ctaSoftOr: 'o',
    ctaSoftDemo: 'solicitá una demo',
    followTitle: 'Sigue el laboratorio',
    followSubtitle:
      'Publicamos análisis técnico sobre IA, blockchain y redes desde first principles.',
    followMediumLabel: 'Lee en Medium',
    followMediumSublabel: 'Comunidad lectora amplia',
    followRssLabel: 'Suscríbete vía RSS',
    followRssSublabel: 'Para tu lector preferido',
    followLinkedinLabel: 'Conecta en LinkedIn',
    followLinkedinSublabel: 'Discusión y comentarios',
    followFooterNote: 'Próximamente: newsletter por email',
    shareTitle: 'Compartir',
    shareLinkedin: 'LinkedIn',
    shareX: 'X',
    shareCopy: 'Copiar link',
    shareCopied: '¡Copiado!',
    languageOther: 'English',
    languageOtherFull: 'Leer en inglés',
    metaCategory: 'Categoría',
    home: 'Inicio',
    backToBlog: '← Volver al blog',
    relatedPosts: 'Artículos relacionados',
    rss: 'RSS',
  },
  en: {
    blog: 'Blog',
    readingTime: (m: number) => `${m} min read`,
    publishedOn: 'Published on',
    readMore: 'Read more',
    allPosts: 'All posts',
    filterByTag: 'Filter by tag',
    filterByCategory: 'Filter by category',
    clearFilters: 'Clear filters',
    noPostsFound: 'No posts published yet.',
    noResults: 'No posts match the current filter.',
    translationNotAvailable:
      'This entry is not yet available in Spanish. Read the original in English.',
    readOriginal: 'Read original',
    aboutInl: 'About Inverse Neural Lab',
    aboutBio:
      'Inverse Neural Lab designs and operates AI infrastructure, LoRa mesh networks and decentralized systems for rural environments across LATAM. Founded by',
    ctaSoft: 'If you’re curious how we apply this in real projects, take a look at',
    ctaSoftLink: 'Inverse Neural Lab',
    ctaSoftOr: 'or',
    ctaSoftDemo: 'request a demo',
    followTitle: 'Follow the lab',
    followSubtitle:
      'We publish technical analysis on AI, blockchain, and networks from first principles.',
    followMediumLabel: 'Read on Medium',
    followMediumSublabel: 'Wide reader community',
    followRssLabel: 'Subscribe via RSS',
    followRssSublabel: 'For your favorite reader',
    followLinkedinLabel: 'Connect on LinkedIn',
    followLinkedinSublabel: 'Discussion and comments',
    followFooterNote: 'Coming soon: email newsletter',
    shareTitle: 'Share',
    shareLinkedin: 'LinkedIn',
    shareX: 'X',
    shareCopy: 'Copy link',
    shareCopied: 'Copied!',
    languageOther: 'Español',
    languageOtherFull: 'Read in Spanish',
    metaCategory: 'Category',
    home: 'Home',
    backToBlog: '← Back to blog',
    relatedPosts: 'Related posts',
    rss: 'RSS',
  },
} as const

export type UILabels = typeof UI_LABELS['es']
