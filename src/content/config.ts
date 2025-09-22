import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.string(),
    category: z.string(),
    readTime: z.string(),
  }),
});

export const collections = {
  'blog': blog,
};















