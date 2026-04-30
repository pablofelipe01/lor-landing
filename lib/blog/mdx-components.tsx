import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode, AnchorHTMLAttributes, ImgHTMLAttributes } from 'react'

type CalloutType = 'info' | 'warning' | 'insight' | 'technical'

const calloutStyles: Record<
  CalloutType,
  { wrap: string; label: string; labelEs: string; labelEn: string }
> = {
  info: {
    wrap: 'border-primary-400 bg-primary-50 text-primary-950',
    label: 'text-primary-700',
    labelEs: 'Info',
    labelEn: 'Info',
  },
  warning: {
    wrap: 'border-accent-500 bg-accent-50 text-accent-950',
    label: 'text-accent-700',
    labelEs: 'Aviso',
    labelEn: 'Heads up',
  },
  insight: {
    wrap: 'border-secondary-500 bg-secondary-50 text-secondary-950',
    label: 'text-secondary-700',
    labelEs: 'Insight',
    labelEn: 'Insight',
  },
  technical: {
    wrap: 'border-gray-400 bg-gray-50 text-gray-900',
    label: 'text-gray-700',
    labelEs: 'Técnico',
    labelEn: 'Technical',
  },
}

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const s = calloutStyles[type]
  const defaultLabel = s.labelEs
  return (
    <aside
      className={`my-8 border-l-4 rounded-r-xl p-5 not-prose ${s.wrap}`}
      role="note"
    >
      <p
        className={`text-xs uppercase tracking-widest font-semibold mb-2 ${s.label}`}
      >
        {title ?? defaultLabel}
      </p>
      <div className="text-base leading-relaxed [&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  )
}

export function TwoColumn({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 grid md:grid-cols-2 gap-6 not-prose [&>*]:rounded-xl [&>*]:border [&>*]:border-gray-200 [&>*]:bg-white [&>*]:p-5">
      {children}
    </div>
  )
}

interface FootnoteProps {
  id: string | number
  children: ReactNode
}

export function Footnote({ id, children }: FootnoteProps) {
  return (
    <span className="inline text-[0.85em] text-gray-600 align-baseline">
      <sup className="text-primary-700 font-semibold mr-1 not-italic">
        [{id}]
      </sup>
      <span className="italic">{children}</span>
    </span>
  )
}

interface FigureProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  priority?: boolean
}

export function Figure({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
  priority = false,
}: FigureProps) {
  return (
    <figure className="my-10 not-prose">
      <div className="relative overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-auto"
          sizes="(min-width: 1024px) 768px, 100vw"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-gray-500 italic">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function MdxAnchor(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? ''
  const isExternal = /^https?:\/\//.test(href)
  const isAnchor = href.startsWith('#')
  if (isExternal) {
    return <a {...props} target="_blank" rel="noopener noreferrer" />
  }
  if (isAnchor) {
    return <a {...props} />
  }
  const { ref: _ref, ...rest } = props as AnchorHTMLAttributes<HTMLAnchorElement> & {
    ref?: unknown
  }
  return <Link href={href} {...rest} />
}

function MdxImg(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, width, height } = props
  if (!src || typeof src !== 'string') {
    return <img {...props} alt={alt ?? ''} />
  }
  const w = typeof width === 'number' ? width : Number(width) || 1600
  const h = typeof height === 'number' ? height : Number(height) || 900
  return (
    <span className="block my-8 not-prose">
      <span className="block relative overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200">
        <Image
          src={src}
          alt={alt ?? ''}
          width={w}
          height={h}
          className="w-full h-auto"
          sizes="(min-width: 1024px) 768px, 100vw"
        />
      </span>
      {alt ? (
        <span className="block mt-3 text-center text-sm text-gray-500 italic">
          {alt}
        </span>
      ) : null}
    </span>
  )
}

export const mdxComponents = {
  Callout,
  TwoColumn,
  Footnote,
  Figure,
  a: MdxAnchor,
  img: MdxImg,
}
