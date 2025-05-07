import {getImage} from "astro:assets";
import image1 from "@assets/images/desk1.jpg";
import image2 from "@assets/images/desk2.jpg";
import image3 from "@assets/images/desk3.jpg";
import image4 from "@assets/images/desk4.jpg";
import image5 from "@assets/images/desk5.jpg";
import image6 from "@assets/images/desk6.jpg";
import image7 from "@assets/images/desk7.jpg";
import image8 from "@assets/images/desk8.jpg";
import {IMAGE_ORIENTATION} from "@ui/react/carousel/Carousel";
import type {CarouselImage} from "@ui/react/carousel/Carousel";
import type {ImageOutputFormat} from "astro";

export const getUsesOptimizedImages = async () => {
	type Image = Omit<CarouselImage, "webpImgSrc" | "jpgImgSrc"> &
		Record<"img", ImageMetadata>;
	const images: Image[] = [
		{
			id: 1,
			orientation: IMAGE_ORIENTATION.LANDSCAPE,
			img: image1,
			alt: "Desk Image 1",
		},
		{
			id: 2,
			orientation: IMAGE_ORIENTATION.PORTRAIT,
			img: image2,
			alt: "Desk Image 2",
		},
		{
			id: 3,
			orientation: IMAGE_ORIENTATION.PORTRAIT,
			img: image3,
			alt: "Desk Image 3",
		},
		{
			id: 4,
			orientation: IMAGE_ORIENTATION.LANDSCAPE,
			img: image4,
			alt: "Desk Image 4",
		},
		{
			id: 5,
			orientation: IMAGE_ORIENTATION.LANDSCAPE,
			img: image5,
			alt: "Desk Image 5",
		},
		{
			id: 6,
			orientation: IMAGE_ORIENTATION.LANDSCAPE,
			img: image6,
			alt: "Desk Image 6",
		},
		{
			id: 7,
			orientation: IMAGE_ORIENTATION.PORTRAIT,
			img: image7,
			alt: "Desk Image 7",
		},
		{
			id: 8,
			orientation: IMAGE_ORIENTATION.LANDSCAPE,
			img: image8,
			alt: "Desk Image 8",
		},
	];

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
		quality: 80,
		format,
	});

	return await Promise.all(
		images.map(async image => ({
			...image,
			webpImgSrc: (await getImage(getImageOptions(image, "webp"))).src,
			jpgImgSrc: (await getImage(getImageOptions(image, "jpg"))).src,
		})),
	);
};
