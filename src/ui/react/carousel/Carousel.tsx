import {useState, type FC} from "react";
import {useKeenSlider} from "keen-slider/react";
import {isPortrait, isLandscape} from "@utils/utils";
import "keen-slider/keen-slider.min.css";
import classNames from "classnames";
import styles from "./Carousel.module.css";

export const IMAGE_FORMAT = {
	LANDSCAPE: "LANDSCAPE",
	PORTRAIT: "PORTRAIT",
} as const;
export type CarouselImage = {
	id: number;
	format: keyof typeof IMAGE_FORMAT;
	imgSrc: string;
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
								if (a.format === b.format) return 0;
								return a.format === IMAGE_FORMAT.PORTRAIT
									? -1
									: 1;
							}
							if (isLandscape()) {
								if (a.format === b.format) return 0;
								return a.format === IMAGE_FORMAT.LANDSCAPE
									? -1
									: 1;
							}
							return a.id - b.id;
						})
						.map(({imgSrc, alt}, index) => (
							<div
								key={index}
								className={classNames(
									"keen-slider__slide",
									styles.imgContainer,
								)}
							>
								<img
									className={styles.img}
									src={imgSrc}
									alt={alt}
								/>
							</div>
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
