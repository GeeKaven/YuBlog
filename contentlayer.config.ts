import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import remarkSideNote from './lib/remark-side-note'
import rehypeSlug from 'rehype-slug'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'


export const Post =  defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'posts/blog/**/*.md',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true
    },
    date: {
      type: 'date',
      required: true
    },
    slug: {
      type: 'string',
      required: true
    },
    tags: {
      type: 'list',
      of: { type: "string" },
      required: true
    },
    draft: {
      type: 'boolean',
      require: false
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/blog/${post.slug}`,
    },
  },
}))

export const Remark =  defineDocumentType(() => ({
  name: 'Remark',
  filePathPattern: 'posts/remark/**/*.md',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true
    },
    date: {
      type: 'date',
      required: true
    },
    slug: {
      type: 'string',
      required: true
    },
    tags: {
      type: 'list',
      of: { type: "string" },
      required: true
    },
    draft: {
      type: 'boolean',
      require: false
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/remark/${post.slug}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post, Remark],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      remarkDirective,
      remarkSideNote
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypePrismPlus, { ignoreMissing: true }]
    ],

  }
})