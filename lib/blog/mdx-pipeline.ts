import rehypeKatex from 'rehype-katex'
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

const prettyCodeOptions: Partial<PrettyCodeOptions> = {
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light',
  },
  keepBackground: false,
  defaultLang: 'plaintext',
}

// Cast plugins to `any` at the boundary because next-mdx-remote's
// MDXRemoteOptions accepts a loose Pluggable[] shape that does not line up
// 1-to-1 with each plugin's strict generic signature. The plugins themselves
// are correctly typed and just funneled through.
type LoosePlugin = unknown
type LooseOptions = Record<string, unknown>

export const mdxRemarkPlugins: [LoosePlugin, LooseOptions?][] = [
  [remarkGfm],
  [remarkMath],
]

export const mdxRehypePlugins: [LoosePlugin, LooseOptions?][] = [
  [rehypeSlug],
  [rehypeKatex],
  [rehypePrettyCode, prettyCodeOptions as LooseOptions],
]
