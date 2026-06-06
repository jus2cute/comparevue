import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articlesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    category: z.string(),
    image: z.string().default('/images/og-default.png'),
    featured: z.boolean().default(false),
  }),
});

const comparisonsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/comparisons' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    category: z.string(),
    tool1: z.string(),
    tool2: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  articles: articlesCollection,
  comparisons: comparisonsCollection,
};
