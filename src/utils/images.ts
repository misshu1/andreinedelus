import {getImage} from "astro:assets";

import type {ImageOutputFormat} from "astro";

export const IMAGE_ORIENTATION = {
	LANDSCAPE: "LANDSCAPE",
	PORTRAIT: "PORTRAIT",
} as const;

export type OptimizedImage = {
	id: number;
	orientation: keyof typeof IMAGE_ORIENTATION;
	webp: ResponsiveImage[];
	jpg: ResponsiveImage[];
	avif: ResponsiveImage[];
	alt: string;
	width: number;
	height: number;
};

export type ResponsiveImage = {
	src: string;
	width: number;
};

export type Image = Omit<
	OptimizedImage,
	"webp" | "jpg" | "avif" | "width" | "height"
> &
	Record<"img", ImageMetadata>;

const getImageOptions = (
	{img, orientation}: Image,
	format: ImageOutputFormat,
	size: number,
) => ({
	src: img,
	...(orientation === IMAGE_ORIENTATION.LANDSCAPE && {
		width: size,
	}),
	...(orientation === IMAGE_ORIENTATION.PORTRAIT && {
		height: size,
	}),
	quality: 75,
	format,
});

const getImagesByFormat = (image: Image, format: ImageOutputFormat) => {
	const sizes = [320, 480, 640, 768, 1200];

	return Promise.all(
		sizes.map(async size => ({
			src: (await getImage(getImageOptions(image, format, size))).src,
			width: size,
		})),
	);
};

export const getUsesOptimizedImages = async (images: Image[]) => {
	return Promise.all(
		images.map(async image => {
			const [avif, webp, jpg] = await Promise.all([
				getImagesByFormat(image, "avif"),
				getImagesByFormat(image, "webp"),
				getImagesByFormat(image, "jpg"),
			]);

			return {
				...image,
				width: image.img.width,
				height: image.img.height,
				avif,
				webp,
				jpg,
			};
		}),
	);
};
