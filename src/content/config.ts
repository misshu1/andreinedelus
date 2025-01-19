import {z, defineCollection} from "astro:content";
// import {glob} from "astro/loaders";

const experienceColection = defineCollection({
	// loader: glob({pattern: "**/*.md", base: "./src/data/blog"}),
	schema: z.object({
		dateRange: z.string(),
		company: z.string(),
		jobTitle: z.string(),
		url: z.string(),
		isVisible: z.boolean(),
		order: z.number().min(0),
		tags: z.array(z.string()),
	}),
});

export const collections = {experience: experienceColection};
