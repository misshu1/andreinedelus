import {z} from "zod";

export const defaultValues = {
	name: "",
	email: "",
	message: "",
};

export const validationSchema = z.object({
	name: z
		.string()
		.trim()
		.min(3, "Name must be between 3 and 50 characters!")
		.max(50, "Name must be between 3 and 50 characters!"),
	email: z.string().trim().email(),
	message: z
		.string()
		.trim()
		.min(30, "Message must have at least 30 characters!")
		.max(1000, "Message is to big!"),
});

export type ValidationSchema = z.infer<typeof validationSchema>;
