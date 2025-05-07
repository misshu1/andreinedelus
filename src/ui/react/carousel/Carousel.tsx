import {useState, type FC} from "react";
import {useKeenSlider} from "keen-slider/react";
import {isPortrait, isLandscape} from "@utils/utils";
import "keen-slider/keen-slider.min.css";
import classNames from "classnames";
import styles from "./Carousel.module.css";

export const IMAGE_ORIENTATION = {
	LANDSCAPE: "LANDSCAPE",
	PORTRAIT: "PORTRAIT",
} as const;
export type CarouselImage = {
	id: number;
	orientation: keyof typeof IMAGE_ORIENTATION;
	webpImgSrc: string;
	jpgImgSrc: string;
	alt: string;
};

type CarouselProps = {
	images: CarouselImage[];
};

const Carousel: FC<CarouselProps> = ({images = []}) => {
	const [carouselLoaded, setCarouselLoaded] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [sliderRef, instanceRef] = useKeenSlider(
		{
			loop: true,
			drag: true,
			mode: "snap",
			slides: {
				perView: 1,
				spacing: 16,
			},
			created() {
				setCarouselLoaded(true);
			},
			slideChanged(slider) {
				setCurrentSlide(slider.track.details.rel);
			},
		},
		[],
	);

	return (
		<>
			<div className={styles.carouselContainer}>
				<div ref={sliderRef} className={classNames("keen-slider")}>
					{images
						.sort((a, b) => {
							if (isPortrait()) {
								if (a.orientation === b.orientation) return 0;
								return a.orientation ===
									IMAGE_ORIENTATION.PORTRAIT
									? -1
									: 1;
							}
							if (isLandscape()) {
								if (a.orientation === b.orientation) return 0;
								return a.orientation ===
									IMAGE_ORIENTATION.LANDSCAPE
									? -1
									: 1;
							}
							return a.id - b.id;
						})
						.map(({webpImgSrc, jpgImgSrc, alt}, index) => (
							<picture
								key={index}
								className={classNames(
									"keen-slider__slide",
									styles.imgContainer,
								)}
							>
								<source
									className={styles.img}
									srcSet={webpImgSrc}
									type="image/webp"
								/>
								<img
									className={styles.img}
									src={jpgImgSrc}
									alt={alt}
									decoding="async"
								/>
							</picture>
						))}
				</div>
			</div>
			{carouselLoaded && instanceRef.current && (
				<div className={styles.dots}>
					{[
						...Array(
							instanceRef.current.track.details?.slides?.length ??
								0,
						).keys(),
					].map(idx => {
						return (
							<button
								key={idx}
								onClick={() => {
									instanceRef.current?.moveToIdx(idx);
								}}
								className={classNames(styles.dot, {
									[styles.active]: currentSlide === idx,
								})}
							></button>
						);
					})}
				</div>
			)}
		</>
	);
};

export default Carousel;
