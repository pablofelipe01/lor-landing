# Conectividad Rural LATAM - Landing Page

Landing page profesional para buscar financiamiento (grants, ONGs, inversionistas de impacto) para un proyecto de conectividad rural en America Latina mediante redes mesh LoRa + IA.

## Stack Tecnico

- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Deployment**: Optimizado para Vercel

## Requisitos Previos

- Node.js 18.17 o superior
- npm, yarn, o pnpm

## Instalacion

```bash
# Clonar o navegar al directorio del proyecto
cd conectividad-rural-landing

# Instalar dependencias
npm install
```

## Comandos Disponibles

```bash
# Desarrollo local (http://localhost:3000)
npm run dev

# Build de produccion
npm run build

# Iniciar servidor de produccion
npm run start

# Ejecutar linter
npm run lint
```

## Estructura del Proyecto

```
conectividad-rural-landing/
├── app/
│   ├── globals.css          # Estilos globales + Tailwind
│   ├── layout.tsx           # Layout principal con metadata SEO
│   └── page.tsx             # Pagina principal (landing)
├── components/
│   ├── ui/                  # Componentes reutilizables
│   │   ├── CTAButton.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── StatCard.tsx
│   │   └── index.ts
│   ├── Hero.tsx             # Seccion hero
│   ├── Problem.tsx          # El problema
│   ├── Solution.tsx         # La solucion
│   ├── UseCases.tsx         # Casos de uso
│   ├── Comparison.tsx       # Tabla comparativa
│   ├── Impact.tsx           # Numeros e impacto
│   ├── Roadmap.tsx          # Plan de implementacion
│   ├── Funding.tsx          # Solicitud de financiamiento
│   ├── FAQ.tsx              # Preguntas frecuentes
│   ├── Navigation.tsx       # Navegacion sticky
│   ├── Footer.tsx           # Footer
│   └── index.ts             # Exports
├── lib/
│   └── utils.ts             # Utilidades y constantes
├── public/
│   ├── images/              # Imagenes del proyecto
│   ├── propuesta.pdf        # PDF de propuesta descargable
│   └── manifest.json        # PWA manifest
├── tailwind.config.ts       # Configuracion Tailwind
├── next.config.js           # Configuracion Next.js
├── tsconfig.json            # Configuracion TypeScript
└── package.json
```

## Imagenes Incluidas

Las siguientes imagenes ya estan incluidas en `/public/images/`:

- `hero-student-path.jpeg` - Nina rural caminando con mochila y dispositivo
- `problem-rural-school.jpeg` - Escuela rural autentica latinoamericana
- `mesh-network-visual.jpeg` - Visualizacion de red mesh
- `tech-lora-device.jpeg` - Close-up del dispositivo LoRa
- `use-case-safety.jpeg` - Caso de uso seguridad infantil
- `use-case-education.jpeg` - Estudiantes usando smartphones
- `use-case-agriculture.jpeg` - Agricultor consultando Claude
- `impact-community.jpeg` - Impacto en comunidad
- `team-hands.jpeg` - Imagen de colaboracion

**Por agregar:**
- `og-image.jpg` - Imagen para Open Graph (1200x630px) - usar para redes sociales

## PDF de Propuesta

Coloca el PDF de la propuesta completa en `/public/propuesta.pdf` para que los usuarios puedan descargarlo.

## Deployment a Vercel

### Opcion 1: Via CLI

```bash
# Instalar Vercel CLI si no lo tienes
npm i -g vercel

# Deploy
vercel
```

### Opcion 2: Via Git

1. Sube el proyecto a GitHub/GitLab/Bitbucket
2. Conecta el repositorio en [vercel.com](https://vercel.com)
3. Vercel detectara automaticamente Next.js y configurara el build

### Configuracion en Vercel

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (auto-detectado)
- **Output Directory**: `.next` (auto-detectado)
- **Install Command**: `npm install` (auto-detectado)

## Personalizacion

### Colores

Edita `tailwind.config.ts` para cambiar la paleta de colores:

```typescript
colors: {
  primary: { ... },    // Azul tecnologico
  secondary: { ... },  // Verde natural
  accent: { ... },     // Naranja educacion
  earth: { ... },      // Tonos tierra
}
```

### Contenido

- **Textos**: Edita directamente en los componentes de `/components/`
- **Estadisticas**: Modifica los arrays de datos en cada componente
- **FAQ**: Actualiza el array `faqs` en `/components/FAQ.tsx`
- **Presupuesto**: Actualiza `budgetBreakdown` en `/components/Funding.tsx`

### Metadata SEO

Edita `/app/layout.tsx` para actualizar:
- Titulo y descripcion
- Open Graph tags
- Twitter cards
- Keywords

## Formulario de Contacto

El formulario en la seccion Funding actualmente simula el envio. Para hacerlo funcional:

### Opcion 1: FormSpree

1. Crea cuenta en [formspree.io](https://formspree.io)
2. Crea un formulario y obtiene el endpoint
3. Modifica `handleSubmit` en `/components/Funding.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  const response = await fetch('https://formspree.io/f/tu-id', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  if (response.ok) {
    setSubmitted(true)
  }
  setIsSubmitting(false)
}
```

### Opcion 2: API Route de Next.js

Crea `/app/api/contact/route.ts` para manejar el envio via tu propio backend.

## Performance

El proyecto esta optimizado para performance:

- Imagenes optimizadas con `next/image`
- React Server Components donde es posible
- Lazy loading de componentes below the fold
- Animaciones optimizadas con Framer Motion
- CSS purging con Tailwind

## Licencia

Proyecto de codigo abierto para impacto social.

---

**Protegiendo ninos • Democratizando educacion • Impulsando productividad rural**
