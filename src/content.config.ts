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
    image: z.string().default('/images/og-default.svg'),
    featured: z.boolean().default(false),
    takeaways: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
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
    bestFor1: z.string().optional(),
    bestFor2: z.string().optional(),
    pros1: z.array(z.string()).optional(),
    cons1: z.array(z.string()).optional(),
    pros2: z.array(z.string()).optional(),
    cons2: z.array(z.string()).optional(),
    verdictWinner: z.string().optional(),
    verdictReason: z.string().optional(),
    verdictText: z.string().optional(),
  }),
});

export const collections = {
  articles: articlesCollection,
  comparisons: comparisonsCollection,
};
