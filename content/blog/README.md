# Blog — guía de autoría

Esta carpeta contiene los artículos del blog de Inverse Neural Lab. Cada artículo es un archivo MDX. El blog es bilingüe español/inglés: cada idioma vive en su propio archivo y se enlazan entre sí por frontmatter.

## Estructura de archivos

```
content/blog/
├── README.md                                      ← este archivo
├── mi-articulo.es.mdx                             ← versión español
├── mi-articulo.en.mdx                             ← versión inglés (opcional)
└── ...
```

**Convención de nombre**: `<slug>.<lang>.mdx`. El `<lang>` es exactamente `es` o `en`. El `<slug>` debe coincidir con el campo `slug` del frontmatter.

Si una traducción no existe todavía, simplemente no creés el archivo del otro idioma. El blog mostrará una nota explicando que la traducción no está disponible.

## Frontmatter requerido

Cada archivo arranca con un bloque YAML:

```yaml
---
title: "Título completo del artículo"
slug: "slug-url-friendly"
date: "2026-04-22"
lang: "es"
translationSlug: "slug-of-other-language-version"
excerpt: "Resumen de 1–2 frases. Aparece en listings, RSS y como meta description / OG."
tags: ["ai", "blockchain", "rural"]
category: "essay"
author: "Pablo F. Acebedo"
coverImage: "/images/blog/mi-articulo-cover.jpg"
draft: false
---
```

### Campos

| Campo | Requerido | Notas |
|-------|-----------|-------|
| `title` | sí | Title-case en inglés, sentence case en español es la convención del blog. |
| `slug` | sí | URL-safe: minúsculas, guiones, sin acentos. Debe coincidir con el filename. |
| `date` | sí | ISO `YYYY-MM-DD`. Se usa para sort y para `<time>` semántico. |
| `lang` | sí | `"es"` o `"en"`. Tiene que coincidir con el sufijo del filename. |
| `translationSlug` | no | El `slug` de la versión en el otro idioma. Habilita el LanguageSwitcher per-post. |
| `excerpt` | sí | 1–2 frases. Importante para SEO y RSS. |
| `tags` | sí | Array. Lower-kebab-case (`bonding-curves`, no `Bonding Curves`). |
| `category` | sí | Una de: `deep-dive`, `field-notes`, `essay`, `case-study`. |
| `author` | sí | Por ahora siempre `"Pablo F. Acebedo"`. |
| `coverImage` | no | Path desde `/public/`. Si lo omitís, OG se genera dinámicamente con `/og`. |
| `draft` | no | `true` esconde el post en producción. En `npm run dev` siempre se muestra. |

## Cómo crear un artículo nuevo

1. Decidí un slug. Tiene que ser único por idioma. Ej: `por-que-rust-en-edge-devices`.
2. Creá `content/blog/por-que-rust-en-edge-devices.es.mdx`.
3. Pegá el frontmatter de arriba como template, completalo.
4. Escribí el cuerpo en MDX abajo del frontmatter.
5. (Opcional) Creá `por-que-rust-en-edge-devices.en.mdx` con `translationSlug: "por-que-rust-en-edge-devices"` cruzado.
6. Corré `npm run dev` y abrí `http://localhost:3000/blog/por-que-rust-en-edge-devices/` para previsualizarlo.

## Componentes MDX disponibles

Estos componentes están registrados globalmente y se pueden usar dentro de cualquier MDX sin importarlos.

### `<Callout type="..." title="...">`

Caja destacada para notas, advertencias e insights.

```mdx
<Callout type="info" title="Léelo así">
Cualquier markdown adentro funciona — **bold**, [links](https://...), código `inline`, etc.
</Callout>
```

Tipos disponibles: `info` (azul), `warning` (ámbar), `insight` (verde), `technical` (gris). El `title` es opcional.

### `<TwoColumn>`

Dos columnas lado a lado para comparaciones.

```mdx
<TwoColumn>
  <div>
    <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">Antes</p>
    <p>Lo viejo.</p>
  </div>
  <div>
    <p className="text-xs uppercase tracking-wider font-semibold text-primary-700 mb-2">Después</p>
    <p>Lo nuevo.</p>
  </div>
</TwoColumn>
```

### `<Footnote id="...">`

Footnote inline (alternativa al `[^1]` markdown estándar). Más útil cuando querés controlar el numerado manualmente.

```mdx
Algo importante <Footnote id="1">acá la explicación corta</Footnote>.
```

Para footnotes "estilo paper" (numeradas automáticamente, con sección al pie), usá la sintaxis estándar de markdown:

```mdx
Algo importante[^1].

[^1]: La explicación al pie del documento.
```

### `<Figure src="..." alt="..." caption="...">`

Imagen con caption opcional. `next/image` debajo, lazy-loaded.

```mdx
<Figure
  src="/images/blog/mi-articulo/diagrama.png"
  alt="Descripción precisa para accesibilidad"
  caption="Figura 1. Texto del caption."
/>
```

## Sintaxis MDX especial

### Código con syntax highlighting

Bloques fenced ```` ``` ```` con lenguaje. Soportados: `typescript`, `tsx`, `javascript`, `python`, `solidity`, `bash`, `json`, `yaml`, `markdown`, etc.

````mdx
```typescript
function add(a: number, b: number): number {
  return a + b
}
```
````

Para títulos en el bloque o highlighting de líneas (vía `rehype-pretty-code`):

````mdx
```typescript title="hello.ts" {2,5}
const x = 1
const y = 2  // línea destacada
const z = x + y
console.log(z)
console.log("end")  // línea destacada
```
````

### Ecuaciones matemáticas

Inline con `$...$`, bloque con `$$...$$`. Renderizado por KaTeX.

```mdx
La capitalización de mercado es $M = p \cdot s$.

$$
R(s) = \int_0^s f(x)\, dx = \frac{2k}{3} \cdot s^{3/2}
$$
```

### Tablas

Sintaxis estándar de GitHub Flavored Markdown:

```mdx
| Columna 1 | Columna 2 |
|-----------|-----------|
| valor a   | valor b   |
```

### Footnotes (notas al pie)

```mdx
Esto requiere una nota[^1].

[^1]: Acá va la nota. Puede tener **markdown** y [links](https://...).
```

### Task lists, strikethrough, autolinks

Funcionan tal cual GFM:

```mdx
- [x] Hecho
- [ ] Pendiente

~~Tachado~~

https://www.inverseneurallab.com  ← se autolinkea
```

## Imágenes

**Dónde van**: `/public/images/blog/<slug>/<archivo>.jpg`. La carpeta `/public/images/blog/` ya existe.

**Cover image**: si la setea el frontmatter, se usa para OG y se podría usar para hero (no implementado todavía). Si no, se genera dinámicamente con `/og?title=...&category=...` en build time. **Para los seed posts no es necesario** — la OG dinámica funciona con sólo título + categoría.

**Imágenes inline**: usá el componente `<Figure>` o markdown estándar `![alt](/path)`. El componente custom `img` ya está mapeado a `next/image` automáticamente.

## Drafts

Para que un artículo no aparezca en producción mientras lo trabajás:

```yaml
draft: true
```

En desarrollo (`npm run dev`) los drafts se muestran. En producción (`npm run build && npm start`) se omiten del listing, del RSS y del sitemap.

## Tags y categorías

Las **categorías** son un set cerrado (4 valores). Pensá la categoría como el formato del post, no como el tema:

- `deep-dive` — análisis técnico profundo de un sistema, decisión arquitectónica o problema.
- `field-notes` — observaciones cortas, anécdotas, reflexiones sin pretensión de completitud.
- `essay` — argumento fuerte sostenido. Opinión.
- `case-study` — caso real, con metodología y números.

Los **tags** son libres. Mantenelos en lower-kebab-case y reutilizá los existentes cuando puedas (mirá los posts publicados en `/blog/` para ver cuáles ya circulan).

## Estrategia de canales

El blog en `inverseneurallab.com/blog` es el **hogar canónico** del contenido. Los demás canales son distribución secundaria:

- **Medium** (`@pablo-toksol`) — distribución secundaria. Cuando republiques un post acá en Medium, agregale el canonical link apuntando a la URL de este blog para no fragmentar la señal SEO.
- **RSS** — feed activo en `/blog/feed.xml` (ES) y `/en/blog/feed.xml` (EN). Sirve para lectores RSS estándar y deja la puerta abierta a conectar más adelante a Buttondown / Substack / Beehiiv como fuente.
- **LinkedIn** — espacio para discusión y comentarios sobre cada post publicado.
- **Newsletter por email** — postergada. Cuando se agregue, se va a crear un componente `NewsletterCTA` aparte (ese nombre está reservado).

### El componente `FollowCTA`

Cada post incluye al pie un componente `FollowCTA` que muestra los tres canales activos (Medium, RSS, LinkedIn) en cards lado a lado, con el copy en el idioma del post. Vive en `components/blog/FollowCTA.tsx` y consume:

- `NEXT_PUBLIC_MEDIUM_URL` — default `https://medium.com/@pablo-toksol`
- `NEXT_PUBLIC_LINKEDIN_URL` — default `https://www.linkedin.com/in/pablo-f-acebedo/`
- El RSS se elige automáticamente según `lang`

Si en algún momento querés cambiar la copy o agregar/quitar canales, está todo en `lib/blog/types.ts` (objeto `UI_LABELS`) y en el array `channels` del propio componente.

## Validación previa al merge

Antes de mergear un artículo nuevo, corré:

```bash
npm run build
```

El build valida:
- Frontmatter requerido presente.
- `category` dentro del set permitido.
- `lang` coincide entre filename y frontmatter.
- TypeScript clean.

Si algo falla, el error lo dice explícito.
