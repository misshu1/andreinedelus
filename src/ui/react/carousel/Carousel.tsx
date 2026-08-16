import {useEffect, useState, type FC} from "react";
import {useKeenSlider} from "keen-slider/react";
import {isPortrait, isLandscape} from "@utils/utils";
import "keen-slider/keen-slider.min.css";
import classNames from "classnames";
import styles from "./Carousel.module.css";
import {IMAGE_ORIENTATION, type OptimizedImage} from "@utils/images";

type CarouselProps = {
	images: OptimizedImage[];
};

const Carousel: FC<CarouselProps> = ({images = []}) => {
	const [carouselLoaded, setCarouselLoaded] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [sortedImages, setSortedImages] = useState<OptimizedImage[]>(images);
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

	useEffect(() => {
		const imagesCopy = [...images];

		imagesCopy.sort((a, b) => {
			if (isPortrait()) {
				if (a.orientation === b.orientation) return 0;
				return a.orientation === IMAGE_ORIENTATION.PORTRAIT ? -1 : 1;
			}
			if (isLandscape()) {
				if (a.orientation === b.orientation) return 0;
				return a.orientation === IMAGE_ORIENTATION.LANDSCAPE ? -1 : 1;
			}
			return a.id - b.id;
		});

		setSortedImages(imagesCopy);
	}, [images]);

	const getImagesSizes = (
		orientation: keyof typeof IMAGE_ORIENTATION,
		width: number,
		height: number,
	) => {
		if (orientation === IMAGE_ORIENTATION.LANDSCAPE) {
			return "(min-width: 1216px) 1216px, 100vw";
		}

		const maxHeight = 800;
		const portraitWidth = Math.round((width / height) * maxHeight);

		return `(min-width: 1216px) ${portraitWidth}px, 100vw`;
	};

	return (
		<>
			<div className={styles.carouselContainer}>
				<div ref={sliderRef} className={classNames("keen-slider")}>
					{sortedImages.map(
						(
							{webp, jpg, avif, alt, height, width, orientation},
							index,
						) => (
							<picture
								key={index}
								className={classNames(
									"keen-slider__slide",
									styles.imgContainer,
								)}
							>
								<source
									className={styles.img}
									srcSet={avif
										.map(
											({src, width}) =>
												`${src} ${width}w`,
										)
										.join(", ")}
									type="image/avif"
								/>
								<source
									className={styles.img}
									srcSet={webp
										.map(
											({src, width}) =>
												`${src} ${width}w`,
										)
										.join(", ")}
									type="image/webp"
								/>
								<img
									className={styles.img}
									srcSet={jpg
										.map(
											({src, width}) =>
												`${src} ${width}w`,
										)
										.join(", ")}
									alt={alt}
									sizes={getImagesSizes(
										orientation,
										width,
										height,
									)}
									decoding="async"
									width={width}
									height={height}
								/>
							</picture>
						),
					)}
				</div>
			</div>
			{carouselLoaded && instanceRef.current && (
				<div className={styles.dots}>
					{sortedImages.map(({alt}, idx) => {
						return (
							<button
								key={idx}
								onClick={() => {
									instanceRef.current?.moveToIdx(idx);
								}}
								className={classNames(styles.dot, {
									[styles.active]: currentSlide === idx,
								})}
								aria-label={`Go to slide ${idx + 1}: ${alt}`}
								aria-current={
									currentSlide === idx ? "true" : undefined
								}
							></button>
						);
					})}
				</div>
			)}
		</>
	);
};

export default Carousel;
