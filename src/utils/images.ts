import {getImage} from "astro:assets";

import type {ImageOutputFormat} from "astro";

export const IMAGE_ORIENTATION = {
	LANDSCAPE: "LANDSCAPE",
	PORTRAIT: "PORTRAIT",
} as const;

export type OptimizedImage = {
	id: number;
	orientation: keyof typeof IMAGE_ORIENTATION;
	webpImgSrc: string;
	jpgImgSrc: string;
	avifImgSrc: string;
	alt: string;
};

export type Image = Omit<
	OptimizedImage,
	"webpImgSrc" | "jpgImgSrc" | "avifImgSrc"
> &
	Record<"img", ImageMetadata>;

export const getUsesOptimizedImages = async (images: Image[]) => {
	const getImageOptions = (
		{img, orientation}: Image,
		format: ImageOutputFormat,
	) => ({
		src: img,
		...(orientation === IMAGE_ORIENTATION.LANDSCAPE && {
			width: 1800,
		}),
		...(orientation === IMAGE_ORIENTATION.PORTRAIT && {
			height: 1800,
		}),
		quality: 75,
		format,
	});

	return await Promise.all(
		images.map(async image => ({
			...image,
			avifImgSrc: (await getImage(getImageOptions(image, "avif"))).src,
			webpImgSrc: (await getImage(getImageOptions(image, "webp"))).src,
			jpgImgSrc: (await getImage(getImageOptions(image, "jpg"))).src,
		})),
	);
};
