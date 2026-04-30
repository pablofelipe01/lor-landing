import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

const CATEGORY_LABELS_OG: Record<string, { es: string; en: string }> = {
  'deep-dive': { es: 'Deep dive', en: 'Deep dive' },
  'field-notes': { es: 'Notas de campo', en: 'Field notes' },
  'essay': { es: 'Ensayo', en: 'Essay' },
  'case-study': { es: 'Caso de estudio', en: 'Case study' },
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')?.slice(0, 200) ?? 'Inverse Neural Lab'
  const category = searchParams.get('category') ?? 'deep-dive'
  const lang = (searchParams.get('lang') ?? 'es') as 'es' | 'en'

  const categoryLabel =
    CATEGORY_LABELS_OG[category]?.[lang] ?? CATEGORY_LABELS_OG['deep-dive'][lang]

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#082f49',
          backgroundImage:
            'linear-gradient(135deg, #082f49 0%, #0c4a6e 50%, #064e3b 100%)',
          padding: '64px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top bar: brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: 'white',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#0ea5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 800,
            }}
          >
            ◌
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            Inverse Neural Lab
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Category pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(14, 165, 233, 0.25)',
              color: '#7dd3fc',
              fontSize: '20px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {categoryLabel}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            color: 'white',
            fontSize: '56px',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            display: 'flex',
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '48px',
            color: 'rgba(255, 255, 255, 0.65)',
            fontSize: '20px',
            fontWeight: 500,
          }}
        >
          <div>inverseneurallab.com</div>
          <div>Pablo F. Acebedo</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
