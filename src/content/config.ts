import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).or(z.string()).optional().nullable(),
    description: z.string().optional().nullable(),
  }),
})

export const collections = { blog }
