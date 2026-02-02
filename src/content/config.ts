import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.string(),
    updatedDate: z.string().optional(),
    category: z.string(),
    readTime: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'blog': blog,
};















