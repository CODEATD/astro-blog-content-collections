import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
    type: 'content',
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            date: z.date(),
            description: z.string(),
            // author: z.string(),
            // image: image().refine((img) => img.width >= 1200, {
            //     message: 'Image should be lower than 2000px width',
            // }),
            image: image(),
            tags: z.array(z.string()),

            author: reference('author'),
        }),

});

const authorCollection = defineCollection({
    type: 'data',
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            bio: z.string().optional(),
            avatar: image(), // Simplificado sin .refine()
        }),
})

export const collections = {
    blog: blogCollection,
    author: authorCollection,
};