import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt_separator: z.string().optional(),
    layout: z.string().optional(),
  }),
});

export const collections = { blog };