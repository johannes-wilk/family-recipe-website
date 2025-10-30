import { defineCollection, z } from 'astro:content';

const recipesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    author: z.string(),
    cuisine: z.string(),
    difficulty: z.enum(['Einfach', 'Mittel', 'Schwer']),
    prepTime: z.number(),
    servings: z.number(),
    vegetarian: z.boolean().optional(),
    vegan: z.boolean().optional(),
    ingredients: z.array(z.string()),
    steps: z.array(z.string()),
    links: z.array(z.object({
      text: z.string(),
      url: z.string(),
    })).optional(),
    publishDate: z.date(),
  }),
});

export const collections = {
  recipes: recipesCollection,
};
